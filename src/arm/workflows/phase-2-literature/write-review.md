# 📋 Escrita da Revisão da Literatura

> Workflow para escrever a revisão da literatura do artigo/dissertação.
Transforma a análise das referências em uma narrativa coesa
e bem estruturada.


---
**ID:** `write-review`
**Versão:** 1.0.0
**Módulo:** arm
**Fase:** 2
**Agente Líder:** `synthesis-writer`
**Agentes de Suporte:** `literature-curator`, `theory-connector`, `academic-writer`
---

## Arquivos de Entrada

- `_adks/_memory/references-analysis.yaml` *(opcional)*
  - Análise de referências
- `_adks/_memory/theoretical-framework.yaml` *(opcional)*
  - Framework teórico
- `_adks/_memory/literature-gaps.yaml` *(opcional)*
  - Lacunas identificadas

## Passos do Workflow

### 1. Planejar Estrutura

Definir organização da revisão

**Agente:** `synthesis-writer`
**Ação:** `plan_structure`

**Prompt:**
```
Defina a estrutura da revisão:
1. Abordagem: temática, cronológica, metodológica?
2. Seções principais
3. Subseções dentro de cada seção
4. Fluxo narrativo geral

Crie um outline detalhado.
```
**Saída:** `review_outline`

### 2. Escrever Introdução da Revisão

Redigir abertura do capítulo

**Agente:** `synthesis-writer`
**Ação:** `write_intro`

**Prompt:**
```
Escreva a introdução da revisão:
1. Apresente o escopo da revisão
2. Explique a estrutura do capítulo
3. Indique os critérios de seleção da literatura
4. Conecte com a pergunta de pesquisa
```
**Entrada:** `review_outline`
**Saída:** `intro_draft`

### 3. Escrever Seções Temáticas

Redigir corpo da revisão

**Agente:** `synthesis-writer`
**Ação:** `write_sections`

**Prompt:**
```
Para cada seção do outline:
1. Escreva síntese integrativa (não resumos sequenciais)
2. Conecte autores que tratam do mesmo tema
3. Identifique convergências e divergências
4. Mantenha voz crítica/analítica
5. Use transições suaves entre parágrafos

Lembre: tema lidera, não autores.
```
**Entrada:** `review_outline`
**Saída:** `section_drafts`

### 4. Escrever Síntese Final

Consolidar achados da revisão

**Agente:** `synthesis-writer`
**Ação:** `write_synthesis`

**Prompt:**
```
Escreva a síntese final da revisão:
1. Principais achados consolidados
2. Estado atual do conhecimento
3. Lacunas identificadas
4. Como isso fundamenta sua pesquisa
```
**Entrada:** `section_drafts`
**Saída:** `synthesis_draft`

### 5. Revisar Coerência

Verificar fluxo e consistência

**Agente:** `academic-writer`
**Ação:** `review_coherence`

**Prompt:**
```
Revise o texto quanto a:
1. Coerência entre seções
2. Transições adequadas
3. Evitar repetições
4. Voz consistente
5. Citações bem integradas
```
**Entrada:** `intro_draft`, `section_drafts`, `synthesis_draft`
**Saída:** `coherence_review`

### 6. Compilar Revisão

Montar documento final

**Agente:** `synthesis-writer`
**Ação:** `compile_review`
**Entrada:** `intro_draft`, `section_drafts`, `synthesis_draft`, `coherence_review`
**Saída:** `review_document`

## Saídas do Workflow

- **review_document:** `_adks/_docs/02-literature/literature-review.md` (md)
- **review_data:** `_adks/_memory/literature-review.yaml` (yaml)

## Próximos Workflows

- `design-method`
- `write-section`

---
**Tags:** `phase-2` `literature` `writing` `synthesis` `review`

---
*Compilado pelo AD-KS Compiler v1.0*
*Fonte: write-review.workflow.yaml*