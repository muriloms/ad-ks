# 📋 Exploração de Ideia de Pesquisa

> Workflow para explorar e desenvolver uma ideia inicial de pesquisa.
Usa técnicas de brainstorming e expansão criativa para transformar
intuições vagas em direções concretas de investigação.


---
**ID:** `explore-idea`
**Versão:** 1.0.0
**Módulo:** arm
**Fase:** 1
**Agente Líder:** `idea-facilitator`
**Agentes de Suporte:** `question-architect`, `gap-identifier`
---

## Arquivos de Entrada

- `_adks/_config/project-config.yaml` *(opcional)*
  - Configuração do projeto
- `_adks/_memory/context-analysis.yaml` *(opcional)*
  - Análise de contexto do Team Builder

## Passos do Workflow

### 1. Boas-vindas e Contextualização

Apresentar o processo e entender o ponto de partida

**Agente:** `idea-facilitator`
**Ação:** `welcome_and_context`

**Prompt:**
```
Apresente-se brevemente e pergunte ao pesquisador sobre sua ideia
ou área de interesse. Use o prompt de boas-vindas.
```
**Saída:** `initial_idea`, `researcher_context`

### 2. Exploração Divergente

Expandir a ideia em múltiplas direções

**Agente:** `idea-facilitator`
**Ação:** `divergent_brainstorm`

**Prompt:**
```
Conduza uma sessão de brainstorming divergente:
1. Peça ao pesquisador para listar tudo que vem à mente
2. Faça perguntas que expandam a ideia
3. Sugira conexões inesperadas
4. Documente todas as direções possíveis
```
**Entrada:** `initial_idea`
**Saída:** `expanded_ideas`, `potential_directions`

### 3. Seleção Convergente

Filtrar e priorizar as direções mais promissoras

**Agente:** `idea-facilitator`
**Ação:** `converge_ideas`

**Prompt:**
```
Ajude o pesquisador a filtrar as ideias:
1. Apresente critérios de seleção (interesse, viabilidade, relevância)
2. Avalie cada direção com o pesquisador
3. Identifique 2-3 direções mais promissoras
4. Peça ao pesquisador para escolher
```
**Entrada:** `expanded_ideas`
**Saída:** `selected_direction`, `selection_rationale`

### 4. Verificação Inicial de Lacuna *(opcional)*

Verificar se direção tem potencial de contribuição

**Agente:** `gap-identifier`
**Ação:** `preliminary_gap_check`

**Prompt:**
```
Faça uma verificação preliminar:
1. O que já se sabe sobre este tema?
2. Quais perguntas ainda não foram respondidas?
3. Há espaço para contribuição original?
```
**Entrada:** `selected_direction`
**Saída:** `preliminary_gap_assessment`

### 5. Documentar Exploração

Salvar resultados da exploração

**Agente:** `idea-facilitator`
**Ação:** `document_results`
**Entrada:** `selected_direction`, `selection_rationale`, `preliminary_gap_assessment`
**Saída:** `exploration_document`

### 6. Próximos Passos

Orientar sobre continuidade

**Agente:** `idea-facilitator`
**Ação:** `suggest_next_steps`

**Prompt:**
```
Apresente opções de próximos passos:
1. Definir o tópico mais especificamente (*define-topic)
2. Formular pergunta de pesquisa (*research-question)
3. Explorar mais a ideia (*brainstorm)
4. Verificar literatura existente (*team-literature)
```

## Saídas do Workflow

- **exploration_document:** `_adks/_docs/01-exploration/idea-exploration.md` (md)
- **exploration_data:** `_adks/_memory/idea-exploration.yaml` (yaml)

## Próximos Workflows

- `define-topic`
- `research-question`
- `analyze-references`

---
**Tags:** `phase-1` `exploration` `ideation` `brainstorming`

---
*Compilado pelo AD-KS Compiler v1.0*
*Fonte: explore-idea.workflow.yaml*