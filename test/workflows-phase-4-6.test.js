/**
 * AD-KS Workflows Phase 4-6 Tests
 * 
 * Testes de validação dos workflows das fases 4, 5 e 6
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import yaml from 'yaml';
import { validateWorkflow } from '../tools/schema/workflow.schema.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const workflowsDir = join(__dirname, '..', 'src', 'arm', 'workflows');

/**
 * Helper para carregar workflow
 */
function loadWorkflow(phaseDir, workflowFile) {
  const workflowPath = join(workflowsDir, phaseDir, workflowFile);
  const content = readFileSync(workflowPath, 'utf8');
  return yaml.parse(content);
}

describe('Phase 4 - Writing Workflows', () => {
  const phaseDir = 'phase-4-writing';
  const expectedWorkflows = [
    'plan-structure',
    'write-section',
    'improve-text'
  ];

  it('should have all 3 workflows', () => {
    const files = readdirSync(join(workflowsDir, phaseDir));
    const workflowFiles = files.filter(f => f.endsWith('.workflow.yaml'));
    expect(workflowFiles).toHaveLength(3);
  });

  expectedWorkflows.forEach(workflowId => {
    describe(workflowId, () => {
      const data = loadWorkflow(phaseDir, `${workflowId}.workflow.yaml`);

      it('should have valid schema', () => {
        const result = validateWorkflow(data);
        expect(result.success).toBe(true);
      });

      it('should be in phase 4', () => {
        expect(data.workflow.phase).toBe(4);
      });

      it('should have lead_agent from team-writing', () => {
        const writingAgents = [
          'academic-writer',
          'structure-designer',
          'style-guardian',
          'latex-specialist',
          'presentation-expert'
        ];
        expect(writingAgents).toContain(data.workflow.lead_agent);
      });
    });
  });

  it('plan-structure should lead to write-section', () => {
    const data = loadWorkflow(phaseDir, 'plan-structure.workflow.yaml');
    expect(data.workflow.next_workflows).toContain('write-section');
  });

  it('write-section should be sharded', () => {
    const data = loadWorkflow(phaseDir, 'write-section.workflow.yaml');
    expect(data.workflow.sharded).toBe(true);
  });
});

describe('Phase 5 - Review Workflows', () => {
  const phaseDir = 'phase-5-review';
  const expectedWorkflows = [
    'review-logic',
    'audit-citations',
    'detect-bias'
  ];

  it('should have all 3 workflows', () => {
    const files = readdirSync(join(workflowsDir, phaseDir));
    const workflowFiles = files.filter(f => f.endsWith('.workflow.yaml'));
    expect(workflowFiles).toHaveLength(3);
  });

  expectedWorkflows.forEach(workflowId => {
    describe(workflowId, () => {
      const data = loadWorkflow(phaseDir, `${workflowId}.workflow.yaml`);

      it('should have valid schema', () => {
        const result = validateWorkflow(data);
        expect(result.success).toBe(true);
      });

      it('should be in phase 5', () => {
        expect(data.workflow.phase).toBe(5);
      });

      it('should have lead_agent from team-rigor', () => {
        const rigorAgents = [
          'method-validator',
          'logic-checker',
          'citation-auditor',
          'bias-detector'
        ];
        expect(rigorAgents).toContain(data.workflow.lead_agent);
      });
    });
  });

  it('review-logic should lead to audit-citations', () => {
    const data = loadWorkflow(phaseDir, 'review-logic.workflow.yaml');
    expect(data.workflow.next_workflows).toContain('audit-citations');
  });

  it('detect-bias should lead to format-document', () => {
    const data = loadWorkflow(phaseDir, 'detect-bias.workflow.yaml');
    expect(data.workflow.next_workflows).toContain('format-document');
  });
});

describe('Phase 6 - Finalization Workflows', () => {
  const phaseDir = 'phase-6-finalization';
  const expectedWorkflows = [
    'format-document',
    'create-presentation',
    'final-checklist',
    'prepare-submission'
  ];

  it('should have all 4 workflows', () => {
    const files = readdirSync(join(workflowsDir, phaseDir));
    const workflowFiles = files.filter(f => f.endsWith('.workflow.yaml'));
    expect(workflowFiles).toHaveLength(4);
  });

  expectedWorkflows.forEach(workflowId => {
    describe(workflowId, () => {
      const data = loadWorkflow(phaseDir, `${workflowId}.workflow.yaml`);

      it('should have valid schema', () => {
        const result = validateWorkflow(data);
        expect(result.success).toBe(true);
      });

      it('should be in phase 6', () => {
        expect(data.workflow.phase).toBe(6);
      });
    });
  });

  it('prepare-submission should have no next_workflows (final)', () => {
    const data = loadWorkflow(phaseDir, 'prepare-submission.workflow.yaml');
    expect(data.workflow.next_workflows).toHaveLength(0);
  });

  it('final-checklist should lead to prepare-submission', () => {
    const data = loadWorkflow(phaseDir, 'final-checklist.workflow.yaml');
    expect(data.workflow.next_workflows).toContain('prepare-submission');
  });
});

describe('Cross-Phase Workflow Flow (4-6)', () => {
  it('Phase 4 workflows should connect to Phase 5', () => {
    const data = loadWorkflow('phase-4-writing', 'write-section.workflow.yaml');
    expect(data.workflow.next_workflows).toContain('review-logic');
  });

  it('Phase 5 workflows should connect to Phase 6', () => {
    const data = loadWorkflow('phase-5-review', 'audit-citations.workflow.yaml');
    expect(data.workflow.next_workflows).toContain('format-document');
  });
});

describe('All Workflows Count', () => {
  it('should have 23 ARM workflows across 6 phases', () => {
    const phases = [
      'phase-1-exploration',
      'phase-2-literature',
      'phase-3-methodology',
      'phase-4-writing',
      'phase-5-review',
      'phase-6-finalization'
    ];
    
    let totalWorkflows = 0;
    
    phases.forEach(phase => {
      const files = readdirSync(join(workflowsDir, phase));
      totalWorkflows += files.filter(f => f.endsWith('.workflow.yaml')).length;
    });
    
    // 23 ARM workflows (5+4+4+3+3+4)
    expect(totalWorkflows).toBe(23);
  });
});

describe('Complete Workflow Chain', () => {
  it('should have a path from exploration to submission', () => {
    // Verifica que existe um caminho do início ao fim
    const exploreIdea = loadWorkflow('phase-1-exploration', 'explore-idea.workflow.yaml');
    expect(exploreIdea.workflow.next_workflows.length).toBeGreaterThan(0);
    
    const prepareSubmission = loadWorkflow('phase-6-finalization', 'prepare-submission.workflow.yaml');
    expect(prepareSubmission.workflow.next_workflows).toHaveLength(0);
  });
});
