#!/usr/bin/env node

/**
 * AD-KS New Project Command
 * 
 * Cria um novo projeto de pesquisa com estrutura AD-KS
 */

import { mkdir, writeFile, copyFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';
import ora from 'ora';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Template de configuração do projeto
 */
function generateProjectConfig(answers) {
  return `# Configuração do Projeto AD-KS
# Gerado automaticamente em ${new Date().toISOString()}

project:
  name: "${answers.projectName}"
  title: "${answers.projectTitle}"
  type: ${answers.projectType}
  language: ${answers.language}
  
researcher:
  name: "${answers.researcherName}"
  level: ${answers.level}
  area: "${answers.area}"
  
settings:
  auto_save: true
  ask_before_proceed: true
  memory_enabled: true
  
phases:
  current: 1
  completed: []
  
created_at: ${new Date().toISOString()}
`;
}

/**
 * Template do README do projeto
 */
function generateProjectReadme(answers) {
  return `# ${answers.projectTitle}

> Projeto de pesquisa gerenciado com AD-KS (Agent-Driven Knowledge System)

## Informações do Projeto

- **Tipo:** ${answers.projectType}
- **Área:** ${answers.area}
- **Pesquisador:** ${answers.researcherName}
- **Criado em:** ${new Date().toLocaleDateString('pt-BR')}

## Estrutura

\`\`\`
${answers.projectName}/
├── _adks/                    # Sistema AD-KS
│   ├── _config/              # Configurações
│   ├── _memory/              # Memória dos agentes
│   ├── _docs/                # Documentos gerados
│   └── _uploads/             # Arquivos enviados
├── docs/                     # Documentação do projeto
├── data/                     # Dados da pesquisa
├── references/               # Referências bibliográficas
└── output/                   # Saídas finais
\`\`\`

## Como Usar

### Iniciar sessão de trabalho
Abra o Claude e use o comando:
\`\`\`
*workflow-init
\`\`\`

### Comandos úteis
- \`*help\` - Ver ajuda
- \`*status\` - Ver status do projeto
- \`*list-agents\` - Ver agentes disponíveis
- \`*list-workflows\` - Ver workflows disponíveis

## Fases do Projeto

1. [ ] Exploração e Definição
2. [ ] Revisão da Literatura
3. [ ] Metodologia
4. [ ] Escrita e Estruturação
5. [ ] Revisão e Validação
6. [ ] Finalização e Publicação

---

*Gerado com [AD-KS](https://github.com/yourusername/ad-ks)*
`;
}

/**
 * Estrutura de diretórios do projeto
 */
const PROJECT_STRUCTURE = [
  '_adks',
  '_adks/_config',
  '_adks/_memory',
  '_adks/_memory/agents',
  '_adks/_memory/workflows',
  '_adks/_docs',
  '_adks/_docs/01-exploration',
  '_adks/_docs/02-literature',
  '_adks/_docs/03-methodology',
  '_adks/_docs/04-writing',
  '_adks/_docs/05-review',
  '_adks/_docs/06-final',
  '_adks/_uploads',
  'docs',
  'data',
  'references',
  'output'
];

/**
 * Cria novo projeto
 */
export async function newProject(projectPath) {
  console.log(chalk.cyan.bold('\n🆕 AD-KS - Criar Novo Projeto\n'));
  
  // Perguntas interativas
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Nome do projeto (pasta):',
      default: projectPath || 'meu-projeto',
      validate: (input) => {
        if (/^[a-z0-9-_]+$/i.test(input)) return true;
        return 'Use apenas letras, números, hífens e underscores';
      }
    },
    {
      type: 'input',
      name: 'projectTitle',
      message: 'Título do projeto:',
      default: 'Meu Projeto de Pesquisa'
    },
    {
      type: 'list',
      name: 'projectType',
      message: 'Tipo de projeto:',
      choices: [
        { name: 'Artigo científico', value: 'article' },
        { name: 'Dissertação de mestrado', value: 'dissertation' },
        { name: 'Tese de doutorado', value: 'thesis' },
        { name: 'TCC/Monografia', value: 'monograph' },
        { name: 'Relatório técnico', value: 'report' },
        { name: 'Outro', value: 'other' }
      ]
    },
    {
      type: 'input',
      name: 'researcherName',
      message: 'Seu nome:',
      default: 'Pesquisador'
    },
    {
      type: 'list',
      name: 'level',
      message: 'Nível acadêmico:',
      choices: [
        { name: 'Graduação', value: 'undergraduate' },
        { name: 'Mestrado', value: 'masters' },
        { name: 'Doutorado', value: 'doctorate' },
        { name: 'Pós-doutorado', value: 'postdoc' },
        { name: 'Professor/Pesquisador', value: 'professor' }
      ]
    },
    {
      type: 'input',
      name: 'area',
      message: 'Área de pesquisa:',
      default: 'Ciências'
    },
    {
      type: 'list',
      name: 'language',
      message: 'Idioma principal:',
      choices: [
        { name: 'Português', value: 'pt-br' },
        { name: 'English', value: 'en' },
        { name: 'Español', value: 'es' }
      ],
      default: 'pt-br'
    }
  ]);
  
  const targetDir = join(process.cwd(), answers.projectName);
  
  // Verificar se já existe
  if (existsSync(targetDir)) {
    console.log(chalk.red(`\n❌ O diretório "${answers.projectName}" já existe.\n`));
    return;
  }
  
  const spinner = ora('Criando estrutura do projeto...').start();
  
  try {
    // Criar diretórios
    for (const dir of PROJECT_STRUCTURE) {
      await mkdir(join(targetDir, dir), { recursive: true });
    }
    spinner.text = 'Gerando arquivos de configuração...';
    
    // Criar arquivo de configuração
    await writeFile(
      join(targetDir, '_adks/_config/project-config.yaml'),
      generateProjectConfig(answers)
    );
    
    // Criar README
    await writeFile(
      join(targetDir, 'README.md'),
      generateProjectReadme(answers)
    );
    
    // Criar .gitignore
    await writeFile(
      join(targetDir, '.gitignore'),
      `# AD-KS
_adks/_memory/
_adks/_uploads/

# OS
.DS_Store
Thumbs.db

# Editor
.vscode/
.idea/

# Temp
*.tmp
*.temp
`
    );
    
    // Criar arquivo de sessão inicial
    await writeFile(
      join(targetDir, '_adks/_memory/session.yaml'),
      `# Sessão AD-KS
session:
  started_at: ${new Date().toISOString()}
  current_agent: adks-master
  current_workflow: null
  history: []
`
    );
    
    spinner.succeed('Projeto criado com sucesso!');
    
    // Instruções finais
    console.log(chalk.green('\n✅ Projeto criado com sucesso!\n'));
    console.log(chalk.white('Próximos passos:\n'));
    console.log(chalk.cyan(`  1. cd ${answers.projectName}`));
    console.log(chalk.cyan('  2. Abra o Claude e inicie com: *workflow-init'));
    console.log(chalk.cyan('  3. Ou explore com: *help\n'));
    
    console.log(chalk.gray('─'.repeat(50)));
    console.log(chalk.white('\n📁 Estrutura criada:\n'));
    console.log(chalk.gray(`  ${answers.projectName}/`));
    console.log(chalk.gray('  ├── _adks/          # Sistema AD-KS'));
    console.log(chalk.gray('  ├── docs/           # Documentação'));
    console.log(chalk.gray('  ├── data/           # Dados'));
    console.log(chalk.gray('  ├── references/     # Referências'));
    console.log(chalk.gray('  └── output/         # Saídas finais\n'));
    
  } catch (error) {
    spinner.fail('Erro ao criar projeto');
    console.error(chalk.red('\nErro:', error.message));
  }
}

export default newProject;
