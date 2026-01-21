# 📋 Formulação da Pergunta de Pesquisa

> Workflow para formular uma pergunta de pesquisa clara, 
específica e pesquisável. A pergunta de pesquisa é o 
elemento central que guia toda a investigação.


---
**ID:** `research-question`
**Versão:** 1.0.0
**Módulo:** arm
**Fase:** 1
**Agente Líder:** `question-architect`
**Agentes de Suporte:** `idea-facilitator`, `gap-identifier`
---

## Arquivos de Entrada

- `_adks/_memory/topic-definition.yaml` *(opcional)*
  - Definição do tópico
- `_adks/_memory/idea-exploration.yaml` *(opcional)*
  - Exploração de ideias

## Passos do Workflow

### 1. Reunir Contexto

Coletar informações sobre o tema

**Agente:** `question-architect`
**Ação:** `gather_context`

**Prompt:**
```
Reúna informações sobre:
1. Tópico definido (se disponível)
2. O que o pesquisador quer descobrir/entender
3. Por que isso é importante
4. O que já se sabe sobre o assunto
```
**Saída:** `research_context`

### 2. Identificar Tipo de Pergunta

Determinar o tipo de pergunta adequado

**Agente:** `question-architect`
**Ação:** `identify_question_type`

**Prompt:**
```
Identifique o tipo de pergunta mais adequado:
- Descritiva: "Como é X?" / "Quais são as características de X?"
- Explicativa: "Por que X?" / "Qual a relação entre X e Y?"
- Exploratória: "O que é X?" / "Como funciona X?"
- Avaliativa: "Qual é melhor, X ou Y?"
- Prescritiva: "Como melhorar X?"
```
**Entrada:** `research_context`
**Saída:** `question_type`, `type_rationale`

### 3. Rascunhar Perguntas

Criar múltiplas versões da pergunta

**Agente:** `question-architect`
**Ação:** `draft_questions`

**Prompt:**
```
Crie 3-5 versões da pergunta de pesquisa:
1. Variando a especificidade
2. Variando o foco
3. Variando a abordagem

Para cada versão, indique pontos fortes e fracos.
```
**Entrada:** `research_context`, `question_type`
**Saída:** `draft_questions`

### 4. Avaliar Perguntas

Avaliar qualidade de cada versão

**Agente:** `question-architect`
**Ação:** `evaluate_questions`

**Prompt:**
```
Avalie cada pergunta usando os critérios:
1. Clareza (0-5)
2. Especificidade (0-5)
3. Relevância (0-5)
4. Viabilidade (0-5)
5. Originalidade (0-5)

Apresente tabela comparativa.
```
**Entrada:** `draft_questions`
**Saída:** `evaluation_results`

### 5. Selecionar Pergunta

Escolher a pergunta principal

**Agente:** `question-architect`
**Ação:** `select_question`

**Prompt:**
```
Com base na avaliação, ajude o pesquisador a:
1. Escolher a melhor versão
2. Fazer ajustes finais se necessário
3. Confirmar a pergunta principal
```
**Entrada:** `evaluation_results`
**Saída:** `main_question`

### 6. Definir Perguntas Secundárias *(opcional)*

Criar perguntas específicas derivadas

**Agente:** `question-architect`
**Ação:** `define_sub_questions`

**Prompt:**
```
Derive 2-4 perguntas secundárias que:
1. Sejam mais específicas que a principal
2. Ajudem a responder a pergunta principal
3. Possam guiar etapas da pesquisa
```
**Entrada:** `main_question`
**Saída:** `sub_questions`

### 7. Documentar Pergunta

Formalizar a pergunta de pesquisa

**Agente:** `question-architect`
**Ação:** `document_question`
**Entrada:** `main_question`, `sub_questions`, `question_type`
**Saída:** `question_document`

## Saídas do Workflow

- **question_document:** `_adks/_docs/01-exploration/research-question.md` (md)
- **question_data:** `_adks/_memory/research-question.yaml` (yaml)

## Próximos Workflows

- `define-objectives`
- `build-hypothesis`
- `analyze-references`

---
**Tags:** `phase-1` `exploration` `research-question` `problematization`

---
*Compilado pelo AD-KS Compiler v1.0*
*Fonte: research-question.workflow.yaml*