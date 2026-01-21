#!/usr/bin/env node

/**
 * AD-KS CLI Principal
 * 
 * Academic Knowledge System
 * Framework de agentes de IA para pesquisa acadêmica
 * 
 * Comandos:
 *   install    - Instala AD-KS no diretório atual
 *   new        - Cria novo projeto de pesquisa
 *   status     - Verifica status da instalação
 *   agents     - Lista agentes disponíveis
 *   workflows  - Lista workflows disponíveis
 *   help       - Mostra ajuda
 */

import { Command } from 'commander';
import chalk from 'chalk';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Importa comandos modulares
import { setupInstallCommand } from './commands/install.js';
import { setupStatusCommand } from './commands/status.js';
import { setupHelpCommand, showBanner } from './commands/help.js';
import { newProject } from './commands/new.js';
import { agentsCommand } from './commands/agents.js';
import { workflowsCommand } from './commands/workflows.js';

// Obtém diretórios
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Carrega versão do package.json
 */
function getVersion() {
  try {
    const packagePath = join(__dirname, '..', '..', 'package.json');
    const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'));
    return packageJson.version;
  } catch {
    return '0.1.0';
  }
}

/**
 * Configura e executa o CLI
 */
function main() {
  const program = new Command();

  // Configuração básica
  program
    .name('adks')
    .description('AD-KS: Academic Knowledge System - Framework de agentes de IA para pesquisa acadêmica')
    .version(getVersion(), '-v, --version', 'Mostra a versão do AD-KS')
    .helpOption('-h, --help', 'Mostra ajuda');

  // Registra comandos modulares existentes
  setupInstallCommand(program);
  setupStatusCommand(program);
  setupHelpCommand(program);

  // Comando new - criar novo projeto
  program
    .command('new [projectName]')
    .description('Cria um novo projeto de pesquisa')
    .action(async (projectName) => {
      await newProject(projectName);
    });

  // Comando agents - listar agentes
  program
    .command('agents [agentId]')
    .description('Lista agentes disponíveis ou mostra informações de um agente')
    .option('-v, --verbose', 'Mostra detalhes de cada agente')
    .action((agentId, options) => {
      agentsCommand(agentId, options);
    });

  // Comando workflows - listar workflows
  program
    .command('workflows [workflowId]')
    .description('Lista workflows disponíveis ou mostra informações de um workflow')
    .option('-v, --verbose', 'Mostra detalhes de cada workflow')
    .option('-p, --phase <number>', 'Lista workflows de uma fase específica (1-6)')
    .action((workflowId, options) => {
      workflowsCommand(workflowId, options);
    });

  // Comando padrão (sem argumentos)
  program
    .action(() => {
      showBanner();
      console.log(chalk.gray('Use ') + chalk.cyan('adks help') + chalk.gray(' para ver os comandos disponíveis.\n'));
    });

  // Trata erros de comando desconhecido
  program.on('command:*', () => {
    console.error(chalk.red(`\nComando inválido: ${program.args.join(' ')}`));
    console.log(chalk.gray('Use ') + chalk.cyan('adks help') + chalk.gray(' para ver os comandos disponíveis.\n'));
    process.exit(1);
  });

  // Parse dos argumentos
  program.parse(process.argv);

  // Se nenhum argumento foi passado, mostra banner
  if (process.argv.length === 2) {
    showBanner();
    console.log(chalk.gray('Use ') + chalk.cyan('adks help') + chalk.gray(' para ver os comandos disponíveis.\n'));
  }
}

// Executa
main();
