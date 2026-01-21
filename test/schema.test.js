/**
 * AD-KS Schema Tests
 * 
 * Testes de validação dos schemas Zod
 */

import { describe, it, expect } from 'vitest';
import { validateAgent, validateWorkflow, validateModule } from '../tools/schema/index.js';

describe('Agent Schema', () => {
  it('should validate a valid agent', () => {
    const validAgent = {
      agent: {
        metadata: {
          id: 'test-agent',
          name: 'Test Agent',
          title: 'Agente de Teste'
        },
        persona: {
          role: 'Testador',
          identity: 'Sou um agente de teste'
        }
      }
    };

    const result = validateAgent(validAgent);
    expect(result.success).toBe(true);
  });

  it('should reject agent without required fields', () => {
    const invalidAgent = {
      agent: {
        metadata: {
          id: 'test-agent'
          // missing name and title
        },
        persona: {
          role: 'Testador'
          // missing identity
        }
      }
    };

    const result = validateAgent(invalidAgent);
    expect(result.success).toBe(false);
  });

  it('should validate agent with all fields', () => {
    const fullAgent = {
      agent: {
        metadata: {
          id: 'full-agent',
          name: 'Full Agent',
          title: 'Agente Completo',
          icon: '🧪',
          module: 'arm',
          team: 'team-test',
          whenToUse: 'Use para testar',
          hasSidecar: true,
          language: 'pt-br'
        },
        persona: {
          role: 'Testador Principal',
          identity: 'Sou um agente de teste completo',
          communication_style: 'Formal e preciso',
          principles: ['Testar sempre', 'Validar tudo']
        },
        critical_actions: [
          'Executar testes',
          { action: 'Validar schemas', priority: 'high' }
        ],
        menu: [
          {
            trigger: '*test',
            description: 'Executa testes',
            workflow: 'run-tests'
          }
        ],
        custom_prompts: {
          greeting: 'Olá, sou o agente de teste!'
        }
      }
    };

    const result = validateAgent(fullAgent);
    expect(result.success).toBe(true);
  });
});

describe('Workflow Schema', () => {
  it('should validate a valid workflow', () => {
    const validWorkflow = {
      workflow: {
        id: 'test-workflow',
        name: 'Test Workflow',
        lead_agent: 'test-agent',
        steps: [
          {
            id: 'step-1',
            name: 'First Step'
          }
        ]
      }
    };

    const result = validateWorkflow(validWorkflow);
    expect(result.success).toBe(true);
  });

  it('should reject workflow without steps', () => {
    const invalidWorkflow = {
      workflow: {
        id: 'test-workflow',
        name: 'Test Workflow',
        lead_agent: 'test-agent',
        steps: []
      }
    };

    const result = validateWorkflow(invalidWorkflow);
    expect(result.success).toBe(false);
  });

  it('should validate workflow with all fields', () => {
    const fullWorkflow = {
      workflow: {
        id: 'full-workflow',
        name: 'Full Workflow',
        version: '1.0.0',
        module: 'arm',
        phase: 1,
        description: 'Workflow completo para teste',
        lead_agent: 'lead-agent',
        supporting_agents: ['support-1', 'support-2'],
        input_file_patterns: ['*.md', { pattern: '*.yaml', required: true }],
        sharded: true,
        steps: [
          {
            id: 'step-1',
            name: 'Passo 1',
            description: 'Primeiro passo',
            agent: 'agent-1',
            input: ['file1.md'],
            output: ['output1.md']
          },
          {
            id: 'step-2',
            name: 'Passo 2',
            optional: true
          }
        ],
        outputs: [
          'result.md',
          { name: 'Report', path: 'report.md', format: 'md' }
        ],
        next_workflows: ['next-workflow'],
        tags: ['test', 'demo']
      }
    };

    const result = validateWorkflow(fullWorkflow);
    expect(result.success).toBe(true);
  });
});

describe('Module Schema', () => {
  it('should validate a valid module', () => {
    const validModule = {
      module: {
        id: 'test-module',
        name: 'Test Module'
      }
    };

    const result = validateModule(validModule);
    expect(result.success).toBe(true);
  });

  it('should validate module with teams and phases', () => {
    const fullModule = {
      module: {
        id: 'arm',
        name: 'Academic Research Module',
        version: '1.0.0',
        description: 'Módulo de pesquisa acadêmica',
        author: 'AD-KS Team',
        language: 'pt-br',
        teams: [
          {
            id: 'team-builder',
            name: 'Team Builder',
            description: 'Equipe de construção de agentes',
            agents: ['context-analyst', 'agent-builder'],
            lead: 'context-analyst'
          }
        ],
        phases: [
          {
            id: 1,
            name: 'Exploração',
            description: 'Fase de exploração e definição',
            workflows: ['explore-idea', 'define-topic']
          }
        ],
        agents_dir: './agents',
        workflows_dir: './workflows',
        templates_dir: './templates',
        dependencies: ['core'],
        config: {
          default_language: 'pt-br'
        }
      }
    };

    const result = validateModule(fullModule);
    expect(result.success).toBe(true);
  });
});
