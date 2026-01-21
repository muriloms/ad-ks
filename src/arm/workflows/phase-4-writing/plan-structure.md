# 📋 Planejamento da Estrutura do Artigo

> Workflow para planejar a estrutura completa do artigo/dissertação.
Define seções, subseções e o fluxo narrativo do documento.


---
**ID:** `plan-structure`
**Versão:** 1.0.0
**Módulo:** arm
**Fase:** 4
**Agente Líder:** `structure-designer`
**Agentes de Suporte:** `academic-writer`, `vision-synthesizer`
---

## Arquivos de Entrada

- `_adks/_memory/research-question.yaml` *(opcional)*
  - Pergunta de pesquisa
- `_adks/_memory/objectives.yaml` *(opcional)*
  - Objetivos
- `_adks/_memory/method-design.yaml` *(opcional)*
  - Design metodológico

## Passos do Workflow

### 1. Identificar Tipo de Documento

Determinar formato do documento

**Agente:** `structure-designer`
**Ação:** `identify_type`

**Prompt:**
```
Identifique o tipo de documento:
1. Artigo científico (qual periódico/conferência?)
2. Dissertação de mestrado
3. Tese de doutorado
4. TCC/Monografia
5. Relatório técnico

Cada tipo tem estrutura específica.
```
**Saída:** `document_type`, `target_venue`

### 2. Selecionar Template

Escolher estrutura base

**Agente:** `structure-designer`
**Ação:** `select_template`

**Prompt:**
```
Com base no tipo de documento:
1. Apresente estruturas típicas
2. Considere requisitos do periódico/programa
3. Sugira template adequado
4. Permita customização
```
**Entrada:** `document_type`
**Saída:** `base_template`

### 3. Definir Seções

Especificar seções do documento

**Agente:** `structure-designer`
**Ação:** `define_sections`

**Prompt:**
```
Defina as seções principais:
1. Lista de seções na ordem
2. Objetivo de cada seção
3. Conteúdo esperado
4. Tamanho estimado (páginas/palavras)
```
**Entrada:** `base_template`
**Saída:** `sections_list`

### 4. Detalhar Subseções

Criar outline detalhado

**Agente:** `structure-designer`
**Ação:** `detail_subsections`

**Prompt:**
```
Para cada seção principal:
1. Defina subseções
2. Indique pontos-chave de cada uma
3. Sugira ordem lógica
4. Identifique conexões entre seções
```
**Entrada:** `sections_list`
**Saída:** `detailed_outline`

### 5. Planejar Fluxo Narrativo *(opcional)*

Definir a história do documento

**Agente:** `academic-writer`
**Ação:** `plan_narrative`

**Prompt:**
```
Planeje o fluxo narrativo:
1. Qual é a "história" que o documento conta?
2. Como cada seção contribui para essa história?
3. Onde estão os pontos de virada/insights principais?
4. Como garantir que o leitor siga a lógica?
```
**Entrada:** `detailed_outline`
**Saída:** `narrative_plan`

### 6. Estimar Esforço

Calcular tempo necessário

**Agente:** `structure-designer`
**Ação:** `estimate_effort`

**Prompt:**
```
Estime o esforço para cada seção:
1. Tempo estimado de escrita
2. Dependências (o que precisa estar pronto antes)
3. Ordem sugerida de escrita
4. Total estimado
```
**Entrada:** `detailed_outline`
**Saída:** `effort_estimate`

### 7. Documentar Estrutura

Criar documento de estrutura

**Agente:** `structure-designer`
**Ação:** `document_structure`
**Entrada:** `detailed_outline`, `narrative_plan`, `effort_estimate`
**Saída:** `structure_document`

## Saídas do Workflow

- **structure_document:** `_adks/_docs/04-writing/document-structure.md` (md)
- **structure_data:** `_adks/_memory/document-structure.yaml` (yaml)

## Próximos Workflows

- `write-section`

---
**Tags:** `phase-4` `writing` `structure` `outline` `planning`

---
*Compilado pelo AD-KS Compiler v1.0*
*Fonte: plan-structure.workflow.yaml*