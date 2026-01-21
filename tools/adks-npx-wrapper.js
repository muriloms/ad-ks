#!/usr/bin/env node

/**
 * AD-KS NPX Wrapper
 * 
 * Entry point para execução via npx ad-ks
 * Preserva o diretório de trabalho original do usuário
 * quando executado via npx (que roda em diretório temporário)
 * 
 * Baseado na arquitetura BMAD Method v6
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { spawn } from 'child_process';

// Obtém o diretório deste arquivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Detecta se está sendo executado via npx (em cache temporário)
 * NPX executa pacotes em diretórios como:
 * - ~/.npm/_npx/
 * - /tmp/
 * - AppData/Local/npm-cache/_npx/ (Windows)
 */
function isRunningFromNpxCache() {
  const currentPath = __dirname.toLowerCase();
  const npxIndicators = [
    '_npx',
    'npm-cache',
    '/tmp/',
    '\\temp\\',
    'appdata'
  ];
  
  return npxIndicators.some(indicator => 
    currentPath.includes(indicator.toLowerCase())
  );
}

/**
 * Obtém o diretório de trabalho correto
 * Se via npx, usa o diretório onde o usuário executou o comando
 */
function getWorkingDirectory() {
  // process.cwd() retorna o diretório onde o comando foi executado
  // mesmo quando o script está em outro lugar (cache npx)
  return process.cwd();
}

/**
 * Executa o CLI principal
 */
function runCLI() {
  const cliPath = join(__dirname, 'cli', 'adks-cli.js');
  const workingDir = getWorkingDirectory();
  
  // Debug info (apenas se AD_KS_DEBUG estiver definido)
  if (process.env.AD_KS_DEBUG) {
    console.log('[AD-KS Debug]');
    console.log(`  Wrapper location: ${__dirname}`);
    console.log(`  CLI path: ${cliPath}`);
    console.log(`  Working directory: ${workingDir}`);
    console.log(`  Running from npx cache: ${isRunningFromNpxCache()}`);
    console.log(`  Arguments: ${process.argv.slice(2).join(' ')}`);
    console.log('');
  }

  // Passa os argumentos para o CLI principal
  const args = process.argv.slice(2);
  
  // Spawn o processo do CLI no diretório correto
  const child = spawn(
    process.execPath, // node
    [cliPath, ...args],
    {
      cwd: workingDir,
      stdio: 'inherit',
      env: {
        ...process.env,
        AD_KS_PACKAGE_DIR: __dirname,
        AD_KS_WORKING_DIR: workingDir
      }
    }
  );

  // Propaga o código de saída
  child.on('close', (code) => {
    process.exit(code || 0);
  });

  // Trata erros de spawn
  child.on('error', (err) => {
    console.error(`Erro ao executar AD-KS CLI: ${err.message}`);
    process.exit(1);
  });
}

// Executa
runCLI();
