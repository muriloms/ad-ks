/**
 * AD-KS Core Module Tests
 * 
 * Testes de validação do módulo core e seus arquivos
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import yaml from 'yaml';
import { validateAgent } from '../tools/schema/agent.schema.js';
import { validateWorkflow } from '../tools/schema/workflow.schema.js';
import { validateModule } from '../tools/schema/module.schema.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const srcDir = join(__dirname, '..', 'src');

describe('Core Module', () => {
  it('should have a valid module.yaml', () => {
    const modulePath = join(srcDir, 'core', 'module.yaml');
    const content = readFileSync(modulePath, 'utf8');
    const data = yaml.parse(content);
    
    const result = validateModule(data);
    expect(result.success).toBe(true);
    expect(result.data.module.id).toBe('core');
  });

  it('should have correct module metadata', () => {
    const modulePath = join(srcDir, 'core', 'module.yaml');
    const content = readFileSync(modulePath, 'utf8');
    const data = yaml.parse(content);
    
    expect(data.module.name).toBe('AD-KS Core');
    expect(data.module.language).toBe('pt-br');
    expect(data.module.teams).toHaveLength(1);
    expect(data.module.teams[0].id).toBe('orchestration');
  });
});

describe('ADKS Master Agent', () => {
  it('should have a valid agent definition', () => {
    const agentPath = join(srcDir, 'core', 'agents', 'adks-master.agent.yaml');
    const content = readFileSync(agentPath, 'utf8');
    const data = yaml.parse(content);
    
    const result = validateAgent(data);
    expect(result.success).toBe(true);
  });

  it('should have correct agent metadata', () => {
    const agentPath = join(srcDir, 'core', 'agents', 'adks-master.agent.yaml');
    const content = readFileSync(agentPath, 'utf8');
    const data = yaml.parse(content);
    
    expect(data.agent.metadata.id).toBe('adks-master');
    expect(data.agent.metadata.module).toBe('core');
    expect(data.agent.metadata.hasSidecar).toBe(true);
  });

  it('should have required menu items', () => {
    const agentPath = join(srcDir, 'core', 'agents', 'adks-master.agent.yaml');
    const content = readFileSync(agentPath, 'utf8');
    const data = yaml.parse(content);
    
    const triggers = data.agent.menu.map(m => m.trigger);
    
    expect(triggers).toContain('*workflow-init');
    expect(triggers).toContain('*help');
    expect(triggers).toContain('*status');
    expect(triggers).toContain('*list-agents');
  });

  it('should have custom prompts', () => {
    const agentPath = join(srcDir, 'core', 'agents', 'adks-master.agent.yaml');
    const content = readFileSync(agentPath, 'utf8');
    const data = yaml.parse(content);
    
    expect(data.agent.custom_prompts.welcome).toBeDefined();
    expect(data.agent.custom_prompts.workflow_init_options).toBeDefined();
    expect(data.agent.custom_prompts.teams_overview).toBeDefined();
  });
});

describe('Workflow Init', () => {
  it('should have a valid workflow definition', () => {
    const workflowPath = join(srcDir, 'core', 'workflows', 'workflow-init.workflow.yaml');
    const content = readFileSync(workflowPath, 'utf8');
    const data = yaml.parse(content);
    
    const result = validateWorkflow(data);
    expect(result.success).toBe(true);
  });

  it('should have correct workflow metadata', () => {
    const workflowPath = join(srcDir, 'core', 'workflows', 'workflow-init.workflow.yaml');
    const content = readFileSync(workflowPath, 'utf8');
    const data = yaml.parse(content);
    
    expect(data.workflow.id).toBe('workflow-init');
    expect(data.workflow.module).toBe('core');
    expect(data.workflow.lead_agent).toBe('adks-master');
  });

  it('should have required steps', () => {
    const workflowPath = join(srcDir, 'core', 'workflows', 'workflow-init.workflow.yaml');
    const content = readFileSync(workflowPath, 'utf8');
    const data = yaml.parse(content);
    
    expect(data.workflow.steps.length).toBeGreaterThanOrEqual(3);
    
    const stepIds = data.workflow.steps.map(s => s.id);
    expect(stepIds).toContain('check-context');
    expect(stepIds).toContain('show-options');
  });
});
