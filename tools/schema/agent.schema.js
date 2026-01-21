/**
 * AD-KS Schema - Agent
 * 
 * Schema Zod para validação de arquivos .agent.yaml
 * Define a estrutura obrigatória e opcional de agentes
 */

import { z } from 'zod';

/**
 * Schema para metadata do agente
 */
const AgentMetadataSchema = z.object({
  id: z.string().min(1, 'ID é obrigatório'),
  name: z.string().min(1, 'Nome é obrigatório'),
  title: z.string().min(1, 'Título é obrigatório'),
  icon: z.string().optional().default('🤖'),
  module: z.enum(['core', 'arm']).default('arm'),
  team: z.string().optional(),
  whenToUse: z.string().optional(),
  hasSidecar: z.boolean().optional().default(false),
  language: z.enum(['pt-br', 'en', 'es']).optional().default('pt-br')
});

/**
 * Schema para persona do agente
 */
const AgentPersonaSchema = z.object({
  role: z.string().min(1, 'Role é obrigatório'),
  identity: z.string().min(1, 'Identity é obrigatória'),
  communication_style: z.string().optional(),
  principles: z.array(z.string()).optional().default([])
});

/**
 * Schema para item de menu
 */
const MenuItemSchema = z.object({
  trigger: z.string().min(1, 'Trigger é obrigatório'),
  description: z.string().min(1, 'Description é obrigatória'),
  workflow: z.string().optional(),
  action: z.string().optional(),
  handoff_to: z.string().optional()
});

/**
 * Schema para ação crítica
 */
const CriticalActionSchema = z.object({
  action: z.string().min(1, 'Action é obrigatória'),
  description: z.string().optional(),
  priority: z.enum(['high', 'medium', 'low']).optional().default('medium')
});

/**
 * Schema para custom prompt
 */
const CustomPromptSchema = z.object({
  name: z.string().min(1, 'Nome do prompt é obrigatório'),
  content: z.string().min(1, 'Conteúdo do prompt é obrigatório'),
  when: z.string().optional()
});

/**
 * Schema principal do agente
 */
const AgentDefinitionSchema = z.object({
  metadata: AgentMetadataSchema,
  persona: AgentPersonaSchema,
  critical_actions: z.array(
    z.union([z.string(), CriticalActionSchema])
  ).optional().default([]),
  menu: z.array(MenuItemSchema).optional().default([]),
  custom_prompts: z.record(z.string(), z.string()).optional().default({})
});

/**
 * Schema raiz do arquivo .agent.yaml
 */
export const AgentSchema = z.object({
  agent: AgentDefinitionSchema
});

/**
 * Tipo TypeScript inferido do schema
 */
export const AgentType = AgentSchema;

/**
 * Valida um objeto de agente
 * @param {object} data - Dados do agente para validar
 * @returns {{ success: boolean, data?: object, error?: object }}
 */
export function validateAgent(data) {
  const result = AgentSchema.safeParse(data);
  
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
 * @param {object} data - Dados do agente para validar
 * @returns {object} Dados validados
 * @throws {Error} Se validação falhar
 */
export function parseAgent(data) {
  return AgentSchema.parse(data);
}

/**
 * Schema exportado para uso externo
 */
export default AgentSchema;
