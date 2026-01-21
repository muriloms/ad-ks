/**
 * AD-KS Teams Ideation, Rigor, Literature Tests
 * 
 * Testes de validação dos agentes das equipes
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import yaml from 'yaml';
import { validateAgent } from '../tools/schema/agent.schema.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const armAgentsDir = join(__dirname, '..', 'src', 'arm', 'agents');

/**
 * Helper para carregar e validar agente
 */
function loadAgent(teamDir, agentFile) {
  const agentPath = join(armAgentsDir, teamDir, agentFile);
  const content = readFileSync(agentPath, 'utf8');
  return yaml.parse(content);
}

describe('Team Ideation (5 agents)', () => {
  const teamDir = 'team-ideation';
  const expectedAgents = [
    'idea-facilitator',
    'question-architect', 
    'hypothesis-builder',
    'gap-identifier',
    'vision-synthesizer'
  ];

  it('should have all 5 agents', () => {
    const files = readdirSync(join(armAgentsDir, teamDir));
    const agentFiles = files.filter(f => f.endsWith('.agent.yaml'));
    expect(agentFiles).toHaveLength(5);
  });

  expectedAgents.forEach(agentId => {
    describe(agentId, () => {
      const data = loadAgent(teamDir, `${agentId}.agent.yaml`);

      it('should have valid schema', () => {
        const result = validateAgent(data);
        expect(result.success).toBe(true);
      });

      it('should belong to team-ideation', () => {
        expect(data.agent.metadata.team).toBe('team-ideation');
      });

      it('should have custom prompts', () => {
        expect(data.agent.custom_prompts).toBeDefined();
        expect(Object.keys(data.agent.custom_prompts).length).toBeGreaterThan(0);
      });
    });
  });

  it('idea-facilitator should be the lead (handoff to question-architect)', () => {
    const data = loadAgent(teamDir, 'idea-facilitator.agent.yaml');
    const hasHandoff = data.agent.menu.some(m => m.handoff_to === 'question-architect');
    expect(hasHandoff).toBe(true);
  });

  it('vision-synthesizer should handoff to other teams', () => {
    const data = loadAgent(teamDir, 'vision-synthesizer.agent.yaml');
    const handoffs = data.agent.menu.filter(m => m.handoff_to);
    expect(handoffs.length).toBeGreaterThan(0);
  });
});

describe('Team Rigor (4 agents)', () => {
  const teamDir = 'team-rigor';
  const expectedAgents = [
    'method-validator',
    'logic-checker',
    'citation-auditor',
    'bias-detector'
  ];

  it('should have all 4 agents', () => {
    const files = readdirSync(join(armAgentsDir, teamDir));
    const agentFiles = files.filter(f => f.endsWith('.agent.yaml'));
    expect(agentFiles).toHaveLength(4);
  });

  expectedAgents.forEach(agentId => {
    describe(agentId, () => {
      const data = loadAgent(teamDir, `${agentId}.agent.yaml`);

      it('should have valid schema', () => {
        const result = validateAgent(data);
        expect(result.success).toBe(true);
      });

      it('should belong to team-rigor', () => {
        expect(data.agent.metadata.team).toBe('team-rigor');
      });

      it('should have critical actions', () => {
        expect(data.agent.critical_actions).toBeDefined();
        expect(data.agent.critical_actions.length).toBeGreaterThan(0);
      });
    });
  });

  it('method-validator should be the lead', () => {
    const data = loadAgent(teamDir, 'method-validator.agent.yaml');
    const hasHandoff = data.agent.menu.some(m => m.handoff_to === 'logic-checker');
    expect(hasHandoff).toBe(true);
  });

  it('bias-detector should handoff back to master', () => {
    const data = loadAgent(teamDir, 'bias-detector.agent.yaml');
    const hasHandoff = data.agent.menu.some(m => m.handoff_to === 'adks-master');
    expect(hasHandoff).toBe(true);
  });
});

describe('Team Literature (4 agents)', () => {
  const teamDir = 'team-literature';
  const expectedAgents = [
    'literature-curator',
    'theory-connector',
    'synthesis-writer',
    'reference-manager'
  ];

  it('should have all 4 agents', () => {
    const files = readdirSync(join(armAgentsDir, teamDir));
    const agentFiles = files.filter(f => f.endsWith('.agent.yaml'));
    expect(agentFiles).toHaveLength(4);
  });

  expectedAgents.forEach(agentId => {
    describe(agentId, () => {
      const data = loadAgent(teamDir, `${agentId}.agent.yaml`);

      it('should have valid schema', () => {
        const result = validateAgent(data);
        expect(result.success).toBe(true);
      });

      it('should belong to team-literature', () => {
        expect(data.agent.metadata.team).toBe('team-literature');
      });

      it('should have menu items', () => {
        expect(data.agent.menu).toBeDefined();
        expect(data.agent.menu.length).toBeGreaterThan(0);
      });
    });
  });

  it('literature-curator should be the lead', () => {
    const data = loadAgent(teamDir, 'literature-curator.agent.yaml');
    const hasHandoff = data.agent.menu.some(m => m.handoff_to === 'theory-connector');
    expect(hasHandoff).toBe(true);
  });

  it('reference-manager should handoff back to master', () => {
    const data = loadAgent(teamDir, 'reference-manager.agent.yaml');
    const hasHandoff = data.agent.menu.some(m => m.handoff_to === 'adks-master');
    expect(hasHandoff).toBe(true);
  });
});

describe('All Teams Flow', () => {
  it('Team Ideation should connect to Team Literature', () => {
    const data = loadAgent('team-ideation', 'vision-synthesizer.agent.yaml');
    const hasLitHandoff = data.agent.menu.some(m => m.handoff_to === 'literature-curator');
    expect(hasLitHandoff).toBe(true);
  });

  it('Team Ideation should connect to Team Methodology', () => {
    const data = loadAgent('team-ideation', 'vision-synthesizer.agent.yaml');
    const hasMethodHandoff = data.agent.menu.some(m => m.handoff_to === 'method-architect');
    expect(hasMethodHandoff).toBe(true);
  });
});
