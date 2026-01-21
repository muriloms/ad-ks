#!/usr/bin/env node

/**
 * AD-KS YAML Validator
 * 
 * Valida arquivos .agent.yaml, .workflow.yaml e module.yaml
 * usando os schemas Zod definidos
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import yaml from 'yaml';
import chalk from 'chalk';

import { validateAgent } from '../schema/agent.schema.js';
import { validateWorkflow } from '../schema/workflow.schema.js';
import { validateModule } from '../schema/module.schema.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Encontra arquivos recursivamente
 */
function findFiles(dir, pattern) {
  const files = [];
  
  try {
    const items = readdirSync(dir);
    
    for (const item of items) {
      const fullPath = join(dir, item);
      const stat = statSync(fullPath);
      
      if (stat.isDirectory()) {
        files.push(...findFiles(fullPath, pattern));
      } else if (item.includes(pattern)) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    // Ignora erros de diretórios inacessíveis
  }
  
  return files;
}

/**
 * Valida um arquivo YAML
 */
function validateFile(filePath) {
  const fileName = basename(filePath);
  
  try {
    const content = readFileSync(filePath, 'utf8');
    const data = yaml.parse(content);
    
    let result;
    let type;
    
    if (fileName.includes('.agent.')) {
      type = 'Agent';
      result = validateAgent(data);
    } else if (fileName.includes('.workflow.')) {
      type = 'Workflow';
      result = validateWorkflow(data);
    } else if (fileName === 'module.yaml') {
      type = 'Module';
      result = validateModule(data);
    } else {
      return { 
        file: filePath, 
        type: 'Unknown', 
        valid: false, 
        error: 'Tipo de arquivo não reconhecido' 
      };
    }
    
    if (result.success) {
      return { file: filePath, type, valid: true };
    } else {
      return { file: filePath, type, valid: false, error: result.error };
    }
    
  } catch (error) {
    return { 
      file: filePath, 
      type: 'Unknown', 
      valid: false, 
      error: error.message 
    };
  }
}

/**
 * Executa validação
 */
function main() {
  const srcDir = join(__dirname, '..', '..', 'src');
  
  console.log('');
  console.log(chalk.cyan.bold('🔍 AD-KS YAML Validator'));
  console.log(chalk.gray('─'.repeat(50)));
  console.log('');
  
  // Encontra todos os arquivos
  const agentFiles = findFiles(srcDir, '.agent.yaml');
  const workflowFiles = findFiles(srcDir, '.workflow.yaml');
  const moduleFiles = findFiles(srcDir, 'module.yaml');
  
  const allFiles = [...agentFiles, ...workflowFiles, ...moduleFiles];
  
  if (allFiles.length === 0) {
    console.log(chalk.yellow('Nenhum arquivo YAML encontrado para validar.'));
    return;
  }
  
  console.log(chalk.gray(`Encontrados ${allFiles.length} arquivos para validar:`));
  console.log(chalk.gray(`  • ${agentFiles.length} agentes`));
  console.log(chalk.gray(`  • ${workflowFiles.length} workflows`));
  console.log(chalk.gray(`  • ${moduleFiles.length} módulos`));
  console.log('');
  
  // Valida todos os arquivos
  const results = allFiles.map(validateFile);
  
  // Separa resultados
  const valid = results.filter(r => r.valid);
  const invalid = results.filter(r => !r.valid);
  
  // Mostra resultados válidos
  if (valid.length > 0) {
    console.log(chalk.green.bold('✅ Arquivos válidos:'));
    for (const r of valid) {
      const relativePath = r.file.replace(srcDir, 'src');
      console.log(chalk.green(`   ✓ [${r.type}] ${relativePath}`));
    }
    console.log('');
  }
  
  // Mostra resultados inválidos
  if (invalid.length > 0) {
    console.log(chalk.red.bold('❌ Arquivos com erros:'));
    for (const r of invalid) {
      const relativePath = r.file.replace(srcDir, 'src');
      console.log(chalk.red(`   ✗ [${r.type}] ${relativePath}`));
      
      if (typeof r.error === 'string') {
        console.log(chalk.gray(`     Erro: ${r.error}`));
      } else {
        console.log(chalk.gray(`     Erro: ${JSON.stringify(r.error, null, 2).substring(0, 200)}...`));
      }
    }
    console.log('');
  }
  
  // Resumo final
  console.log(chalk.gray('─'.repeat(50)));
  console.log(chalk.bold('Resumo:'));
  console.log(`  ${chalk.green(`✓ ${valid.length} válidos`)}  ${chalk.red(`✗ ${invalid.length} inválidos`)}`);
  console.log('');
  
  // Exit code baseado no resultado
  if (invalid.length > 0) {
    process.exit(1);
  }
}

// Executa
main();
