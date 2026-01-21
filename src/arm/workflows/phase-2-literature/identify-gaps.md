# 📋 Identificação de Lacunas na Literatura

> Workflow para identificar e articular lacunas na literatura.
Lacunas bem identificadas justificam a relevância e originalidade
da pesquisa.


---
**ID:** `identify-gaps`
**Versão:** 1.0.0
**Módulo:** arm
**Fase:** 2
**Agente Líder:** `gap-identifier`
**Agentes de Suporte:** `literature-curator`, `theory-connector`
---

## Arquivos de Entrada

- `_adks/_memory/references-analysis.yaml` *(opcional)*
  - Análise de referências
- `_adks/_memory/theoretical-framework.yaml` *(opcional)*
  - Framework teórico

## Passos do Workflow

### 1. Revisar Estado da Literatura

Entender o que já existe

**Agente:** `gap-identifier`
**Ação:** `review_state`

**Prompt:**
```
Revise o que a literatura já oferece:
1. O que já foi estudado sobre o tema?
2. Quais perguntas já foram respondidas?
3. Quais métodos já foram usados?
4. Quais contextos já foram investigados?
```
**Saída:** `literature_state`

### 2. Identificar Tipos de Lacunas

Categorizar lacunas encontradas

**Agente:** `gap-identifier`
**Ação:** `identify_gaps`

**Prompt:**
```
Identifique lacunas por tipo:

- **Teóricas**: Conceitos não explorados, teorias não testadas
- **Metodológicas**: Métodos não aplicados ao contexto
- **Empíricas**: Populações/contextos não estudados
- **Temporais**: Estudos desatualizados
- **Contraditórias**: Resultados conflitantes
- **Relacionais**: Conexões não investigadas
```
**Entrada:** `literature_state`
**Saída:** `gaps_identified`

### 3. Avaliar Significância

Determinar importância de cada lacuna

**Agente:** `gap-identifier`
**Ação:** `assess_significance`

**Prompt:**
```
Para cada lacuna, avalie:
1. Por que é importante preencher?
2. Quem se beneficia se for preenchida?
3. Qual o impacto potencial?
4. É viável preenchê-la?

Priorize as lacunas mais significativas.
```
**Entrada:** `gaps_identified`
**Saída:** `gaps_prioritized`

### 4. Conectar à Pesquisa

Vincular lacunas ao estudo proposto

**Agente:** `gap-identifier`
**Ação:** `connect_to_research`

**Prompt:**
```
Para a(s) lacuna(s) principal(is):
1. Como sua pesquisa preenche esta lacuna?
2. Qual será a contribuição específica?
3. Por que seu estudo é adequado para isso?
```
**Entrada:** `gaps_prioritized`
**Saída:** `research_connection`

### 5. Construir Justificativa

Redigir justificativa da pesquisa

**Agente:** `gap-identifier`
**Ação:** `build_justification`

**Prompt:**
```
Construa a justificativa da pesquisa:
1. Apresente o problema/lacuna
2. Demonstre a importância de estudá-lo
3. Explique como seu estudo contribui
4. Destaque a originalidade
```
**Entrada:** `research_connection`, `gaps_prioritized`
**Saída:** `justification_text`

### 6. Documentar Lacunas

Criar documentação formal

**Agente:** `gap-identifier`
**Ação:** `document_gaps`
**Entrada:** `gaps_prioritized`, `justification_text`
**Saída:** `gaps_document`

## Saídas do Workflow

- **gaps_document:** `_adks/_docs/02-literature/literature-gaps.md` (md)
- **gaps_data:** `_adks/_memory/literature-gaps.yaml` (yaml)

## Próximos Workflows

- `write-review`
- `design-method`

---
**Tags:** `phase-2` `literature` `gaps` `justification` `contribution`

---
*Compilado pelo AD-KS Compiler v1.0*
*Fonte: identify-gaps.workflow.yaml*