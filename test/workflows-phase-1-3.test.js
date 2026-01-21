/**
 * AD-KS Workflows Phase 1-3 Tests
 * 
 * Testes de validação dos workflows das fases 1, 2 e 3
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

describe('Phase 1 - Exploration Workflows', () => {
  const phaseDir = 'phase-1-exploration';
  const expectedWorkflows = [
    'explore-idea',
    'define-topic',
    'research-question',
    'define-objectives',
    'build-hypothesis'
  ];

  it('should have all 5 workflows', () => {
    const files = readdirSync(join(workflowsDir, phaseDir));
    const workflowFiles = files.filter(f => f.endsWith('.workflow.yaml'));
    expect(workflowFiles).toHaveLength(5);
  });

  expectedWorkflows.forEach(workflowId => {
    describe(workflowId, () => {
      const data = loadWorkflow(phaseDir, `${workflowId}.workflow.yaml`);

      it('should have valid schema', () => {
        const result = validateWorkflow(data);
        expect(result.success).toBe(true);
      });

      it('should be in phase 1', () => {
        expect(data.workflow.phase).toBe(1);
      });

      it('should have at least 3 steps', () => {
        expect(data.workflow.steps.length).toBeGreaterThanOrEqual(3);
      });

      it('should have outputs defined', () => {
        expect(data.workflow.outputs).toBeDefined();
        expect(data.workflow.outputs.length).toBeGreaterThan(0);
      });

      it('should have next_workflows defined', () => {
        expect(data.workflow.next_workflows).toBeDefined();
      });
    });
  });

  it('explore-idea should lead to define-topic', () => {
    const data = loadWorkflow(phaseDir, 'explore-idea.workflow.yaml');
    expect(data.workflow.next_workflows).toContain('define-topic');
  });

  it('research-question should lead to define-objectives', () => {
    const data = loadWorkflow(phaseDir, 'research-question.workflow.yaml');
    expect(data.workflow.next_workflows).toContain('define-objectives');
  });
});

describe('Phase 2 - Literature Workflows', () => {
  const phaseDir = 'phase-2-literature';
  const expectedWorkflows = [
    'analyze-references',
    'build-framework',
    'identify-gaps',
    'write-review'
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

      it('should be in phase 2', () => {
        expect(data.workflow.phase).toBe(2);
      });

      it('should have lead_agent from team-literature', () => {
        const literatureAgents = [
          'literature-curator',
          'theory-connector',
          'synthesis-writer',
          'reference-manager',
          'gap-identifier'
        ];
        expect(literatureAgents).toContain(data.workflow.lead_agent);
      });
    });
  });

  it('analyze-references should lead to build-framework', () => {
    const data = loadWorkflow(phaseDir, 'analyze-references.workflow.yaml');
    expect(data.workflow.next_workflows).toContain('build-framework');
  });

  it('write-review should lead to design-method', () => {
    const data = loadWorkflow(phaseDir, 'write-review.workflow.yaml');
    expect(data.workflow.next_workflows).toContain('design-method');
  });
});

describe('Phase 3 - Methodology Workflows', () => {
  const phaseDir = 'phase-3-methodology';
  const expectedWorkflows = [
    'design-method',
    'define-procedures',
    'data-strategy',
    'validate-method'
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

      it('should be in phase 3', () => {
        expect(data.workflow.phase).toBe(3);
      });

      it('should have lead_agent from team-methodology or team-rigor', () => {
        const methodAgents = [
          'method-architect',
          'procedure-designer',
          'data-strategist',
          'feasibility-expert',
          'method-validator'
        ];
        expect(methodAgents).toContain(data.workflow.lead_agent);
      });
    });
  });

  it('design-method should lead to define-procedures', () => {
    const data = loadWorkflow(phaseDir, 'design-method.workflow.yaml');
    expect(data.workflow.next_workflows).toContain('define-procedures');
  });

  it('validate-method should lead to write-section', () => {
    const data = loadWorkflow(phaseDir, 'validate-method.workflow.yaml');
    expect(data.workflow.next_workflows).toContain('write-section');
  });
});

describe('Cross-Phase Workflow Flow', () => {
  it('Phase 1 workflows should connect to Phase 2', () => {
    const data = loadWorkflow('phase-1-exploration', 'build-hypothesis.workflow.yaml');
    expect(data.workflow.next_workflows).toContain('analyze-references');
  });

  it('Phase 2 workflows should connect to Phase 3', () => {
    const data = loadWorkflow('phase-2-literature', 'identify-gaps.workflow.yaml');
    expect(data.workflow.next_workflows).toContain('design-method');
  });
});

describe('Total Workflows Count', () => {
  it('should have 13 workflows in phases 1-3', () => {
    const phases = [
      'phase-1-exploration',
      'phase-2-literature',
      'phase-3-methodology'
    ];
    
    let totalWorkflows = 0;
    
    phases.forEach(phase => {
      const files = readdirSync(join(workflowsDir, phase));
      totalWorkflows += files.filter(f => f.endsWith('.workflow.yaml')).length;
    });
    
    expect(totalWorkflows).toBe(13);
  });
});
