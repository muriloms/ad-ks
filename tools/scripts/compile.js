#!/usr/bin/env node

/**
 * AD-KS Compile Script
 * 
 * Script para compilar arquivos YAML para Markdown via linha de comando
 * 
 * Uso:
 *   node tools/scripts/compile.js [opções]
 *   npm run compile
 * 
 * Opções:
 *   --input, -i    Arquivo ou diretório de entrada
 *   --output, -o   Diretório de saída
 *   --watch, -w    Modo watch (recompila ao detectar mudanças)
 *   --verbose, -v  Saída detalhada
 */

import { readdirSync, statSync, existsSync, watch } from 'fs';
import { join, dirname, basename, extname } from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import { compileFile, compileFiles } from '../cli/lib/compiler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Encontra arquivos YAML recursivamente
 */
function findYamlFiles(dir, pattern = '.yaml') {
  const files = [];
  
  try {
    const items = readdirSync(dir);
    
    for (const item of items) {
      const fullPath = join(dir, item);
      const stat = statSync(fullPath);
      
      if (stat.isDirectory()) {
        files.push(...findYamlFiles(fullPath, pattern));
      } else if (item.endsWith(pattern) && (item.includes('.agent.') || item.includes('.workflow.'))) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    // Ignora erros de acesso
  }
  
  return files;
}

/**
 * Parse de argumentos simples
 */
function parseArgs(args) {
  const options = {
    input: null,
    output: null,
    watch: false,
    verbose: false
  };
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '--input' || arg === '-i') {
      options.input = args[++i];
    } else if (arg === '--output' || arg === '-o') {
      options.output = args[++i];
    } else if (arg === '--watch' || arg === '-w') {
      options.watch = true;
    } else if (arg === '--verbose' || arg === '-v') {
      options.verbose = true;
    } else if (!arg.startsWith('-') && !options.input) {
      options.input = arg;
    }
  }
  
  return options;
}

/**
 * Compila todos os arquivos
 */
function compileAll(inputDir, outputDir, verbose = false) {
  console.log('');
  console.log(chalk.cyan.bold('🔨 AD-KS Compiler'));
  console.log(chalk.gray('─'.repeat(50)));
  
  // Encontra arquivos
  const files = findYamlFiles(inputDir);
  
  if (files.length === 0) {
    console.log(chalk.yellow('Nenhum arquivo .agent.yaml ou .workflow.yaml encontrado.'));
    return;
  }
  
  const agents = files.filter(f => f.includes('.agent.'));
  const workflows = files.filter(f => f.includes('.workflow.'));
  
  console.log(chalk.gray(`Encontrados ${files.length} arquivos:`));
  console.log(chalk.gray(`  • ${agents.length} agentes`));
  console.log(chalk.gray(`  • ${workflows.length} workflows`));
  console.log('');
  
  // Compila
  let successCount = 0;
  let errorCount = 0;
  
  for (const file of files) {
    try {
      // Calcula output path mantendo estrutura de diretórios
      const relativePath = file.replace(inputDir, '');
      const outputFileName = basename(file)
        .replace('.agent.yaml', '.md')
        .replace('.workflow.yaml', '.md');
      
      let outputPath;
      if (outputDir) {
        const relativeDir = dirname(relativePath);
        outputPath = join(outputDir, relativeDir, outputFileName);
      }
      
      const result = compileFile(file, outputPath);
      successCount++;
      
      if (verbose) {
        console.log(chalk.green(`✓ ${basename(file)} → ${basename(result.output)}`));
      }
    } catch (error) {
      errorCount++;
      console.log(chalk.red(`✗ ${basename(file)}: ${error.message}`));
    }
  }
  
  // Resumo
  console.log('');
  console.log(chalk.gray('─'.repeat(50)));
  console.log(chalk.bold('Resumo:'));
  console.log(`  ${chalk.green(`✓ ${successCount} compilados`)}  ${chalk.red(`✗ ${errorCount} erros`)}`);
  console.log('');
  
  return { success: successCount, errors: errorCount };
}

/**
 * Main
 */
function main() {
  const args = process.argv.slice(2);
  const options = parseArgs(args);
  
  // Define diretório de entrada padrão
  const srcDir = join(__dirname, '..', '..', 'src');
  const inputDir = options.input || srcDir;
  
  if (!existsSync(inputDir)) {
    console.error(chalk.red(`Diretório não encontrado: ${inputDir}`));
    process.exit(1);
  }
  
  // Compila
  const result = compileAll(inputDir, options.output, options.verbose);
  
  // Watch mode
  if (options.watch) {
    console.log(chalk.cyan('👀 Modo watch ativado. Aguardando mudanças...'));
    console.log(chalk.gray('   Pressione Ctrl+C para sair.'));
    console.log('');
    
    // Watch para mudanças
    const watchDir = (dir) => {
      watch(dir, { recursive: true }, (eventType, filename) => {
        if (filename && (filename.includes('.agent.') || filename.includes('.workflow.')) && filename.endsWith('.yaml')) {
          console.log(chalk.yellow(`\n📝 Mudança detectada: ${filename}`));
          compileAll(inputDir, options.output, options.verbose);
          console.log(chalk.cyan('👀 Aguardando mais mudanças...'));
        }
      });
    };
    
    watchDir(inputDir);
  }
  
  // Exit code
  if (result && result.errors > 0) {
    process.exit(1);
  }
}

main();
