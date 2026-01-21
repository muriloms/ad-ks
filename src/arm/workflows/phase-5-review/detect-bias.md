# 📋 Detecção de Vieses e Limitações

> Workflow para identificar vieses e limitações do trabalho.
Ajuda a reconhecer e documentar pontos fracos de forma
transparente e acadêmica.


---
**ID:** `detect-bias`
**Versão:** 1.0.0
**Módulo:** arm
**Fase:** 5
**Agente Líder:** `bias-detector`
**Agentes de Suporte:** `method-validator`, `logic-checker`
---

## Arquivos de Entrada

- `_adks/_memory/method-design.yaml` *(opcional)*
  - Design metodológico
- `_adks/_docs/**/*.md` *(opcional)*
  - Documentos do projeto

## Passos do Workflow

### 1. Revisar Metodologia

Analisar metodologia quanto a vieses

**Agente:** `bias-detector`
**Ação:** `review_methodology`

**Prompt:**
```
Revise a metodologia quanto a vieses:
1. Viés de seleção na amostra?
2. Viés de medição nos instrumentos?
3. Viés do pesquisador na coleta/análise?
4. Viés de confirmação nas interpretações?
```
**Saída:** `methodology_biases`

### 2. Revisar Uso da Literatura

Analisar vieses na revisão

**Agente:** `bias-detector`
**Ação:** `review_literature`

**Prompt:**
```
Revise o uso da literatura:
1. Seleção enviesada de fontes?
2. Fontes que contradizem foram ignoradas?
3. Interpretação tendenciosa de autores?
4. Viés de disponibilidade?
```
**Saída:** `literature_biases`

### 3. Revisar Interpretações

Analisar vieses nas conclusões

**Agente:** `bias-detector`
**Ação:** `review_interpretation`

**Prompt:**
```
Revise as interpretações e conclusões:
1. Conclusões excedem as evidências?
2. Explicações alternativas foram consideradas?
3. Há generalização excessiva?
4. Vieses cognitivos nas interpretações?
```
**Saída:** `interpretation_biases`

### 4. Identificar Limitações

Mapear limitações do estudo

**Agente:** `bias-detector`
**Ação:** `identify_limitations`

**Prompt:**
```
Identifique limitações:
1. Limitações metodológicas
2. Limitações de escopo
3. Limitações de generalização
4. Limitações de recursos/tempo
5. Limitações de acesso
```
**Entrada:** `methodology_biases`
**Saída:** `limitations_list`

### 5. Avaliar Impacto

Determinar impacto dos vieses

**Agente:** `bias-detector`
**Ação:** `assess_impact`

**Prompt:**
```
Para cada viés/limitação:
1. Qual o impacto potencial nos resultados?
2. Compromete a validade?
3. Pode ser mitigado?
4. Como deve ser reportado?
```
**Entrada:** `methodology_biases`, `literature_biases`, `interpretation_biases`, `limitations_list`
**Saída:** `impact_assessment`

### 6. Sugerir Mitigações

Propor formas de mitigar

**Agente:** `bias-detector`
**Ação:** `suggest_mitigations`

**Prompt:**
```
Para vieses ainda mitigáveis:
1. O que pode ser feito agora?
2. O que deveria ter sido feito?
3. Como reportar transparentemente?
4. Como pesquisas futuras podem evitar?
```
**Entrada:** `impact_assessment`
**Saída:** `mitigation_suggestions`

### 7. Rascunhar Seção de Limitações

Escrever texto para o artigo

**Agente:** `bias-detector`
**Ação:** `draft_limitations`

**Prompt:**
```
Redija texto para seção de limitações:
1. Reconheça limitações honestamente
2. Explique impacto potencial
3. Descreva mitigações adotadas
4. Sugira pesquisas futuras

Tom: transparente, não defensivo.
```
**Entrada:** `limitations_list`, `impact_assessment`, `mitigation_suggestions`
**Saída:** `limitations_draft`

### 8. Documentar Análise

Criar relatório completo

**Agente:** `bias-detector`
**Ação:** `document_analysis`
**Entrada:** `methodology_biases`, `literature_biases`, `interpretation_biases`, `limitations_list`, `impact_assessment`, `limitations_draft`
**Saída:** `bias_report`

## Saídas do Workflow

- **bias_report:** `_adks/_docs/05-review/bias-limitations.md` (md)
- **bias_data:** `_adks/_memory/bias-limitations.yaml` (yaml)

## Próximos Workflows

- `format-document`
- `final-checklist`

---
**Tags:** `phase-5` `review` `bias` `limitations` `transparency`

---
*Compilado pelo AD-KS Compiler v1.0*
*Fonte: detect-bias.workflow.yaml*