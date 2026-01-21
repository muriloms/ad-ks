# 📋 Escrita de Seção do Artigo

> Workflow para escrever uma seção específica do artigo.
Guia o processo de rascunho, revisão e refinamento
de cada parte do documento.


---
**ID:** `write-section`
**Versão:** 1.0.0
**Módulo:** arm
**Fase:** 4
**Agente Líder:** `academic-writer`
**Agentes de Suporte:** `structure-designer`, `style-guardian`
---

## Arquivos de Entrada

- `_adks/_memory/document-structure.yaml` *(opcional)*
  - Estrutura do documento
- `_adks/_docs/**/*.md` *(opcional)*
  - Documentos de apoio

## Passos do Workflow

### 1. Identificar Seção

Determinar qual seção será escrita

**Agente:** `academic-writer`
**Ação:** `identify_section`

**Prompt:**
```
Identifique a seção a ser escrita:
1. Qual seção? (Introdução, Metodologia, Resultados, etc.)
2. O que já existe dessa seção?
3. Quais são os requisitos específicos?
4. Que materiais de apoio estão disponíveis?
```
**Saída:** `section_name`, `section_requirements`, `available_materials`

### 2. Revisar Outline da Seção

Confirmar estrutura da seção

**Agente:** `academic-writer`
**Ação:** `review_outline`

**Prompt:**
```
Revise o outline da seção:
1. Quais subseções/tópicos incluir?
2. Em que ordem?
3. Qual o tamanho esperado de cada parte?
4. Há requisitos específicos do periódico?
```
**Entrada:** `section_name`
**Saída:** `section_outline`

### 3. Reunir Conteúdo

Coletar informações para a seção

**Agente:** `academic-writer`
**Ação:** `gather_content`

**Prompt:**
```
Reúna o conteúdo necessário:
1. Dados/informações da memória do projeto
2. Referências relevantes
3. Notas e rascunhos existentes
4. Figuras/tabelas a incluir
```
**Entrada:** `section_outline`, `available_materials`
**Saída:** `content_gathered`

### 4. Escrever Rascunho

Redigir primeira versão

**Agente:** `academic-writer`
**Ação:** `write_draft`

**Prompt:**
```
Escreva o rascunho da seção:
1. Siga o outline definido
2. Foque em completar o conteúdo
3. Não se preocupe com perfeição ainda
4. Marque pontos que precisam de mais trabalho

Princípios:
- Uma ideia por parágrafo
- Tópico frasal no início
- Transições entre parágrafos
```
**Entrada:** `section_outline`, `content_gathered`
**Saída:** `draft_text`

### 5. Auto-Revisão

Revisar o próprio rascunho

**Agente:** `academic-writer`
**Ação:** `self_review`

**Prompt:**
```
Revise o rascunho quanto a:
1. Clareza das ideias
2. Completude do conteúdo
3. Fluxo lógico
4. Coerência com o resto do documento

Identifique pontos a melhorar.
```
**Entrada:** `draft_text`
**Saída:** `review_notes`, `improved_draft`

### 6. Verificar Estilo *(opcional)*

Revisar estilo e tom

**Agente:** `style-guardian`
**Ação:** `check_style`

**Prompt:**
```
Verifique o estilo do texto:
1. Tom acadêmico adequado?
2. Terminologia consistente?
3. Concisão (sem verbosidade)?
4. Voz apropriada (ativa/passiva)?
```
**Entrada:** `improved_draft`
**Saída:** `style_suggestions`

### 7. Finalizar Seção

Incorporar revisões e finalizar

**Agente:** `academic-writer`
**Ação:** `finalize_section`
**Entrada:** `improved_draft`, `style_suggestions`
**Saída:** `final_section`

## Saídas do Workflow

- **final_section:** `_adks/_docs/04-writing/sections/{section_name}.md` (md)
- **section_metadata:** `_adks/_memory/sections/{section_name}.yaml` (yaml)

## Próximos Workflows

- `write-section`
- `improve-text`
- `review-logic`

---
**Tags:** `phase-4` `writing` `section` `drafting`

---
*Compilado pelo AD-KS Compiler v1.0*
*Fonte: write-section.workflow.yaml*