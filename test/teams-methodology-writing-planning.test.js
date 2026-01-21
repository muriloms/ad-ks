/**
 * AD-KS Teams Methodology, Writing, Planning Tests
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

describe('Team Methodology (4 agents)', () => {
  const teamDir = 'team-methodology';
  const expectedAgents = [
    'method-architect',
    'procedure-designer',
    'data-strategist',
    'feasibility-expert'
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

      it('should belong to team-methodology', () => {
        expect(data.agent.metadata.team).toBe('team-methodology');
      });

      it('should have critical actions', () => {
        expect(data.agent.critical_actions).toBeDefined();
        expect(data.agent.critical_actions.length).toBeGreaterThan(0);
      });
    });
  });

  it('method-architect should be the lead', () => {
    const data = loadAgent(teamDir, 'method-architect.agent.yaml');
    const hasHandoff = data.agent.menu.some(m => m.handoff_to === 'procedure-designer');
    expect(hasHandoff).toBe(true);
  });

  it('feasibility-expert should handoff to master', () => {
    const data = loadAgent(teamDir, 'feasibility-expert.agent.yaml');
    const hasHandoff = data.agent.menu.some(m => m.handoff_to === 'adks-master');
    expect(hasHandoff).toBe(true);
  });
});

describe('Team Writing (5 agents)', () => {
  const teamDir = 'team-writing';
  const expectedAgents = [
    'academic-writer',
    'structure-designer',
    'style-guardian',
    'latex-specialist',
    'presentation-expert'
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

      it('should belong to team-writing', () => {
        expect(data.agent.metadata.team).toBe('team-writing');
      });

      it('should have custom prompts', () => {
        expect(data.agent.custom_prompts).toBeDefined();
        expect(Object.keys(data.agent.custom_prompts).length).toBeGreaterThan(0);
      });
    });
  });

  it('academic-writer should be the lead', () => {
    const data = loadAgent(teamDir, 'academic-writer.agent.yaml');
    const hasHandoff = data.agent.menu.some(m => m.handoff_to === 'structure-designer');
    expect(hasHandoff).toBe(true);
  });

  it('presentation-expert should handoff to master', () => {
    const data = loadAgent(teamDir, 'presentation-expert.agent.yaml');
    const hasHandoff = data.agent.menu.some(m => m.handoff_to === 'adks-master');
    expect(hasHandoff).toBe(true);
  });
});

describe('Team Planning (3 agents)', () => {
  const teamDir = 'team-planning';
  const expectedAgents = [
    'project-planner',
    'progress-tracker',
    'task-coordinator'
  ];

  it('should have all 3 agents', () => {
    const files = readdirSync(join(armAgentsDir, teamDir));
    const agentFiles = files.filter(f => f.endsWith('.agent.yaml'));
    expect(agentFiles).toHaveLength(3);
  });

  expectedAgents.forEach(agentId => {
    describe(agentId, () => {
      const data = loadAgent(teamDir, `${agentId}.agent.yaml`);

      it('should have valid schema', () => {
        const result = validateAgent(data);
        expect(result.success).toBe(true);
      });

      it('should belong to team-planning', () => {
        expect(data.agent.metadata.team).toBe('team-planning');
      });

      it('should have menu items', () => {
        expect(data.agent.menu).toBeDefined();
        expect(data.agent.menu.length).toBeGreaterThan(0);
      });
    });
  });

  it('project-planner should be the lead', () => {
    const data = loadAgent(teamDir, 'project-planner.agent.yaml');
    const hasHandoff = data.agent.menu.some(m => m.handoff_to === 'progress-tracker');
    expect(hasHandoff).toBe(true);
  });

  it('task-coordinator should handoff to master', () => {
    const data = loadAgent(teamDir, 'task-coordinator.agent.yaml');
    const hasHandoff = data.agent.menu.some(m => m.handoff_to === 'adks-master');
    expect(hasHandoff).toBe(true);
  });
});

describe('All ARM Agents Count', () => {
  it('should have 28 ARM agents across 7 teams', () => {
    const teams = [
      'team-builder',
      'team-ideation', 
      'team-rigor',
      'team-literature',
      'team-methodology',
      'team-writing',
      'team-planning'
    ];
    
    let totalAgents = 0;
    
    teams.forEach(team => {
      const files = readdirSync(join(armAgentsDir, team));
      totalAgents += files.filter(f => f.endsWith('.agent.yaml')).length;
    });
    
    // 28 ARM agents (3+5+4+4+4+5+3)
    expect(totalAgents).toBe(28);
  });
});
