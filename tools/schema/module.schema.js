/**
 * AD-KS Schema - Module
 * 
 * Schema Zod para validação de arquivos module.yaml
 * Define a estrutura de módulos do AD-KS
 */

import { z } from 'zod';

/**
 * Schema para equipe de agentes
 */
const TeamSchema = z.object({
  id: z.string().min(1, 'ID da equipe é obrigatório'),
  name: z.string().min(1, 'Nome da equipe é obrigatório'),
  description: z.string().optional(),
  agents: z.array(z.string()).min(1, 'Ao menos um agente é obrigatório'),
  lead: z.string().optional()
});

/**
 * Schema para fase de workflow
 */
const PhaseSchema = z.object({
  id: z.number().min(1).max(10),
  name: z.string().min(1, 'Nome da fase é obrigatório'),
  description: z.string().optional(),
  workflows: z.array(z.string()).optional().default([])
});

/**
 * Schema principal do módulo
 */
const ModuleDefinitionSchema = z.object({
  id: z.string().min(1, 'ID é obrigatório'),
  name: z.string().min(1, 'Nome é obrigatório'),
  version: z.string().optional().default('1.0.0'),
  description: z.string().optional(),
  author: z.string().optional(),
  language: z.enum(['pt-br', 'en', 'es']).optional().default('pt-br'),
  teams: z.array(TeamSchema).optional().default([]),
  phases: z.array(PhaseSchema).optional().default([]),
  agents_dir: z.string().optional().default('./agents'),
  workflows_dir: z.string().optional().default('./workflows'),
  templates_dir: z.string().optional().default('./templates'),
  dependencies: z.array(z.string()).optional().default([]),
  config: z.record(z.string(), z.any()).optional().default({})
});

/**
 * Schema raiz do arquivo module.yaml
 */
export const ModuleSchema = z.object({
  module: ModuleDefinitionSchema
});

/**
 * Tipo TypeScript inferido do schema
 */
export const ModuleType = ModuleSchema;

/**
 * Valida um objeto de módulo
 * @param {object} data - Dados do módulo para validar
 * @returns {{ success: boolean, data?: object, error?: object }}
 */
export function validateModule(data) {
  const result = ModuleSchema.safeParse(data);
  
  if (result.success) {
    return {
      success: true,
      data: result.data
    };
  }
  
  return {
    success: false,
    error: result.error.format()
  };
}

/**
 * Valida e retorna dados ou lança erro
 * @param {object} data - Dados do módulo para validar
 * @returns {object} Dados validados
 * @throws {Error} Se validação falhar
 */
export function parseModule(data) {
  return ModuleSchema.parse(data);
}

/**
 * Schema exportado para uso externo
 */
export default ModuleSchema;
