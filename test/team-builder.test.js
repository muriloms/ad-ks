/**
 * AD-KS Team Builder Tests
 * 
 * Testes de validação dos agentes do Team Builder
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import yaml from 'yaml';
import { validateAgent } from '../tools/schema/agent.schema.js';
import { validateModule } from '../tools/schema/module.schema.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const armDir = join(__dirname, '..', 'src', 'arm');

describe('ARM Module', () => {
  it('should have a valid module.yaml', () => {
    const modulePath = join(armDir, 'module.yaml');
    const content = readFileSync(modulePath, 'utf8');
    const data = yaml.parse(content);
    
    const result = validateModule(data);
    expect(result.success).toBe(true);
    expect(result.data.module.id).toBe('arm');
  });

  it('should define all 7 teams', () => {
    const modulePath = join(armDir, 'module.yaml');
    const content = readFileSync(modulePath, 'utf8');
    const data = yaml.parse(content);
    
    expect(data.module.teams).toHaveLength(7);
    
    const teamIds = data.module.teams.map(t => t.id);
    expect(teamIds).toContain('team-builder');
    expect(teamIds).toContain('team-ideation');
    expect(teamIds).toContain('team-rigor');
    expect(teamIds).toContain('team-methodology');
    expect(teamIds).toContain('team-literature');
    expect(teamIds).toContain('team-writing');
    expect(teamIds).toContain('team-planning');
  });

  it('should define all 6 phases', () => {
    const modulePath = join(armDir, 'module.yaml');
    const content = readFileSync(modulePath, 'utf8');
    const data = yaml.parse(content);
    
    expect(data.module.phases).toHaveLength(6);
    
    const phaseIds = data.module.phases.map(p => p.id);
    expect(phaseIds).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('should have 8 start options', () => {
    const modulePath = join(armDir, 'module.yaml');
    const content = readFileSync(modulePath, 'utf8');
    const data = yaml.parse(content);
    
    expect(data.module.config.start_options).toHaveLength(8);
  });
});

describe('Team Builder - Context Analyst (Dr. Marco)', () => {
  const agentPath = join(armDir, 'agents', 'team-builder', 'context-analyst.agent.yaml');
  
  it('should have a valid agent definition', () => {
    const content = readFileSync(agentPath, 'utf8');
    const data = yaml.parse(content);
    
    const result = validateAgent(data);
    expect(result.success).toBe(true);
  });

  it('should have correct metadata', () => {
    const content = readFileSync(agentPath, 'utf8');
    const data = yaml.parse(content);
    
    expect(data.agent.metadata.id).toBe('context-analyst');
    expect(data.agent.metadata.name).toBe('Dr. Marco');
    expect(data.agent.metadata.team).toBe('team-builder');
    expect(data.agent.metadata.hasSidecar).toBe(true);
  });

  it('should have menu with handoff to agent-builder', () => {
    const content = readFileSync(agentPath, 'utf8');
    const data = yaml.parse(content);
    
    const handoffItem = data.agent.menu.find(m => m.handoff_to === 'agent-builder');
    expect(handoffItem).toBeDefined();
  });

  it('should have custom prompts', () => {
    const content = readFileSync(agentPath, 'utf8');
    const data = yaml.parse(content);
    
    expect(data.agent.custom_prompts.welcome).toBeDefined();
    expect(data.agent.custom_prompts.analysis_complete).toBeDefined();
  });
});

describe('Team Builder - Agent Builder (Dra. Sofia)', () => {
  const agentPath = join(armDir, 'agents', 'team-builder', 'agent-builder.agent.yaml');
  
  it('should have a valid agent definition', () => {
    const content = readFileSync(agentPath, 'utf8');
    const data = yaml.parse(content);
    
    const result = validateAgent(data);
    expect(result.success).toBe(true);
  });

  it('should have correct metadata', () => {
    const content = readFileSync(agentPath, 'utf8');
    const data = yaml.parse(content);
    
    expect(data.agent.metadata.id).toBe('agent-builder');
    expect(data.agent.metadata.name).toBe('Dra. Sofia');
    expect(data.agent.metadata.team).toBe('team-builder');
  });

  it('should have menu with handoff to domain-expert', () => {
    const content = readFileSync(agentPath, 'utf8');
    const data = yaml.parse(content);
    
    const handoffItem = data.agent.menu.find(m => m.handoff_to === 'domain-expert');
    expect(handoffItem).toBeDefined();
  });
});

describe('Team Builder - Domain Expert (Prof. André)', () => {
  const agentPath = join(armDir, 'agents', 'team-builder', 'domain-expert.agent.yaml');
  
  it('should have a valid agent definition', () => {
    const content = readFileSync(agentPath, 'utf8');
    const data = yaml.parse(content);
    
    const result = validateAgent(data);
    expect(result.success).toBe(true);
  });

  it('should have correct metadata', () => {
    const content = readFileSync(agentPath, 'utf8');
    const data = yaml.parse(content);
    
    expect(data.agent.metadata.id).toBe('domain-expert');
    expect(data.agent.metadata.name).toBe('Prof. André');
    expect(data.agent.metadata.team).toBe('team-builder');
  });

  it('should have menu with handoff to adks-master', () => {
    const content = readFileSync(agentPath, 'utf8');
    const data = yaml.parse(content);
    
    const handoffItem = data.agent.menu.find(m => m.handoff_to === 'adks-master');
    expect(handoffItem).toBeDefined();
  });

  it('should have menu with handoff back to agent-builder', () => {
    const content = readFileSync(agentPath, 'utf8');
    const data = yaml.parse(content);
    
    const handoffItem = data.agent.menu.find(m => m.handoff_to === 'agent-builder');
    expect(handoffItem).toBeDefined();
  });
});

describe('Team Builder Flow', () => {
  it('should have correct handoff chain: context-analyst -> agent-builder -> domain-expert -> adks-master', () => {
    const agents = ['context-analyst', 'agent-builder', 'domain-expert'];
    const expectedHandoffs = ['agent-builder', 'domain-expert', 'adks-master'];
    
    agents.forEach((agentId, index) => {
      const agentPath = join(armDir, 'agents', 'team-builder', `${agentId}.agent.yaml`);
      const content = readFileSync(agentPath, 'utf8');
      const data = yaml.parse(content);
      
      const hasExpectedHandoff = data.agent.menu.some(
        m => m.handoff_to === expectedHandoffs[index]
      );
      
      expect(hasExpectedHandoff).toBe(true);
    });
  });
});
