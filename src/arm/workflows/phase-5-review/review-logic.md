# 📋 Revisão Lógica e Argumentativa

> Workflow para revisar a lógica e argumentação do trabalho.
Verifica coerência, identifica falácias e fortalece
a estrutura argumentativa.


---
**ID:** `review-logic`
**Versão:** 1.0.0
**Módulo:** arm
**Fase:** 5
**Agente Líder:** `logic-checker`
**Agentes de Suporte:** `method-validator`, `academic-writer`
---

## Arquivos de Entrada

- `_adks/_docs/04-writing/**/*.md` *(opcional)*
  - Seções escritas
- `_adks/_uploads/*.docx` *(opcional)*
  - Documento completo

## Passos do Workflow

### 1. Receber Documento

Obter texto para revisão

**Agente:** `logic-checker`
**Ação:** `receive_document`

**Prompt:**
```
Receba o documento para revisão lógica:
1. Identifique as partes a revisar
2. Entenda o tipo de argumento (empírico, teórico, etc.)
3. Note a estrutura geral
```
**Saída:** `document_content`, `argument_type`

### 2. Mapear Argumentos

Identificar estrutura argumentativa

**Agente:** `logic-checker`
**Ação:** `map_arguments`

**Prompt:**
```
Mapeie a estrutura dos argumentos:
1. Identifique premissas principais
2. Identifique conclusões
3. Trace conexões premissa → conclusão
4. Note argumentos implícitos
```
**Entrada:** `document_content`
**Saída:** `argument_map`

### 3. Verificar Validade

Avaliar validade lógica

**Agente:** `logic-checker`
**Ação:** `check_validity`

**Prompt:**
```
Verifique a validade dos argumentos:
1. Conclusões decorrem das premissas?
2. Há saltos lógicos?
3. Premissas estão justificadas?
4. Evidências suportam afirmações?
```
**Entrada:** `argument_map`
**Saída:** `validity_assessment`

### 4. Identificar Falácias

Detectar erros de raciocínio

**Agente:** `logic-checker`
**Ação:** `identify_fallacies`

**Prompt:**
```
Identifique possíveis falácias:
- Generalização apressada
- Falsa causa (post hoc)
- Apelo à autoridade inadequado
- Petição de princípio
- Falso dilema
- Ad hominem
- E outras...
```
**Entrada:** `argument_map`, `validity_assessment`
**Saída:** `fallacies_found`

### 5. Verificar Evidências

Conferir se afirmações têm suporte

**Agente:** `logic-checker`
**Ação:** `check_evidence`

**Prompt:**
```
Verifique o suporte das afirmações:
1. Afirmações têm evidência adequada?
2. Evidências são relevantes?
3. Há afirmações sem suporte?
4. Fontes são confiáveis?
```
**Entrada:** `document_content`
**Saída:** `evidence_check`

### 6. Sugerir Melhorias

Propor correções

**Agente:** `logic-checker`
**Ação:** `suggest_improvements`

**Prompt:**
```
Para cada problema identificado:
1. Explique o problema claramente
2. Sugira correção específica
3. Ofereça alternativa de reformulação
4. Indique prioridade
```
**Entrada:** `validity_assessment`, `fallacies_found`, `evidence_check`
**Saída:** `improvement_suggestions`

### 7. Documentar Revisão

Criar relatório de revisão

**Agente:** `logic-checker`
**Ação:** `document_review`
**Entrada:** `argument_map`, `validity_assessment`, `fallacies_found`, `improvement_suggestions`
**Saída:** `logic_review_document`

## Saídas do Workflow

- **logic_review_document:** `_adks/_docs/05-review/logic-review.md` (md)
- **logic_review_data:** `_adks/_memory/logic-review.yaml` (yaml)

## Próximos Workflows

- `audit-citations`
- `detect-bias`

---
**Tags:** `phase-5` `review` `logic` `argumentation` `fallacies`

---
*Compilado pelo AD-KS Compiler v1.0*
*Fonte: review-logic.workflow.yaml*