/**
 * AD-KS CLI - Comando Help
 * 
 * Mostra ajuda detalhada sobre comandos e uso do AD-KS
 */

import chalk from 'chalk';

/**
 * Mostra o banner do AD-KS
 */
export function showBanner() {
  console.log('');
  console.log(chalk.cyan('  ╔═══════════════════════════════════════════════════════════╗'));
  console.log(chalk.cyan('  ║') + chalk.white.bold('       🎓 AD-KS - Academic Knowledge System               ') + chalk.cyan('║'));
  console.log(chalk.cyan('  ║') + chalk.gray('       Framework de Agentes para Pesquisa Acadêmica        ') + chalk.cyan('║'));
  console.log(chalk.cyan('  ╚═══════════════════════════════════════════════════════════╝'));
  console.log('');
}

/**
 * Mostra ajuda geral
 */
function showGeneralHelp() {
  showBanner();
  
  console.log(chalk.white.bold('Comandos disponíveis:'));
  console.log('');
  console.log(chalk.cyan('  adks install') + chalk.gray('          Instala AD-KS no diretório atual'));
  console.log(chalk.cyan('  adks new [nome]') + chalk.gray('       Cria novo projeto de pesquisa'));
  console.log(chalk.cyan('  adks status') + chalk.gray('           Verifica status da instalação'));
  console.log(chalk.cyan('  adks agents') + chalk.gray('           Lista agentes disponíveis'));
  console.log(chalk.cyan('  adks workflows') + chalk.gray('        Lista workflows disponíveis'));
  console.log(chalk.cyan('  adks help') + chalk.gray('             Mostra esta ajuda'));
  console.log(chalk.cyan('  adks --version') + chalk.gray('        Mostra a versão'));
  console.log('');
  
  console.log(chalk.white.bold('Início Rápido:'));
  console.log('');
  console.log(chalk.gray('  # Instalar em projeto existente'));
  console.log(chalk.cyan('  npx ad-ks install'));
  console.log('');
  console.log(chalk.gray('  # Criar novo projeto'));
  console.log(chalk.cyan('  npx ad-ks new meu-projeto'));
  console.log('');
  
  console.log(chalk.white.bold('Após instalação, no Claude:'));
  console.log('');
  console.log(chalk.cyan('  *workflow-init') + chalk.gray('        Inicia workflow guiado'));
  console.log(chalk.cyan('  *help') + chalk.gray('                 Mostra ajuda dos agentes'));
  console.log(chalk.cyan('  *status') + chalk.gray('               Status do projeto'));
  console.log(chalk.cyan('  *list-agents') + chalk.gray('          Lista agentes disponíveis'));
  console.log(chalk.cyan('  *list-workflows') + chalk.gray('       Lista workflows'));
  console.log('');
  
  console.log(chalk.white.bold('Estatísticas:'));
  console.log('');
  console.log(chalk.gray('  • 29 agentes em 7 equipes'));
  console.log(chalk.gray('  • 24 workflows em 6 fases'));
  console.log(chalk.gray('  • Cobertura completa do ciclo de pesquisa'));
  console.log('');
  
  console.log(chalk.gray('Para ajuda de um comando específico:'));
  console.log(chalk.cyan('  adks help <comando>'));
  console.log('');
}

/**
 * Mostra ajuda do comando install
 */
function showInstallHelp() {
  showBanner();
  
  console.log(chalk.white.bold('Comando: install'));
  console.log(chalk.gray('Instala o framework AD-KS no diretório atual'));
  console.log('');
  
  console.log(chalk.white.bold('Uso:'));
  console.log(chalk.cyan('  adks install [opções]'));
  console.log('');
  
  console.log(chalk.white.bold('Opções:'));
  console.log('');
  console.log(chalk.cyan('  -l, --language <lang>') + chalk.gray('  Idioma (pt-br, en, es)'));
  console.log(chalk.cyan('  -y, --yes') + chalk.gray('              Instalação rápida (aceita padrões)'));
  console.log(chalk.cyan('  --debug') + chalk.gray('                Modo debug'));
  console.log('');
  
  console.log(chalk.white.bold('Exemplos:'));
  console.log('');
  console.log(chalk.cyan('  npx ad-ks install') + chalk.gray('        # Interativo'));
  console.log(chalk.cyan('  npx ad-ks install -y') + chalk.gray('     # Rápido'));
  console.log('');
}

/**
 * Mostra ajuda do comando new
 */
function showNewHelp() {
  showBanner();
  
  console.log(chalk.white.bold('Comando: new'));
  console.log(chalk.gray('Cria um novo projeto de pesquisa com estrutura AD-KS'));
  console.log('');
  
  console.log(chalk.white.bold('Uso:'));
  console.log(chalk.cyan('  adks new [nome-do-projeto]'));
  console.log('');
  
  console.log(chalk.white.bold('Exemplos:'));
  console.log('');
  console.log(chalk.cyan('  npx ad-ks new') + chalk.gray('              # Interativo'));
  console.log(chalk.cyan('  npx ad-ks new meu-tcc') + chalk.gray('      # Com nome'));
  console.log('');
}

/**
 * Mostra ajuda do comando agents
 */
function showAgentsHelp() {
  showBanner();
  
  console.log(chalk.white.bold('Comando: agents'));
  console.log(chalk.gray('Lista agentes disponíveis ou mostra informações de um agente'));
  console.log('');
  
  console.log(chalk.white.bold('Uso:'));
  console.log(chalk.cyan('  adks agents [agentId] [opções]'));
  console.log('');
  
  console.log(chalk.white.bold('Opções:'));
  console.log('');
  console.log(chalk.cyan('  -v, --verbose') + chalk.gray('  Mostra detalhes de cada agente'));
  console.log('');
  
  console.log(chalk.white.bold('Exemplos:'));
  console.log('');
  console.log(chalk.cyan('  adks agents') + chalk.gray('                # Lista todos'));
  console.log(chalk.cyan('  adks agents -v') + chalk.gray('              # Com detalhes'));
  console.log(chalk.cyan('  adks agents academic-writer') + chalk.gray(' # Info de um agente'));
  console.log('');
}

/**
 * Mostra ajuda do comando workflows
 */
function showWorkflowsHelp() {
  showBanner();
  
  console.log(chalk.white.bold('Comando: workflows'));
  console.log(chalk.gray('Lista workflows disponíveis ou mostra informações de um workflow'));
  console.log('');
  
  console.log(chalk.white.bold('Uso:'));
  console.log(chalk.cyan('  adks workflows [workflowId] [opções]'));
  console.log('');
  
  console.log(chalk.white.bold('Opções:'));
  console.log('');
  console.log(chalk.cyan('  -v, --verbose') + chalk.gray('      Mostra detalhes de cada workflow'));
  console.log(chalk.cyan('  -p, --phase <n>') + chalk.gray('    Lista workflows de uma fase (1-6)'));
  console.log('');
  
  console.log(chalk.white.bold('Exemplos:'));
  console.log('');
  console.log(chalk.cyan('  adks workflows') + chalk.gray('              # Lista todos'));
  console.log(chalk.cyan('  adks workflows -p 1') + chalk.gray('         # Fase 1'));
  console.log(chalk.cyan('  adks workflows write-review') + chalk.gray(' # Info de um workflow'));
  console.log('');
}

/**
 * Mostra ajuda do comando status
 */
function showStatusHelp() {
  showBanner();
  
  console.log(chalk.white.bold('Comando: status'));
  console.log(chalk.gray('Verifica o status da instalação do AD-KS no diretório atual'));
  console.log('');
  
  console.log(chalk.white.bold('Uso:'));
  console.log(chalk.cyan('  adks status [opções]'));
  console.log('');
  
  console.log(chalk.white.bold('Opções:'));
  console.log('');
  console.log(chalk.cyan('  --json') + chalk.gray('      Saída em formato JSON'));
  console.log(chalk.cyan('  --verbose') + chalk.gray('   Informações detalhadas'));
  console.log('');
}

/**
 * Handler principal do comando help
 */
export async function helpCommand(commandName) {
  if (!commandName) {
    showGeneralHelp();
    return;
  }

  switch (commandName.toLowerCase()) {
    case 'install':
      showInstallHelp();
      break;
    case 'new':
      showNewHelp();
      break;
    case 'agents':
      showAgentsHelp();
      break;
    case 'workflows':
      showWorkflowsHelp();
      break;
    case 'status':
      showStatusHelp();
      break;
    default:
      console.log(chalk.red(`\nComando desconhecido: ${commandName}`));
      console.log(chalk.gray('Use ') + chalk.cyan('adks help') + chalk.gray(' para ver os comandos disponíveis.\n'));
  }
}

/**
 * Configuração do comando para Commander
 */
export function setupHelpCommand(program) {
  program
    .command('help [command]')
    .description('Mostra ajuda sobre comandos')
    .action(helpCommand);
}
