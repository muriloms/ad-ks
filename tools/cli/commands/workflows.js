#!/usr/bin/env node

/**
 * AD-KS Workflows Command
 * 
 * Lista e mostra informações sobre workflows disponíveis
 */

import chalk from 'chalk';

/**
 * Dados dos workflows (hardcoded para performance)
 */
const WORKFLOWS_DATA = {
  'core': [
    { id: 'workflow-init', name: 'Inicialização do Workflow', description: 'Ponto de entrada com 8 opções de início' }
  ],
  
  'phase-1-exploration': [
    { id: 'explore-idea', name: 'Exploração de Ideia', description: 'Brainstorming e expansão de ideias' },
    { id: 'define-topic', name: 'Definição do Tópico', description: 'Delimitação do tópico de pesquisa' },
    { id: 'research-question', name: 'Pergunta de Pesquisa', description: 'Formulação da pergunta principal' },
    { id: 'define-objectives', name: 'Definição de Objetivos', description: 'Objetivos geral e específicos' },
    { id: 'build-hypothesis', name: 'Construção de Hipóteses', description: 'Hipóteses testáveis e variáveis' }
  ],
  
  'phase-2-literature': [
    { id: 'analyze-references', name: 'Análise de Referências', description: 'Estratégia de busca e organização' },
    { id: 'build-framework', name: 'Framework Teórico', description: 'Construção do referencial teórico' },
    { id: 'identify-gaps', name: 'Identificação de Lacunas', description: 'Mapeamento de gaps na literatura' },
    { id: 'write-review', name: 'Escrita da Revisão', description: 'Síntese integrativa da literatura' }
  ],
  
  'phase-3-methodology': [
    { id: 'design-method', name: 'Design Metodológico', description: 'Escolha de abordagem e tipo de pesquisa' },
    { id: 'define-procedures', name: 'Definição de Procedimentos', description: 'Protocolos e instrumentos' },
    { id: 'data-strategy', name: 'Estratégia de Dados', description: 'Amostragem e plano de análise' },
    { id: 'validate-method', name: 'Validação da Metodologia', description: 'Verificação de validade e rigor' }
  ],
  
  'phase-4-writing': [
    { id: 'plan-structure', name: 'Planejamento de Estrutura', description: 'Outline e organização do documento' },
    { id: 'write-section', name: 'Escrita de Seção', description: 'Redação de seções do artigo' },
    { id: 'improve-text', name: 'Melhoria de Texto', description: 'Clareza, coesão e estilo' }
  ],
  
  'phase-5-review': [
    { id: 'review-logic', name: 'Revisão Lógica', description: 'Verificação de argumentação' },
    { id: 'audit-citations', name: 'Auditoria de Citações', description: 'Verificação de referências' },
    { id: 'detect-bias', name: 'Detecção de Vieses', description: 'Identificação de limitações' }
  ],
  
  'phase-6-finalization': [
    { id: 'format-document', name: 'Formatação Final', description: 'Aplicação de template e estilo' },
    { id: 'create-presentation', name: 'Criação de Apresentação', description: 'Slides para defesa/conferência' },
    { id: 'final-checklist', name: 'Checklist Final', description: 'Verificação de qualidade' },
    { id: 'prepare-submission', name: 'Preparação para Submissão', description: 'Organização para envio' }
  ]
};

/**
 * Nomes das fases
 */
const PHASE_NAMES = {
  'core': '🎯 Core',
  'phase-1-exploration': '💡 Fase 1: Exploração e Definição',
  'phase-2-literature': '📚 Fase 2: Revisão da Literatura',
  'phase-3-methodology': '🔬 Fase 3: Metodologia',
  'phase-4-writing': '✍️ Fase 4: Escrita e Estruturação',
  'phase-5-review': '🔍 Fase 5: Revisão e Validação',
  'phase-6-finalization': '🎯 Fase 6: Finalização e Publicação'
};

/**
 * Lista todos os workflows
 */
export function listWorkflows(options = {}) {
  console.log(chalk.cyan.bold('\n📋 AD-KS - Workflows Disponíveis\n'));
  
  const showDetails = options.verbose || options.v;
  
  // Contagem total
  let total = 0;
  Object.values(WORKFLOWS_DATA).forEach(phase => total += phase.length);
  
  console.log(chalk.white(`Total: ${total} workflows em ${Object.keys(WORKFLOWS_DATA).length - 1} fases\n`));
  console.log(chalk.gray('─'.repeat(60)) + '\n');
  
  // Listar por fase
  for (const [phase, workflows] of Object.entries(WORKFLOWS_DATA)) {
    const phaseName = PHASE_NAMES[phase] || phase;
    console.log(chalk.yellow.bold(phaseName) + chalk.gray(` (${workflows.length})`));
    
    for (const wf of workflows) {
      if (showDetails) {
        console.log(`  📌 ${chalk.cyan(wf.id)}`);
        console.log(`     ${chalk.white(wf.name)}`);
        console.log(`     ${chalk.gray(wf.description)}`);
      } else {
        console.log(`  ${chalk.cyan(wf.id)} - ${chalk.gray(wf.name)}`);
      }
    }
    console.log('');
  }
  
  if (!showDetails) {
    console.log(chalk.gray('Use --verbose ou -v para ver detalhes dos workflows.'));
  }
  
  console.log('');
}

/**
 * Mostra informações de um workflow específico
 */
export function showWorkflow(workflowId) {
  console.log(chalk.cyan.bold('\n📋 AD-KS - Informações do Workflow\n'));
  
  // Buscar workflow
  let foundWf = null;
  let foundPhase = null;
  
  for (const [phase, workflows] of Object.entries(WORKFLOWS_DATA)) {
    const wf = workflows.find(w => w.id === workflowId);
    if (wf) {
      foundWf = wf;
      foundPhase = phase;
      break;
    }
  }
  
  if (!foundWf) {
    console.log(chalk.red(`❌ Workflow "${workflowId}" não encontrado.\n`));
    console.log(chalk.gray('Use "adks workflows" para ver a lista completa.\n'));
    return;
  }
  
  // Mostrar informações
  console.log(chalk.yellow.bold(`📌 ${foundWf.id}`));
  console.log(chalk.gray('─'.repeat(40)));
  console.log(`${chalk.white('Nome:')} ${foundWf.name}`);
  console.log(`${chalk.white('Fase:')} ${PHASE_NAMES[foundPhase]}`);
  console.log(`${chalk.white('Descrição:')} ${foundWf.description}`);
  console.log('');
  console.log(chalk.gray(`Para iniciar: *${foundWf.id}`));
  console.log('');
}

/**
 * Lista workflows de uma fase específica
 */
export function listPhaseWorkflows(phaseNum) {
  const phaseKey = `phase-${phaseNum}-${getPhaseSlug(phaseNum)}`;
  
  if (!WORKFLOWS_DATA[phaseKey]) {
    console.log(chalk.red(`\n❌ Fase ${phaseNum} não encontrada.\n`));
    console.log(chalk.gray('Fases disponíveis: 1-6\n'));
    return;
  }
  
  console.log(chalk.cyan.bold(`\n📋 Workflows da ${PHASE_NAMES[phaseKey]}\n`));
  
  for (const wf of WORKFLOWS_DATA[phaseKey]) {
    console.log(`  ${chalk.cyan(wf.id)}`);
    console.log(`    ${chalk.white(wf.name)} - ${chalk.gray(wf.description)}`);
  }
  console.log('');
}

/**
 * Retorna slug da fase pelo número
 */
function getPhaseSlug(num) {
  const slugs = {
    1: 'exploration',
    2: 'literature',
    3: 'methodology',
    4: 'writing',
    5: 'review',
    6: 'finalization'
  };
  return slugs[num] || '';
}

/**
 * Handler principal
 */
export function workflowsCommand(workflowId, options) {
  if (options.phase) {
    listPhaseWorkflows(options.phase);
  } else if (workflowId) {
    showWorkflow(workflowId);
  } else {
    listWorkflows(options);
  }
}

export default workflowsCommand;
