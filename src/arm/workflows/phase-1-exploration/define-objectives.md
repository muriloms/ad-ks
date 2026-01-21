# 📋 Definição de Objetivos de Pesquisa

> Workflow para definir objetivos geral e específicos da pesquisa.
Os objetivos traduzem a pergunta de pesquisa em metas concretas
que guiam a execução do estudo.


---
**ID:** `define-objectives`
**Versão:** 1.0.0
**Módulo:** arm
**Fase:** 1
**Agente Líder:** `question-architect`
**Agentes de Suporte:** `vision-synthesizer`, `feasibility-expert`
---

## Arquivos de Entrada

- `_adks/_memory/research-question.yaml` *(obrigatório)*
  - Pergunta de pesquisa definida

## Passos do Workflow

### 1. Revisar Pergunta de Pesquisa

Retomar a pergunta para derivar objetivos

**Agente:** `question-architect`
**Ação:** `review_question`

**Prompt:**
```
Revise a pergunta de pesquisa e identifique:
1. O que precisa ser feito para respondê-la
2. Quais são os componentes da pergunta
3. Que tipo de resultado é esperado
```
**Saída:** `question_analysis`

### 2. Definir Objetivo Geral

Formular o objetivo geral da pesquisa

**Agente:** `question-architect`
**Ação:** `define_general`

**Prompt:**
```
Formule o objetivo geral:
1. Deve começar com verbo no infinitivo
2. Deve estar alinhado com a pergunta
3. Deve indicar o resultado esperado

Verbos comuns: analisar, investigar, compreender, avaliar,
propor, desenvolver, identificar, comparar...
```
**Entrada:** `question_analysis`
**Saída:** `general_objective`

### 3. Derivar Objetivos Específicos

Criar objetivos específicos

**Agente:** `question-architect`
**Ação:** `derive_specifics`

**Prompt:**
```
Derive 3-5 objetivos específicos que:
1. Sejam etapas para atingir o objetivo geral
2. Sejam mensuráveis e concretos
3. Cubram todos os aspectos da pesquisa
4. Sigam uma sequência lógica

Cada objetivo específico deve usar verbo diferente.
```
**Entrada:** `general_objective`
**Saída:** `specific_objectives`

### 4. Verificar Alinhamento

Confirmar coerência entre elementos

**Agente:** `vision-synthesizer`
**Ação:** `verify_alignment`

**Prompt:**
```
Verifique se há alinhamento entre:
1. Pergunta → Objetivo Geral
2. Objetivo Geral → Objetivos Específicos
3. Objetivos Específicos → Perguntas Secundárias (se houver)

Identifique inconsistências.
```
**Entrada:** `general_objective`, `specific_objectives`
**Saída:** `alignment_check`

### 5. Verificar Viabilidade *(opcional)*

Avaliar se objetivos são atingíveis

**Agente:** `feasibility-expert`
**Ação:** `check_objectives_feasibility`

**Prompt:**
```
Para cada objetivo específico, avalie:
1. É possível atingir com os recursos disponíveis?
2. O prazo é compatível?
3. Há dependências externas?
```
**Entrada:** `specific_objectives`
**Saída:** `feasibility_assessment`

### 6. Finalizar Objetivos

Documentar objetivos finais

**Agente:** `question-architect`
**Ação:** `finalize_objectives`
**Entrada:** `general_objective`, `specific_objectives`, `alignment_check`
**Saída:** `objectives_document`

## Saídas do Workflow

- **objectives_document:** `_adks/_docs/01-exploration/objectives.md` (md)
- **objectives_data:** `_adks/_memory/objectives.yaml` (yaml)

## Próximos Workflows

- `build-hypothesis`
- `analyze-references`
- `design-method`

---
**Tags:** `phase-1` `exploration` `objectives` `goals`

---
*Compilado pelo AD-KS Compiler v1.0*
*Fonte: define-objectives.workflow.yaml*