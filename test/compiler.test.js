/**
 * AD-KS Compiler Tests
 * 
 * Testes do compilador YAML → Markdown
 */

import { describe, it, expect } from 'vitest';
import { compileAgentToMarkdown, compileWorkflowToMarkdown } from '../tools/cli/lib/compiler.js';

describe('Agent Compiler', () => {
  const sampleAgent = {
    agent: {
      metadata: {
        id: 'test-agent',
        name: 'Test Agent',
        title: 'Agente de Teste',
        icon: '🧪',
        module: 'arm',
        team: 'team-test',
        language: 'pt-br',
        hasSidecar: true,
        whenToUse: 'Use quando precisar testar o compilador.'
      },
      persona: {
        role: 'Testador de Compilação',
        identity: 'Sou um agente de teste para validar o compilador.',
        communication_style: 'Direto e técnico.',
        principles: [
          'Testar sempre',
          'Validar resultados'
        ]
      },
      critical_actions: [
        'Executar validações',
        { action: 'Verificar saída', priority: 'high' }
      ],
      menu: [
        {
          trigger: '*test',
          description: 'Executa testes',
          workflow: 'run-tests'
        },
        {
          trigger: '*validate',
          description: 'Valida compilação',
          action: 'validate'
        }
      ],
      custom_prompts: {
        greeting: 'Olá! Sou o agente de teste.',
        farewell: 'Até mais!'
      }
    }
  };

  it('should compile agent to markdown', () => {
    const markdown = compileAgentToMarkdown(sampleAgent);
    
    expect(markdown).toContain('# 🧪 Test Agent');
    expect(markdown).toContain('> Agente de Teste');
    expect(markdown).toContain('**ID:** `test-agent`');
  });

  it('should include metadata section', () => {
    const markdown = compileAgentToMarkdown(sampleAgent);
    
    expect(markdown).toContain('**Módulo:** arm');
    expect(markdown).toContain('**Equipe:** team-test');
    expect(markdown).toContain('**Idioma:** pt-br');
    expect(markdown).toContain('**Memória Persistente:** ✓ Ativada');
  });

  it('should include when to use section', () => {
    const markdown = compileAgentToMarkdown(sampleAgent);
    
    expect(markdown).toContain('## Quando Usar Este Agente');
    expect(markdown).toContain('Use quando precisar testar o compilador');
  });

  it('should include persona sections', () => {
    const markdown = compileAgentToMarkdown(sampleAgent);
    
    expect(markdown).toContain('## Identidade');
    expect(markdown).toContain('**Role:** Testador de Compilação');
    expect(markdown).toContain('## Estilo de Comunicação');
    expect(markdown).toContain('## Princípios');
    expect(markdown).toContain('- Testar sempre');
  });

  it('should include critical actions', () => {
    const markdown = compileAgentToMarkdown(sampleAgent);
    
    expect(markdown).toContain('## Ações Críticas');
    expect(markdown).toContain('- Executar validações');
    expect(markdown).toContain('**Verificar saída**');
    expect(markdown).toContain('[HIGH]');
  });

  it('should include menu as table', () => {
    const markdown = compileAgentToMarkdown(sampleAgent);
    
    expect(markdown).toContain('## Comandos Disponíveis');
    expect(markdown).toContain('| Comando | Descrição |');
    expect(markdown).toContain('| `*test` |');
    expect(markdown).toContain('workflow: `run-tests`');
  });

  it('should include custom prompts', () => {
    const markdown = compileAgentToMarkdown(sampleAgent);
    
    expect(markdown).toContain('## Prompts Personalizados');
    expect(markdown).toContain('### Greeting');
    expect(markdown).toContain('Olá! Sou o agente de teste.');
  });

  it('should include footer', () => {
    const markdown = compileAgentToMarkdown(sampleAgent);
    
    expect(markdown).toContain('*Compilado pelo AD-KS Compiler');
    expect(markdown).toContain('*Fonte: test-agent.agent.yaml*');
  });
});

describe('Workflow Compiler', () => {
  const sampleWorkflow = {
    workflow: {
      id: 'test-workflow',
      name: 'Test Workflow',
      version: '1.0.0',
      module: 'arm',
      phase: 1,
      description: 'Workflow de teste para o compilador.',
      lead_agent: 'test-agent',
      supporting_agents: ['helper-1', 'helper-2'],
      input_file_patterns: [
        '*.md',
        { pattern: 'config.yaml', required: true, description: 'Arquivo de configuração' }
      ],
      steps: [
        {
          id: 'step-1',
          name: 'Primeiro Passo',
          description: 'Executa a primeira ação.',
          agent: 'test-agent',
          action: 'execute',
          input: ['input.md'],
          output: ['output.md']
        },
        {
          id: 'step-2',
          name: 'Segundo Passo',
          optional: true,
          prompt: 'Execute a segunda ação se necessário.'
        }
      ],
      outputs: [
        'result.md',
        { name: 'Report', path: 'report.md', format: 'md' }
      ],
      next_workflows: ['next-1', 'next-2'],
      tags: ['test', 'demo']
    }
  };

  it('should compile workflow to markdown', () => {
    const markdown = compileWorkflowToMarkdown(sampleWorkflow);
    
    expect(markdown).toContain('# 📋 Test Workflow');
    expect(markdown).toContain('**ID:** `test-workflow`');
  });

  it('should include metadata', () => {
    const markdown = compileWorkflowToMarkdown(sampleWorkflow);
    
    expect(markdown).toContain('**Versão:** 1.0.0');
    expect(markdown).toContain('**Módulo:** arm');
    expect(markdown).toContain('**Fase:** 1');
    expect(markdown).toContain('**Agente Líder:** `test-agent`');
    expect(markdown).toContain('`helper-1`');
  });

  it('should include input patterns', () => {
    const markdown = compileWorkflowToMarkdown(sampleWorkflow);
    
    expect(markdown).toContain('## Arquivos de Entrada');
    expect(markdown).toContain('`*.md`');
    expect(markdown).toContain('`config.yaml`');
    expect(markdown).toContain('*(obrigatório)*');
  });

  it('should include steps', () => {
    const markdown = compileWorkflowToMarkdown(sampleWorkflow);
    
    expect(markdown).toContain('## Passos do Workflow');
    expect(markdown).toContain('### 1. Primeiro Passo');
    expect(markdown).toContain('### 2. Segundo Passo');
    expect(markdown).toContain('*(opcional)*');
    expect(markdown).toContain('**Agente:** `test-agent`');
  });

  it('should include outputs', () => {
    const markdown = compileWorkflowToMarkdown(sampleWorkflow);
    
    expect(markdown).toContain('## Saídas do Workflow');
    expect(markdown).toContain('`result.md`');
    expect(markdown).toContain('**Report:**');
  });

  it('should include next workflows', () => {
    const markdown = compileWorkflowToMarkdown(sampleWorkflow);
    
    expect(markdown).toContain('## Próximos Workflows');
    expect(markdown).toContain('`next-1`');
    expect(markdown).toContain('`next-2`');
  });

  it('should include tags', () => {
    const markdown = compileWorkflowToMarkdown(sampleWorkflow);
    
    expect(markdown).toContain('**Tags:**');
    expect(markdown).toContain('`test`');
    expect(markdown).toContain('`demo`');
  });
});
