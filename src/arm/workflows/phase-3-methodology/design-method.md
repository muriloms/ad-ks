# 📋 Design da Metodologia de Pesquisa

> Workflow para desenhar a metodologia de pesquisa.
Define abordagem, tipo de pesquisa e estratégia geral
para responder à pergunta de pesquisa.


---
**ID:** `design-method`
**Versão:** 1.0.0
**Módulo:** arm
**Fase:** 3
**Agente Líder:** `method-architect`
**Agentes de Suporte:** `procedure-designer`, `feasibility-expert`
---

## Arquivos de Entrada

- `_adks/_memory/research-question.yaml` *(obrigatório)*
  - Pergunta de pesquisa
- `_adks/_memory/objectives.yaml` *(opcional)*
  - Objetivos definidos
- `_adks/_memory/hypotheses.yaml` *(opcional)*
  - Hipóteses (se houver)

## Passos do Workflow

### 1. Analisar Requisitos

Entender o que a pergunta demanda

**Agente:** `method-architect`
**Ação:** `analyze_requirements`

**Prompt:**
```
Analise o que a pesquisa requer:
1. Que tipo de conhecimento será gerado?
2. Que tipo de dados são necessários?
3. Quais são as restrições (tempo, recursos, acesso)?
4. Quais são os requisitos do programa/periódico?
```
**Saída:** `requirements_analysis`

### 2. Selecionar Abordagem

Escolher abordagem metodológica

**Agente:** `method-architect`
**Ação:** `select_approach`

**Prompt:**
```
Escolha a abordagem mais adequada:

- **Quantitativa**: Medir, testar hipóteses, generalizar
- **Qualitativa**: Compreender, explorar, interpretar
- **Mista**: Combinar quantitativa e qualitativa

Justifique a escolha com base nos requisitos.
```
**Entrada:** `requirements_analysis`
**Saída:** `selected_approach`, `approach_justification`

### 3. Definir Tipo de Pesquisa

Especificar o tipo de estudo

**Agente:** `method-architect`
**Ação:** `define_type`

**Prompt:**
```
Defina o tipo de pesquisa:

Quanto aos objetivos: exploratória, descritiva, explicativa
Quanto aos procedimentos: survey, experimento, estudo de caso,
pesquisa-ação, etnografia, revisão sistemática, etc.

Justifique as escolhas.
```
**Entrada:** `selected_approach`
**Saída:** `research_type`, `type_justification`

### 4. Delinear Método

Criar visão geral do método

**Agente:** `method-architect`
**Ação:** `outline_method`

**Prompt:**
```
Crie um outline do método incluindo:
1. Participantes/amostra/corpus
2. Instrumentos/técnicas de coleta
3. Procedimentos gerais
4. Técnicas de análise
5. Considerações éticas
```
**Entrada:** `research_type`, `requirements_analysis`
**Saída:** `method_outline`

### 5. Verificar Viabilidade

Avaliar viabilidade do design

**Agente:** `feasibility-expert`
**Ação:** `check_feasibility`

**Prompt:**
```
Avalie a viabilidade do design proposto:
1. Tempo necessário vs disponível
2. Recursos necessários vs disponíveis
3. Acesso a participantes/dados
4. Competências técnicas necessárias
```
**Entrada:** `method_outline`
**Saída:** `feasibility_assessment`

### 6. Documentar Design

Formalizar o design metodológico

**Agente:** `method-architect`
**Ação:** `document_design`
**Entrada:** `selected_approach`, `research_type`, `method_outline`, `feasibility_assessment`
**Saída:** `design_document`

## Saídas do Workflow

- **design_document:** `_adks/_docs/03-methodology/method-design.md` (md)
- **design_data:** `_adks/_memory/method-design.yaml` (yaml)

## Próximos Workflows

- `define-procedures`
- `data-strategy`
- `validate-method`

---
**Tags:** `phase-3` `methodology` `design` `approach`

---
*Compilado pelo AD-KS Compiler v1.0*
*Fonte: design-method.workflow.yaml*