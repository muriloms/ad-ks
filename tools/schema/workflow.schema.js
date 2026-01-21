/**
 * AD-KS Schema - Workflow
 * 
 * Schema Zod para validação de arquivos .workflow.yaml
 * Define a estrutura de workflows e seus passos
 */

import { z } from 'zod';

/**
 * Schema para step de workflow
 */
const WorkflowStepSchema = z.object({
  id: z.string().min(1, 'ID do step é obrigatório'),
  name: z.string().min(1, 'Nome do step é obrigatório'),
  description: z.string().optional(),
  agent: z.string().optional(),
  action: z.string().optional(),
  prompt: z.string().optional(),
  input: z.array(z.string()).optional().default([]),
  output: z.array(z.string()).optional().default([]),
  condition: z.string().optional(),
  optional: z.boolean().optional().default(false),
  repeat: z.boolean().optional().default(false),
  max_iterations: z.number().optional()
});

/**
 * Schema para output de workflow
 */
const WorkflowOutputSchema = z.object({
  name: z.string().min(1, 'Nome do output é obrigatório'),
  path: z.string().min(1, 'Path do output é obrigatório'),
  template: z.string().optional(),
  format: z.enum(['md', 'yaml', 'json', 'txt', 'tex']).optional().default('md')
});

/**
 * Schema para input pattern
 */
const InputPatternSchema = z.object({
  pattern: z.string().min(1, 'Pattern é obrigatório'),
  description: z.string().optional(),
  required: z.boolean().optional().default(false)
});

/**
 * Schema principal do workflow
 */
const WorkflowDefinitionSchema = z.object({
  id: z.string().min(1, 'ID é obrigatório'),
  name: z.string().min(1, 'Nome é obrigatório'),
  version: z.string().optional().default('1.0.0'),
  module: z.enum(['core', 'arm']).default('arm'),
  phase: z.number().min(1).max(6).optional(),
  description: z.string().optional(),
  lead_agent: z.string().min(1, 'Lead agent é obrigatório'),
  supporting_agents: z.array(z.string()).optional().default([]),
  input_file_patterns: z.array(
    z.union([z.string(), InputPatternSchema])
  ).optional().default([]),
  sharded: z.boolean().optional().default(false),
  steps: z.array(WorkflowStepSchema).min(1, 'Ao menos um step é obrigatório'),
  outputs: z.array(
    z.union([z.string(), WorkflowOutputSchema])
  ).optional().default([]),
  next_workflows: z.array(z.string()).optional().default([]),
  tags: z.array(z.string()).optional().default([])
});

/**
 * Schema raiz do arquivo .workflow.yaml
 */
export const WorkflowSchema = z.object({
  workflow: WorkflowDefinitionSchema
});

/**
 * Tipo TypeScript inferido do schema
 */
export const WorkflowType = WorkflowSchema;

/**
 * Valida um objeto de workflow
 * @param {object} data - Dados do workflow para validar
 * @returns {{ success: boolean, data?: object, error?: object }}
 */
export function validateWorkflow(data) {
  const result = WorkflowSchema.safeParse(data);
  
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
 * @param {object} data - Dados do workflow para validar
 * @returns {object} Dados validados
 * @throws {Error} Se validação falhar
 */
export function parseWorkflow(data) {
  return WorkflowSchema.parse(data);
}

/**
 * Schema exportado para uso externo
 */
export default WorkflowSchema;
