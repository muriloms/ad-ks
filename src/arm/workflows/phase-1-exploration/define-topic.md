# 📋 Definição do Tópico de Pesquisa

> Workflow para definir e delimitar o tópico de pesquisa.
Transforma uma ideia explorada em um tópico específico,
delimitado e viável para investigação.


---
**ID:** `define-topic`
**Versão:** 1.0.0
**Módulo:** arm
**Fase:** 1
**Agente Líder:** `idea-facilitator`
**Agentes de Suporte:** `question-architect`, `gap-identifier`, `feasibility-expert`
---

## Arquivos de Entrada

- `_adks/_memory/idea-exploration.yaml` *(opcional)*
  - Resultados da exploração de ideia

## Passos do Workflow

### 1. Revisar Exploração

Retomar o que foi explorado anteriormente

**Agente:** `idea-facilitator`
**Ação:** `review_previous`

**Prompt:**
```
Se há exploração prévia, resuma os principais pontos.
Caso contrário, pergunte sobre o tema de interesse.
```
**Saída:** `current_state`

### 2. Definir Escopo

Delimitar o escopo do tópico

**Agente:** `idea-facilitator`
**Ação:** `define_scope`

**Prompt:**
```
Ajude a delimitar o tópico:
1. Qual é o tema geral?
2. Qual aspecto específico será focado?
3. Quais são os limites (temporal, geográfico, populacional)?
4. O que está FORA do escopo?
```
**Entrada:** `current_state`
**Saída:** `topic_scope`, `boundaries`

### 3. Verificar Especificidade

Garantir que tópico é específico o suficiente

**Agente:** `question-architect`
**Ação:** `check_specificity`

**Prompt:**
```
Avalie se o tópico está:
- Específico o suficiente para ser pesquisável
- Não tão estreito que seja trivial
- Claro e sem ambiguidades
```
**Entrada:** `topic_scope`
**Saída:** `specificity_assessment`

### 4. Viabilidade Preliminar *(opcional)*

Verificar viabilidade inicial

**Agente:** `feasibility-expert`
**Ação:** `quick_feasibility`

**Prompt:**
```
Faça uma avaliação rápida:
- É possível pesquisar este tópico?
- Há acesso a dados/participantes?
- O prazo é compatível?
```
**Entrada:** `topic_scope`
**Saída:** `feasibility_notes`

### 5. Formalizar Tópico

Redigir definição formal do tópico

**Agente:** `idea-facilitator`
**Ação:** `formalize_topic`

**Prompt:**
```
Crie uma definição formal do tópico contendo:
1. Título provisório
2. Descrição em 2-3 sentenças
3. Palavras-chave
4. Delimitações
```
**Entrada:** `topic_scope`, `boundaries`, `specificity_assessment`
**Saída:** `formal_topic_definition`

### 6. Salvar e Próximos Passos

Documentar e orientar continuidade

**Agente:** `idea-facilitator`
**Ação:** `save_and_suggest`
**Entrada:** `formal_topic_definition`
**Saída:** `topic_document`

## Saídas do Workflow

- **topic_document:** `_adks/_docs/01-exploration/topic-definition.md` (md)
- **topic_data:** `_adks/_memory/topic-definition.yaml` (yaml)

## Próximos Workflows

- `research-question`
- `analyze-references`

---
**Tags:** `phase-1` `exploration` `topic` `scope`

---
*Compilado pelo AD-KS Compiler v1.0*
*Fonte: define-topic.workflow.yaml*