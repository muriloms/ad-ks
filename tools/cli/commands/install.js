/**
 * AD-KS CLI - Comando Install
 * 
 * Instala o framework AD-KS no projeto atual
 */

import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import yaml from 'yaml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Caminhos
const PACKAGE_ROOT = join(__dirname, '..', '..', '..');
const TEMPLATES_DIR = join(PACKAGE_ROOT, 'src', 'core', 'templates');

/**
 * Estrutura de diretórios do AD-KS
 */
const ADKS_STRUCTURE = [
  '_adks',
  '_adks/_config',
  '_adks/_memory',
  '_adks/_docs',
  '_adks/_docs/01-exploration',
  '_adks/_docs/02-literature',
  '_adks/_docs/03-methodology',
  '_adks/_docs/04-writing',
  '_adks/_docs/05-review',
  '_adks/_docs/06-final',
  '_adks/_customizations',
  '_adks/_uploads'
];

/**
 * Opções de idioma
 */
const LANGUAGES = [
  { name: 'Português Brasileiro', value: 'pt-br' },
  { name: 'English', value: 'en' },
  { name: 'Español', value: 'es' }
];

/**
 * Tipos de publicação
 */
const PUBLICATION_TYPES = [
  { name: 'Artigo Científico', value: 'article' },
  { name: 'Dissertação de Mestrado', value: 'dissertation' },
  { name: 'Tese de Doutorado', value: 'thesis' },
  { name: 'Trabalho de Conclusão (TCC)', value: 'tcc' },
  { name: 'Relatório Técnico', value: 'report' }
];

/**
 * Estilos de citação
 */
const CITATION_STYLES = [
  { name: 'ABNT', value: 'abnt' },
  { name: 'APA (7ª edição)', value: 'apa' },
  { name: 'Vancouver', value: 'vancouver' },
  { name: 'IEEE', value: 'ieee' },
  { name: 'Chicago', value: 'chicago' }
];

/**
 * Cria estrutura de diretórios
 */
function createDirectoryStructure(targetDir) {
  const created = [];
  
  for (const dir of ADKS_STRUCTURE) {
    const fullPath = join(targetDir, dir);
    if (!existsSync(fullPath)) {
      mkdirSync(fullPath, { recursive: true });
      created.push(dir);
    }
  }
  
  return created;
}

/**
 * Obtém versão do package.json
 */
function getPackageVersion() {
  try {
    const packagePath = join(PACKAGE_ROOT, 'package.json');
    const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'));
    return packageJson.version;
  } catch {
    return '0.1.0';
  }
}

/**
 * Cria arquivo de configuração do projeto
 */
function createProjectConfig(targetDir, config) {
  const templatePath = join(TEMPLATES_DIR, 'project-config.template.yaml');
  let configContent;
  
  if (existsSync(templatePath)) {
    configContent = readFileSync(templatePath, 'utf8');
    const configObj = yaml.parse(configContent);
    
    configObj.project.name = config.projectName || 'Meu Projeto';
    configObj.project.type = config.publicationType || 'article';
    configObj.project.language = config.language || 'pt-br';
    configObj.project.researcher.name = config.researcherName || '';
    configObj.target.style = config.citationStyle || 'abnt';
    configObj.metadata.created_at = new Date().toISOString();
    configObj.metadata.updated_at = new Date().toISOString();
    configObj.metadata.adks_version = getPackageVersion();
    
    configContent = yaml.stringify(configObj);
  } else {
    configContent = `# AD-KS Project Configuration
project:
  name: "${config.projectName || 'Meu Projeto'}"
  type: ${config.publicationType || 'article'}
  language: ${config.language || 'pt-br'}
  researcher:
    name: "${config.researcherName || ''}"

target:
  style: ${config.citationStyle || 'abnt'}

adks:
  mode: guided
  memory:
    enabled: true
    base_dir: "_adks/_memory"

phases:
  current: 1
  completed: []

metadata:
  created_at: "${new Date().toISOString()}"
  adks_version: "${getPackageVersion()}"
`;
  }
  
  const configPath = join(targetDir, '_adks', '_config', 'project.yaml');
  writeFileSync(configPath, configContent);
  
  return configPath;
}

/**
 * Cria o arquivo CLAUDE.md principal
 */
function createClaudeMd(targetDir) {
  const templatePath = join(TEMPLATES_DIR, 'CLAUDE.template.md');
  let content;
  
  if (existsSync(templatePath)) {
    content = readFileSync(templatePath, 'utf8');
  } else {
    content = `# AD-KS: Academic Knowledge System

> Sistema multi-agente para suporte à pesquisa acadêmica

## 🎓 ADKS Master - Seu Assistente de Pesquisa

Olá! Sou o **ADKS Master**, seu assistente principal para pesquisa acadêmica.

## 🚀 Comandos Rápidos

| Comando | Descrição |
|---------|-----------|
| \`*help\` | Ver todos os comandos disponíveis |
| \`*status\` | Ver status atual do projeto |
| \`*workflow-init\` | Iniciar um novo workflow |
| \`*list-agents\` | Listar todos os agentes |
| \`*list-workflows\` | Listar todos os workflows |

## 👥 Times Disponíveis

- 🏗️ **Team Builder** - Personalização de agentes
- 💡 **Team Ideation** - Exploração de ideias
- 🔬 **Team Rigor** - Validação e rigor
- 📚 **Team Literature** - Revisão da literatura
- 🔧 **Team Methodology** - Design metodológico
- ✍️ **Team Writing** - Escrita acadêmica
- 📅 **Team Planning** - Planejamento e gestão

---

**Como começar?** Digite \`*workflow-init\` ou simplesmente me diga o que você precisa!
`;
  }
  
  const claudePath = join(targetDir, 'CLAUDE.md');
  writeFileSync(claudePath, content);
  
  return claudePath;
}

/**
 * Cria arquivos auxiliares
 */
function createAuxiliaryFiles(targetDir) {
  // .gitkeep em diretórios vazios
  const emptyDirs = ['_adks/_memory', '_adks/_customizations', '_adks/_uploads'];
  for (const dir of emptyDirs) {
    const gitkeepPath = join(targetDir, dir, '.gitkeep');
    if (!existsSync(gitkeepPath)) {
      writeFileSync(gitkeepPath, '');
    }
  }
  
  // .gitignore para _adks
  const gitignoreContent = `# AD-KS Generated Files
_adks/_memory/*.yaml
_adks/_uploads/*
!_adks/_uploads/.gitkeep
*.tmp
*.bak
`;
  writeFileSync(join(targetDir, '_adks', '.gitignore'), gitignoreContent);
}

/**
 * Executa a instalação interativa
 */
async function runInteractiveInstall(workingDir, options) {
  console.log('');
  console.log(chalk.cyan.bold('🎓 AD-KS - Academic Knowledge System'));
  console.log(chalk.gray('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
  console.log('');

  // Verifica instalação existente
  const adksDir = join(workingDir, '_adks');
  if (existsSync(adksDir)) {
    console.log(chalk.yellow('⚠️  AD-KS já está instalado neste diretório.'));
    console.log('');
    
    const { action } = await inquirer.prompt([{
      type: 'list',
      name: 'action',
      message: 'O que deseja fazer?',
      choices: [
        { name: 'Reinstalar (sobrescrever)', value: 'reinstall' },
        { name: 'Cancelar', value: 'cancel' }
      ]
    }]);

    if (action === 'cancel') {
      console.log(chalk.gray('\nInstalação cancelada.\n'));
      return;
    }
  }

  console.log(chalk.white('📝 Vamos configurar seu projeto:\n'));

  // Coleta configurações
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Nome do projeto:',
      default: 'Meu Projeto de Pesquisa'
    },
    {
      type: 'list',
      name: 'publicationType',
      message: 'Tipo de documento:',
      choices: PUBLICATION_TYPES
    },
    {
      type: 'list',
      name: 'language',
      message: 'Idioma principal:',
      choices: LANGUAGES
    },
    {
      type: 'list',
      name: 'citationStyle',
      message: 'Estilo de citação:',
      choices: CITATION_STYLES
    },
    {
      type: 'input',
      name: 'researcherName',
      message: 'Seu nome (opcional):',
      default: ''
    }
  ]);

  console.log('');
  const spinner = ora('Instalando AD-KS...').start();

  try {
    // 1. Cria estrutura
    spinner.text = 'Criando estrutura de diretórios...';
    createDirectoryStructure(workingDir);
    
    // 2. Cria configuração
    spinner.text = 'Criando configuração do projeto...';
    createProjectConfig(workingDir, answers);
    
    // 3. Cria CLAUDE.md
    spinner.text = 'Criando CLAUDE.md...';
    createClaudeMd(workingDir);
    
    // 4. Cria arquivos auxiliares
    spinner.text = 'Finalizando...';
    createAuxiliaryFiles(workingDir);
    
    spinner.succeed(chalk.green('AD-KS instalado com sucesso!'));
    
    // Resumo
    console.log('');
    console.log(chalk.gray('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
    console.log('');
    console.log(chalk.white('📁 Estrutura criada:\n'));
    console.log(chalk.cyan('   CLAUDE.md') + chalk.gray('              # Arquivo principal'));
    console.log(chalk.cyan('   _adks/'));
    console.log(chalk.gray('   ├── _config/           # Configurações'));
    console.log(chalk.gray('   ├── _memory/           # Memória dos agentes'));
    console.log(chalk.gray('   ├── _docs/             # Documentos gerados'));
    console.log(chalk.gray('   │   ├── 01-exploration/'));
    console.log(chalk.gray('   │   ├── 02-literature/'));
    console.log(chalk.gray('   │   ├── 03-methodology/'));
    console.log(chalk.gray('   │   ├── 04-writing/'));
    console.log(chalk.gray('   │   ├── 05-review/'));
    console.log(chalk.gray('   │   └── 06-final/'));
    console.log(chalk.gray('   ├── _customizations/   # Customizações'));
    console.log(chalk.gray('   └── _uploads/          # Seus arquivos'));
    console.log('');
    console.log(chalk.gray('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'));
    console.log('');
    console.log(chalk.white.bold('🚀 Próximos passos:\n'));
    console.log(chalk.gray('   1. Abra este diretório no Claude (claude.ai/projects)'));
    console.log(chalk.gray('   2. Adicione o arquivo ') + chalk.cyan('CLAUDE.md') + chalk.gray(' ao projeto'));
    console.log(chalk.gray('   3. Digite ') + chalk.cyan('*workflow-init') + chalk.gray(' para começar!'));
    console.log('');

  } catch (error) {
    spinner.fail(chalk.red('Erro durante instalação'));
    console.error(chalk.red(`\nDetalhes: ${error.message}`));
    if (options.debug) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

/**
 * Executa instalação rápida (sem prompts)
 */
async function runQuickInstall(workingDir, options) {
  console.log('');
  console.log(chalk.cyan.bold('🎓 AD-KS - Instalação Rápida'));
  console.log('');

  const config = {
    projectName: 'Meu Projeto de Pesquisa',
    publicationType: 'article',
    language: options.language || 'pt-br',
    citationStyle: 'abnt',
    researcherName: ''
  };

  const spinner = ora('Instalando AD-KS...').start();

  try {
    createDirectoryStructure(workingDir);
    createProjectConfig(workingDir, config);
    createClaudeMd(workingDir);
    createAuxiliaryFiles(workingDir);
    
    spinner.succeed(chalk.green('AD-KS instalado com sucesso!'));
    console.log('');
    console.log(chalk.gray('Execute ') + chalk.cyan('adks status') + chalk.gray(' para ver detalhes.'));
    console.log('');

  } catch (error) {
    spinner.fail(chalk.red('Erro durante instalação'));
    console.error(chalk.red(`\nDetalhes: ${error.message}`));
    process.exit(1);
  }
}

/**
 * Handler principal do comando install
 */
export async function installCommand(options) {
  const workingDir = process.env.AD_KS_WORKING_DIR || process.cwd();

  if (options.yes) {
    await runQuickInstall(workingDir, options);
  } else {
    await runInteractiveInstall(workingDir, options);
  }
}

/**
 * Configuração do comando para Commander
 */
export function setupInstallCommand(program) {
  program
    .command('install')
    .description('Instala AD-KS no projeto atual')
    .option('-l, --language <lang>', 'Idioma (pt-br, en, es)', 'pt-br')
    .option('-y, --yes', 'Aceita opções padrão (instalação rápida)')
    .option('--debug', 'Modo debug com logs detalhados')
    .action(installCommand);
}
