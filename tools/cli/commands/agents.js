#!/usr/bin/env node

/**
 * AD-KS Agents Command
 * 
 * Lista e mostra informações sobre agentes disponíveis
 */

import chalk from 'chalk';

/**
 * Dados dos agentes (hardcoded para performance)
 */
const AGENTS_DATA = {
  core: [
    { id: 'adks-master', name: 'ADKS Master', icon: '🎓', role: 'Orquestrador principal do sistema' }
  ],
  
  'team-builder': [
    { id: 'context-analyst', name: 'Dr. Marco', icon: '🔍', role: 'Analista de contexto acadêmico' },
    { id: 'agent-builder', name: 'Dra. Sofia', icon: '🛠️', role: 'Construtora de agentes personalizados' },
    { id: 'domain-expert', name: 'Prof. André', icon: '📚', role: 'Especialista em domínio científico' }
  ],
  
  'team-ideation': [
    { id: 'idea-facilitator', name: 'Dra. Clara', icon: '💡', role: 'Facilitadora de brainstorming' },
    { id: 'question-architect', name: 'Prof. Rafael', icon: '❓', role: 'Arquiteto de perguntas de pesquisa' },
    { id: 'hypothesis-builder', name: 'Dra. Helena', icon: '🔮', role: 'Construtora de hipóteses' },
    { id: 'gap-identifier', name: 'Dr. Lucas', icon: '🔍', role: 'Identificador de lacunas' },
    { id: 'vision-synthesizer', name: 'Dra. Marina', icon: '🎯', role: 'Sintetizadora de visão do projeto' }
  ],
  
  'team-rigor': [
    { id: 'method-validator', name: 'Prof. Ricardo', icon: '🔬', role: 'Validador de metodologia' },
    { id: 'logic-checker', name: 'Dra. Beatriz', icon: '🧠', role: 'Verificadora de lógica' },
    { id: 'citation-auditor', name: 'Prof. Gustavo', icon: '📚', role: 'Auditor de citações' },
    { id: 'bias-detector', name: 'Dra. Fernanda', icon: '⚖️', role: 'Detectora de vieses' }
  ],
  
  'team-literature': [
    { id: 'literature-curator', name: 'Dra. Camila', icon: '📖', role: 'Curadora de literatura' },
    { id: 'theory-connector', name: 'Prof. Daniel', icon: '🔗', role: 'Conector de teorias' },
    { id: 'synthesis-writer', name: 'Dra. Patricia', icon: '✍️', role: 'Escritora de síntese' },
    { id: 'reference-manager', name: 'Prof. Tiago', icon: '📑', role: 'Gerenciador de referências' }
  ],
  
  'team-methodology': [
    { id: 'method-architect', name: 'Prof. Eduardo', icon: '🔧', role: 'Arquiteto de metodologia' },
    { id: 'procedure-designer', name: 'Dra. Renata', icon: '📋', role: 'Designer de procedimentos' },
    { id: 'data-strategist', name: 'Prof. Marcos', icon: '📊', role: 'Estrategista de dados' },
    { id: 'feasibility-expert', name: 'Dra. Carla', icon: '⚙️', role: 'Especialista em viabilidade' }
  ],
  
  'team-writing': [
    { id: 'academic-writer', name: 'Prof. Augusto', icon: '✍️', role: 'Escritor acadêmico sênior' },
    { id: 'structure-designer', name: 'Dra. Isabela', icon: '🏗️', role: 'Designer de estrutura' },
    { id: 'style-guardian', name: 'Prof. Vicente', icon: '📐', role: 'Guardião do estilo' },
    { id: 'latex-specialist', name: 'Dr. Henrique', icon: '📄', role: 'Especialista em LaTeX' },
    { id: 'presentation-expert', name: 'Dra. Juliana', icon: '🎤', role: 'Especialista em apresentações' }
  ],
  
  'team-planning': [
    { id: 'project-planner', name: 'Dra. Amanda', icon: '📅', role: 'Planejadora de projetos' },
    { id: 'progress-tracker', name: 'Prof. Felipe', icon: '📈', role: 'Rastreador de progresso' },
    { id: 'task-coordinator', name: 'Dra. Lívia', icon: '✅', role: 'Coordenadora de tarefas' }
  ]
};

/**
 * Lista todos os agentes
 */
export function listAgents(options = {}) {
  console.log(chalk.cyan.bold('\n🤖 AD-KS - Agentes Disponíveis\n'));
  
  const showDetails = options.verbose || options.v;
  
  // Contagem total
  let total = 0;
  Object.values(AGENTS_DATA).forEach(team => total += team.length);
  
  console.log(chalk.white(`Total: ${total} agentes em ${Object.keys(AGENTS_DATA).length} equipes\n`));
  console.log(chalk.gray('─'.repeat(60)) + '\n');
  
  // Listar por equipe
  for (const [team, agents] of Object.entries(AGENTS_DATA)) {
    const teamName = team === 'core' ? '🎯 Core' : `👥 ${formatTeamName(team)}`;
    console.log(chalk.yellow.bold(teamName) + chalk.gray(` (${agents.length})`));
    
    if (showDetails) {
      for (const agent of agents) {
        console.log(`  ${agent.icon} ${chalk.cyan(agent.id)}`);
        console.log(`     ${chalk.white(agent.name)} - ${chalk.gray(agent.role)}`);
      }
    } else {
      const agentList = agents.map(a => `${a.icon} ${a.id}`).join(', ');
      console.log(chalk.gray(`  ${agentList}`));
    }
    console.log('');
  }
  
  if (!showDetails) {
    console.log(chalk.gray('Use --verbose ou -v para ver detalhes dos agentes.'));
  }
  
  console.log('');
}

/**
 * Mostra informações de um agente específico
 */
export function showAgent(agentId) {
  console.log(chalk.cyan.bold('\n🤖 AD-KS - Informações do Agente\n'));
  
  // Buscar agente
  let foundAgent = null;
  let foundTeam = null;
  
  for (const [team, agents] of Object.entries(AGENTS_DATA)) {
    const agent = agents.find(a => a.id === agentId);
    if (agent) {
      foundAgent = agent;
      foundTeam = team;
      break;
    }
  }
  
  if (!foundAgent) {
    console.log(chalk.red(`❌ Agente "${agentId}" não encontrado.\n`));
    console.log(chalk.gray('Use "adks agents" para ver a lista completa.\n'));
    return;
  }
  
  // Mostrar informações
  console.log(chalk.yellow.bold(`${foundAgent.icon} ${foundAgent.id}`));
  console.log(chalk.gray('─'.repeat(40)));
  console.log(`${chalk.white('Nome:')} ${foundAgent.name}`);
  console.log(`${chalk.white('Equipe:')} ${formatTeamName(foundTeam)}`);
  console.log(`${chalk.white('Função:')} ${foundAgent.role}`);
  console.log('');
  console.log(chalk.gray(`Para usar: *team-${foundTeam.replace('team-', '')} ou mencione ${foundAgent.id}`));
  console.log('');
}

/**
 * Formata nome da equipe
 */
function formatTeamName(team) {
  const names = {
    'core': 'Core',
    'team-builder': 'Team Builder',
    'team-ideation': 'Team Ideation',
    'team-rigor': 'Team Rigor',
    'team-literature': 'Team Literature',
    'team-methodology': 'Team Methodology',
    'team-writing': 'Team Writing',
    'team-planning': 'Team Planning'
  };
  return names[team] || team;
}

/**
 * Handler principal
 */
export function agentsCommand(agentId, options) {
  if (agentId) {
    showAgent(agentId);
  } else {
    listAgents(options);
  }
}

export default agentsCommand;
