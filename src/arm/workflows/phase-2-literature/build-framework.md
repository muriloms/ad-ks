# 📋 Construção do Framework Teórico

> Workflow para construir o framework teórico-conceitual da pesquisa.
Integra teorias e conceitos em um modelo coerente que fundamenta
o estudo.


---
**ID:** `build-framework`
**Versão:** 1.0.0
**Módulo:** arm
**Fase:** 2
**Agente Líder:** `theory-connector`
**Agentes de Suporte:** `literature-curator`, `synthesis-writer`
---

## Arquivos de Entrada

- `_adks/_memory/references-analysis.yaml` *(opcional)*
  - Análise de referências
- `_adks/_memory/research-question.yaml` *(opcional)*
  - Pergunta de pesquisa

## Passos do Workflow

### 1. Mapear Teorias Relevantes

Identificar teorias aplicáveis

**Agente:** `theory-connector`
**Ação:** `map_theories`

**Prompt:**
```
Identifique teorias relevantes para a pesquisa:
1. Quais teorias são usadas na área?
2. Quais se aplicam ao seu problema?
3. Quais são os autores principais de cada teoria?
4. Como cada teoria explica o fenômeno?
```
**Saída:** `theories_map`

### 2. Definir Conceitos-Chave

Esclarecer conceitos centrais

**Agente:** `theory-connector`
**Ação:** `define_concepts`

**Prompt:**
```
Para cada conceito central:
1. Apresente definições da literatura
2. Compare diferentes perspectivas
3. Escolha/construa definição operacional
4. Justifique a escolha
```
**Entrada:** `theories_map`
**Saída:** `concepts_definitions`

### 3. Analisar Relações

Mapear relações entre conceitos

**Agente:** `theory-connector`
**Ação:** `analyze_relations`

**Prompt:**
```
Identifique as relações entre conceitos:
1. Quais conceitos estão relacionados?
2. Qual é a natureza da relação? (causal, associativa, etc.)
3. O que a teoria diz sobre essa relação?
4. O que a evidência empírica mostra?
```
**Entrada:** `concepts_definitions`
**Saída:** `relations_map`

### 4. Integrar Framework

Construir modelo integrado

**Agente:** `theory-connector`
**Ação:** `integrate_framework`

**Prompt:**
```
Construa o framework integrando:
1. Teorias selecionadas
2. Conceitos definidos
3. Relações mapeadas

Crie uma representação visual (descrição) do modelo.
```
**Entrada:** `theories_map`, `concepts_definitions`, `relations_map`
**Saída:** `integrated_framework`

### 5. Derivar Proposições *(opcional)*

Extrair proposições do framework

**Agente:** `theory-connector`
**Ação:** `derive_propositions`

**Prompt:**
```
A partir do framework, derive proposições:
1. Que afirmações teóricas decorrem do modelo?
2. Que relações são esperadas?
3. Como isso se conecta às hipóteses (se houver)?
```
**Entrada:** `integrated_framework`
**Saída:** `propositions`

### 6. Documentar Framework

Criar documentação formal

**Agente:** `theory-connector`
**Ação:** `document_framework`
**Entrada:** `integrated_framework`, `propositions`
**Saída:** `framework_document`

## Saídas do Workflow

- **framework_document:** `_adks/_docs/02-literature/theoretical-framework.md` (md)
- **framework_data:** `_adks/_memory/theoretical-framework.yaml` (yaml)

## Próximos Workflows

- `identify-gaps`
- `write-review`
- `design-method`

---
**Tags:** `phase-2` `literature` `theory` `framework` `concepts`

---
*Compilado pelo AD-KS Compiler v1.0*
*Fonte: build-framework.workflow.yaml*