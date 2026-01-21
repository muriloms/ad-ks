# 📋 Construção de Hipóteses

> Workflow para formular hipóteses científicas testáveis.
Transforma intuições e teorias em previsões específicas
que podem ser confirmadas ou refutadas pela pesquisa.


---
**ID:** `build-hypothesis`
**Versão:** 1.0.0
**Módulo:** arm
**Fase:** 1
**Agente Líder:** `hypothesis-builder`
**Agentes de Suporte:** `question-architect`, `theory-connector`
---

## Arquivos de Entrada

- `_adks/_memory/research-question.yaml` *(obrigatório)*
  - Pergunta de pesquisa
- `_adks/_memory/objectives.yaml` *(opcional)*
  - Objetivos definidos

## Passos do Workflow

### 1. Avaliar Necessidade de Hipóteses

Verificar se pesquisa requer hipóteses

**Agente:** `hypothesis-builder`
**Ação:** `assess_hypothesis_need`

**Prompt:**
```
Avalie se a pesquisa requer hipóteses formais:
- Pesquisa quantitativa/explicativa: geralmente sim
- Pesquisa qualitativa/exploratória: geralmente não
- Pesquisa mista: depende do componente

Explique a decisão ao pesquisador.
```
**Saída:** `needs_hypothesis`, `rationale`

### 2. Identificar Variáveis

Mapear variáveis da pesquisa

**Agente:** `hypothesis-builder`
**Ação:** `identify_variables`

**Prompt:**
```
Identifique as variáveis:
1. Variável independente (causa/preditor)
2. Variável dependente (efeito/resultado)
3. Variáveis de controle (a serem controladas)
4. Variáveis intervenientes (possíveis mediadoras)

Para cada uma, defina como será medida.
```
**Saída:** `variables_map`

### 3. Revisar Base Teórica *(opcional)*

Conectar hipóteses com teoria

**Agente:** `theory-connector`
**Ação:** `connect_theory`

**Prompt:**
```
Identifique a base teórica para as hipóteses:
1. Que teorias sustentam a relação esperada?
2. Que estudos empíricos anteriores sugerem?
3. Qual a lógica/mecanismo da relação?
```
**Entrada:** `variables_map`
**Saída:** `theoretical_basis`

### 4. Formular Hipóteses

Criar hipóteses alternativa e nula

**Agente:** `hypothesis-builder`
**Ação:** `formulate_hypotheses`

**Prompt:**
```
Para cada relação importante, formule:

**Hipótese Alternativa (H1):**
- Afirmação positiva da relação esperada
- Ex: "X está positivamente relacionado a Y"

**Hipótese Nula (H0):**
- Negação da relação
- Ex: "Não há relação entre X e Y"
```
**Entrada:** `variables_map`, `theoretical_basis`
**Saída:** `hypotheses_set`

### 5. Verificar Testabilidade

Confirmar que hipóteses são testáveis

**Agente:** `hypothesis-builder`
**Ação:** `verify_testability`

**Prompt:**
```
Para cada hipótese, verifique:
1. É específica o suficiente?
2. É falseável (pode ser refutada)?
3. É possível coletar dados para testá-la?
4. O método pretendido permite testá-la?
```
**Entrada:** `hypotheses_set`
**Saída:** `testability_assessment`

### 6. Documentar Hipóteses

Formalizar documentação

**Agente:** `hypothesis-builder`
**Ação:** `document_hypotheses`
**Entrada:** `hypotheses_set`, `variables_map`, `testability_assessment`
**Saída:** `hypotheses_document`

## Saídas do Workflow

- **hypotheses_document:** `_adks/_docs/01-exploration/hypotheses.md` (md)
- **hypotheses_data:** `_adks/_memory/hypotheses.yaml` (yaml)

## Próximos Workflows

- `analyze-references`
- `design-method`

---
**Tags:** `phase-1` `exploration` `hypothesis` `variables`

---
*Compilado pelo AD-KS Compiler v1.0*
*Fonte: build-hypothesis.workflow.yaml*