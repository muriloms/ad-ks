/**
 * AD-KS Compiler - YAML to Markdown
 * 
 * Compila arquivos .agent.yaml para .md legíveis por IDEs
 * Gera instruções formatadas para uso com Cursor, Claude Code, etc.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname, basename } from 'path';
import yaml from 'yaml';
import chalk from 'chalk';

/**
 * Template para compilação de agente
 */
function compileAgentToMarkdown(agentData, options = {}) {
  const agent = agentData.agent;
  const meta = agent.metadata;
  const persona = agent.persona;
  
  const lines = [];
  
  // Header
  lines.push(`# ${meta.icon || '🤖'} ${meta.name}`);
  lines.push('');
  lines.push(`> ${meta.title}`);
  lines.push('');
  
  // Metadata section
  lines.push('---');
  lines.push(`**ID:** \`${meta.id}\``);
  lines.push(`**Módulo:** ${meta.module}`);
  if (meta.team) {
    lines.push(`**Equipe:** ${meta.team}`);
  }
  if (meta.language) {
    lines.push(`**Idioma:** ${meta.language}`);
  }
  if (meta.hasSidecar) {
    lines.push(`**Memória Persistente:** ✓ Ativada`);
  }
  lines.push('---');
  lines.push('');
  
  // When to use
  if (meta.whenToUse) {
    lines.push('## Quando Usar Este Agente');
    lines.push('');
    lines.push(meta.whenToUse.trim());
    lines.push('');
  }
  
  // Identity / Role
  lines.push('## Identidade');
  lines.push('');
  lines.push(`**Role:** ${persona.role}`);
  lines.push('');
  if (persona.identity) {
    lines.push(persona.identity.trim());
    lines.push('');
  }
  
  // Communication Style
  if (persona.communication_style) {
    lines.push('## Estilo de Comunicação');
    lines.push('');
    lines.push(persona.communication_style.trim());
    lines.push('');
  }
  
  // Principles
  if (persona.principles && persona.principles.length > 0) {
    lines.push('## Princípios');
    lines.push('');
    for (const principle of persona.principles) {
      lines.push(`- ${principle}`);
    }
    lines.push('');
  }
  
  // Critical Actions
  if (agent.critical_actions && agent.critical_actions.length > 0) {
    lines.push('## Ações Críticas');
    lines.push('');
    lines.push('> ⚠️ **IMPORTANTE:** Estas ações devem ser sempre executadas.');
    lines.push('');
    
    for (const action of agent.critical_actions) {
      if (typeof action === 'string') {
        lines.push(`- ${action}`);
      } else {
        const priority = action.priority ? ` [${action.priority.toUpperCase()}]` : '';
        lines.push(`- **${action.action}**${priority}`);
        if (action.description) {
          lines.push(`  - ${action.description}`);
        }
      }
    }
    lines.push('');
  }
  
  // Menu / Commands
  if (agent.menu && agent.menu.length > 0) {
    lines.push('## Comandos Disponíveis');
    lines.push('');
    lines.push('| Comando | Descrição |');
    lines.push('|---------|-----------|');
    
    for (const item of agent.menu) {
      let extra = '';
      if (item.workflow) {
        extra = ` → workflow: \`${item.workflow}\``;
      } else if (item.handoff_to) {
        extra = ` → handoff: \`${item.handoff_to}\``;
      }
      lines.push(`| \`${item.trigger}\` | ${item.description}${extra} |`);
    }
    lines.push('');
  }
  
  // Custom Prompts
  if (agent.custom_prompts && Object.keys(agent.custom_prompts).length > 0) {
    lines.push('## Prompts Personalizados');
    lines.push('');
    
    for (const [name, content] of Object.entries(agent.custom_prompts)) {
      lines.push(`### ${formatPromptName(name)}`);
      lines.push('');
      lines.push('```markdown');
      lines.push(content.trim());
      lines.push('```');
      lines.push('');
    }
  }
  
  // Footer
  lines.push('---');
  lines.push('');
  lines.push(`*Compilado pelo AD-KS Compiler v1.0*`);
  lines.push(`*Fonte: ${meta.id}.agent.yaml*`);
  
  return lines.join('\n');
}

/**
 * Template para compilação de workflow
 */
function compileWorkflowToMarkdown(workflowData, options = {}) {
  const workflow = workflowData.workflow;
  
  const lines = [];
  
  // Header
  lines.push(`# 📋 ${workflow.name}`);
  lines.push('');
  lines.push(`> ${workflow.description || 'Workflow do AD-KS'}`);
  lines.push('');
  
  // Metadata
  lines.push('---');
  lines.push(`**ID:** \`${workflow.id}\``);
  lines.push(`**Versão:** ${workflow.version || '1.0.0'}`);
  lines.push(`**Módulo:** ${workflow.module}`);
  if (workflow.phase) {
    lines.push(`**Fase:** ${workflow.phase}`);
  }
  lines.push(`**Agente Líder:** \`${workflow.lead_agent}\``);
  if (workflow.supporting_agents && workflow.supporting_agents.length > 0) {
    lines.push(`**Agentes de Suporte:** ${workflow.supporting_agents.map(a => `\`${a}\``).join(', ')}`);
  }
  lines.push('---');
  lines.push('');
  
  // Input patterns
  if (workflow.input_file_patterns && workflow.input_file_patterns.length > 0) {
    lines.push('## Arquivos de Entrada');
    lines.push('');
    for (const pattern of workflow.input_file_patterns) {
      if (typeof pattern === 'string') {
        lines.push(`- \`${pattern}\``);
      } else {
        const req = pattern.required ? ' *(obrigatório)*' : ' *(opcional)*';
        lines.push(`- \`${pattern.pattern}\`${req}`);
        if (pattern.description) {
          lines.push(`  - ${pattern.description}`);
        }
      }
    }
    lines.push('');
  }
  
  // Steps
  if (workflow.steps && workflow.steps.length > 0) {
    lines.push('## Passos do Workflow');
    lines.push('');
    
    for (let i = 0; i < workflow.steps.length; i++) {
      const step = workflow.steps[i];
      const num = i + 1;
      const optional = step.optional ? ' *(opcional)*' : '';
      
      lines.push(`### ${num}. ${step.name}${optional}`);
      lines.push('');
      
      if (step.description) {
        lines.push(step.description);
        lines.push('');
      }
      
      if (step.agent) {
        lines.push(`**Agente:** \`${step.agent}\``);
      }
      if (step.action) {
        lines.push(`**Ação:** \`${step.action}\``);
      }
      
      if (step.prompt) {
        lines.push('');
        lines.push('**Prompt:**');
        lines.push('```');
        lines.push(step.prompt.trim());
        lines.push('```');
      }
      
      if (step.input && step.input.length > 0) {
        lines.push(`**Entrada:** ${step.input.map(i => `\`${i}\``).join(', ')}`);
      }
      if (step.output && step.output.length > 0) {
        lines.push(`**Saída:** ${step.output.map(o => `\`${o}\``).join(', ')}`);
      }
      
      lines.push('');
    }
  }
  
  // Outputs
  if (workflow.outputs && workflow.outputs.length > 0) {
    lines.push('## Saídas do Workflow');
    lines.push('');
    for (const output of workflow.outputs) {
      if (typeof output === 'string') {
        lines.push(`- \`${output}\``);
      } else {
        lines.push(`- **${output.name}:** \`${output.path}\` (${output.format || 'md'})`);
      }
    }
    lines.push('');
  }
  
  // Next workflows
  if (workflow.next_workflows && workflow.next_workflows.length > 0) {
    lines.push('## Próximos Workflows');
    lines.push('');
    for (const next of workflow.next_workflows) {
      lines.push(`- \`${next}\``);
    }
    lines.push('');
  }
  
  // Tags
  if (workflow.tags && workflow.tags.length > 0) {
    lines.push('---');
    lines.push(`**Tags:** ${workflow.tags.map(t => `\`${t}\``).join(' ')}`);
  }
  
  // Footer
  lines.push('');
  lines.push('---');
  lines.push(`*Compilado pelo AD-KS Compiler v1.0*`);
  lines.push(`*Fonte: ${workflow.id}.workflow.yaml*`);
  
  return lines.join('\n');
}

/**
 * Formata nome do prompt para exibição
 */
function formatPromptName(name) {
  return name
    .replace(/_/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

/**
 * Compila um arquivo YAML para Markdown
 */
export function compileFile(inputPath, outputPath = null) {
  if (!existsSync(inputPath)) {
    throw new Error(`Arquivo não encontrado: ${inputPath}`);
  }
  
  const content = readFileSync(inputPath, 'utf8');
  const data = yaml.parse(content);
  const fileName = basename(inputPath);
  
  let markdown;
  let outputFileName;
  
  if (fileName.includes('.agent.')) {
    markdown = compileAgentToMarkdown(data);
    outputFileName = fileName.replace('.agent.yaml', '.md');
  } else if (fileName.includes('.workflow.')) {
    markdown = compileWorkflowToMarkdown(data);
    outputFileName = fileName.replace('.workflow.yaml', '.md');
  } else {
    throw new Error(`Tipo de arquivo não suportado: ${fileName}`);
  }
  
  // Define output path
  if (!outputPath) {
    outputPath = join(dirname(inputPath), outputFileName);
  }
  
  // Ensure output directory exists
  const outputDir = dirname(outputPath);
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }
  
  // Write output
  writeFileSync(outputPath, markdown, 'utf8');
  
  return {
    input: inputPath,
    output: outputPath,
    type: fileName.includes('.agent.') ? 'agent' : 'workflow'
  };
}

/**
 * Compila múltiplos arquivos
 */
export function compileFiles(inputPaths, outputDir = null) {
  const results = [];
  
  for (const inputPath of inputPaths) {
    try {
      let outputPath = null;
      
      if (outputDir) {
        const fileName = basename(inputPath);
        const outputFileName = fileName
          .replace('.agent.yaml', '.md')
          .replace('.workflow.yaml', '.md');
        outputPath = join(outputDir, outputFileName);
      }
      
      const result = compileFile(inputPath, outputPath);
      results.push({ ...result, success: true });
    } catch (error) {
      results.push({
        input: inputPath,
        success: false,
        error: error.message
      });
    }
  }
  
  return results;
}

/**
 * Exporta funções de compilação de templates
 */
export { compileAgentToMarkdown, compileWorkflowToMarkdown };

export default { compileFile, compileFiles, compileAgentToMarkdown, compileWorkflowToMarkdown };
