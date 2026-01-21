/**
 * AD-KS CLI - Comando Status
 * 
 * Verifica o status da instalação do AD-KS no projeto
 */

import chalk from 'chalk';
import { existsSync, readFileSync, readdirSync } from 'fs';
import { join } from 'path';

/**
 * Estrutura de status da instalação
 */
const createStatus = () => ({
  installed: false,
  version: null,
  directory: null,
  configExists: false,
  manifestExists: false,
  language: null,
  ide: null,
  modules: {
    core: { installed: false, agents: 0 },
    arm: { installed: false, agents: 0, workflows: 0 }
  },
  totalAgents: 0,
  totalWorkflows: 0,
  projectConfig: null
});

/**
 * Verifica a instalação do AD-KS
 */
function checkInstallation(workingDir) {
  const status = createStatus();
  status.directory = workingDir;

  // Verifica diretório _adks
  const adksDir = join(workingDir, '_adks');
  if (!existsSync(adksDir)) {
    return status;
  }

  status.installed = true;

  // Verifica manifesto
  const manifestPath = join(adksDir, '_config', 'manifest.yaml');
  if (existsSync(manifestPath)) {
    status.manifestExists = true;
    try {
      // TODO: Parsear YAML quando implementado
      // const manifest = yaml.parse(readFileSync(manifestPath, 'utf8'));
      // status.version = manifest.version;
    } catch {
      // Ignora erros de parsing
    }
  }

  // Verifica configuração do projeto
  const configPath = join(adksDir, '_config', 'project-config.yaml');
  if (existsSync(configPath)) {
    status.configExists = true;
    try {
      // TODO: Parsear YAML quando implementado
      // const config = yaml.parse(readFileSync(configPath, 'utf8'));
      // status.language = config.language;
      // status.ide = config.ide;
      // status.projectConfig = config;
    } catch {
      // Ignora erros de parsing
    }
  }

  // Verifica módulo core
  const coreAgentsDir = join(adksDir, 'core', 'agents');
  if (existsSync(coreAgentsDir)) {
    status.modules.core.installed = true;
    status.modules.core.agents = countFiles(coreAgentsDir, '.md');
  }

  // Verifica módulo ARM
  const armAgentsDir = join(adksDir, 'arm', 'agents');
  const armWorkflowsDir = join(adksDir, 'arm', 'workflows');
  
  if (existsSync(armAgentsDir)) {
    status.modules.arm.installed = true;
    status.modules.arm.agents = countFiles(armAgentsDir, '.md');
  }
  
  if (existsSync(armWorkflowsDir)) {
    status.modules.arm.workflows = countFiles(armWorkflowsDir, '.md');
  }

  // Totais
  status.totalAgents = status.modules.core.agents + status.modules.arm.agents;
  status.totalWorkflows = status.modules.arm.workflows;

  return status;
}

/**
 * Conta arquivos com determinada extensão em um diretório
 */
function countFiles(dir, extension) {
  try {
    if (!existsSync(dir)) return 0;
    
    const files = readdirSync(dir);
    return files.filter(f => f.endsWith(extension)).length;
  } catch {
    return 0;
  }
}

/**
 * Exibe status formatado no console
 */
function displayStatus(status) {
  console.log('');
  
  if (!status.installed) {
    console.log(chalk.red('❌ AD-KS não está instalado neste diretório.'));
    console.log('');
    console.log(chalk.gray('   Diretório verificado:'));
    console.log(chalk.gray(`   ${status.directory}`));
    console.log('');
    console.log(chalk.gray('   Para instalar, execute:'));
    console.log(chalk.cyan('   npx ad-ks install'));
    console.log('');
    return;
  }

  console.log(chalk.green('✅ AD-KS está instalado'));
  console.log('');
  
  // Informações gerais
  console.log(chalk.white.bold('📋 Informações Gerais'));
  console.log(chalk.gray('─'.repeat(40)));
  console.log(`   Diretório: ${chalk.cyan(status.directory)}`);
  console.log(`   Versão: ${chalk.cyan(status.version || 'desconhecida')}`);
  console.log(`   Idioma: ${chalk.cyan(status.language || 'não configurado')}`);
  console.log(`   IDE: ${chalk.cyan(status.ide || 'não configurada')}`);
  console.log('');

  // Status dos módulos
  console.log(chalk.white.bold('📦 Módulos'));
  console.log(chalk.gray('─'.repeat(40)));
  
  // Core
  const coreStatus = status.modules.core.installed 
    ? chalk.green('✓ instalado') 
    : chalk.red('✗ não instalado');
  console.log(`   Core: ${coreStatus}`);
  if (status.modules.core.installed) {
    console.log(chalk.gray(`      Agentes: ${status.modules.core.agents}`));
  }

  // ARM
  const armStatus = status.modules.arm.installed 
    ? chalk.green('✓ instalado') 
    : chalk.red('✗ não instalado');
  console.log(`   ARM:  ${armStatus}`);
  if (status.modules.arm.installed) {
    console.log(chalk.gray(`      Agentes: ${status.modules.arm.agents}`));
    console.log(chalk.gray(`      Workflows: ${status.modules.arm.workflows}`));
  }
  console.log('');

  // Totais
  console.log(chalk.white.bold('📊 Totais'));
  console.log(chalk.gray('─'.repeat(40)));
  console.log(`   Agentes: ${chalk.cyan(status.totalAgents)}`);
  console.log(`   Workflows: ${chalk.cyan(status.totalWorkflows)}`);
  console.log('');

  // Arquivos de configuração
  console.log(chalk.white.bold('⚙️  Configuração'));
  console.log(chalk.gray('─'.repeat(40)));
  console.log(`   Manifesto: ${status.manifestExists ? chalk.green('✓') : chalk.red('✗')}`);
  console.log(`   Config: ${status.configExists ? chalk.green('✓') : chalk.red('✗')}`);
  console.log('');

  // Dica
  console.log(chalk.gray('💡 Digite ') + chalk.cyan('*workflow-init') + chalk.gray(' na IDE para começar.'));
  console.log('');
}

/**
 * Handler principal do comando status
 */
export async function statusCommand(options) {
  const workingDir = process.env.AD_KS_WORKING_DIR || process.cwd();
  
  const status = checkInstallation(workingDir);

  if (options.json) {
    console.log(JSON.stringify(status, null, 2));
  } else {
    displayStatus(status);
  }
}

/**
 * Configuração do comando para Commander
 */
export function setupStatusCommand(program) {
  program
    .command('status')
    .description('Verifica o status da instalação do AD-KS')
    .option('--json', 'Saída em formato JSON')
    .option('--verbose', 'Mostra informações detalhadas')
    .action(statusCommand);
}
