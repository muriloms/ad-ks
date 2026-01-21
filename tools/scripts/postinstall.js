#!/usr/bin/env node

/**
 * AD-KS Postinstall Script
 * 
 * Corrige permissões dos arquivos executáveis após instalação
 * Isso é necessário para que npm link e npx funcionem corretamente
 */

import { chmod } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Arquivos que precisam ser executáveis
const executableFiles = [
  join(__dirname, '..', 'adks-npx-wrapper.js'),
  join(__dirname, '..', 'cli', 'adks-cli.js')
];

async function fixPermissions() {
  // Só executa em sistemas Unix-like
  if (process.platform === 'win32') {
    return;
  }

  for (const file of executableFiles) {
    if (existsSync(file)) {
      try {
        await chmod(file, 0o755);
        console.log(`✓ Permissão corrigida: ${file}`);
      } catch (error) {
        // Ignora erros silenciosamente
        // (pode falhar se não tiver permissão, mas não é crítico)
      }
    }
  }
}

// Executa
fixPermissions().catch(() => {
  // Ignora erros - não é crítico
});
