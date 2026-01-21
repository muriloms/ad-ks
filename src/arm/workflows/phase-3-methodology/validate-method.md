# 📋 Validação da Metodologia

> Workflow para validar a metodologia proposta.
Verifica coerência, rigor e viabilidade do design
metodológico antes da execução.


---
**ID:** `validate-method`
**Versão:** 1.0.0
**Módulo:** arm
**Fase:** 3
**Agente Líder:** `method-validator`
**Agentes de Suporte:** `method-architect`, `feasibility-expert`, `logic-checker`
---

## Arquivos de Entrada

- `_adks/_memory/method-design.yaml` *(obrigatório)*
  - Design metodológico
- `_adks/_memory/procedures.yaml` *(opcional)*
  - Procedimentos definidos
- `_adks/_memory/data-strategy.yaml` *(opcional)*
  - Estratégia de dados
- `_adks/_memory/research-question.yaml` *(obrigatório)*
  - Pergunta de pesquisa

## Passos do Workflow

### 1. Verificar Alinhamento

Confirmar coerência pergunta-método

**Agente:** `method-validator`
**Ação:** `check_alignment`

**Prompt:**
```
Verifique o alinhamento:
1. O método permite responder a pergunta?
2. Os procedimentos são adequados aos objetivos?
3. As técnicas de análise são apropriadas?
4. Há coerência entre abordagem e instrumentos?
```
**Saída:** `alignment_check`

### 2. Avaliar Validade

Verificar validade do design

**Agente:** `method-validator`
**Ação:** `assess_validity`

**Prompt:**
```
Avalie a validade do design:

**Validade Interna:**
- Controle de variáveis
- Ameaças à validade interna

**Validade Externa:**
- Generalização dos resultados
- Limitações de contexto

**Validade de Constructo:**
- Operacionalização adequada
- Instrumentos medem o que devem
```
**Saída:** `validity_assessment`

### 3. Identificar Ameaças

Mapear ameaças à validade

**Agente:** `method-validator`
**Ação:** `identify_threats`

**Prompt:**
```
Identifique ameaças à validade:
1. Quais são as ameaças possíveis?
2. Qual a probabilidade de cada uma?
3. Qual o impacto potencial?
4. Como podem ser mitigadas?
```
**Entrada:** `validity_assessment`
**Saída:** `threats_identified`

### 4. Verificar Lógica *(opcional)*

Checar coerência lógica

**Agente:** `logic-checker`
**Ação:** `check_method_logic`

**Prompt:**
```
Verifique a lógica do método:
1. Os passos seguem sequência lógica?
2. Há premissas não justificadas?
3. As conclusões possíveis decorrem do método?
4. Há saltos lógicos?
```
**Saída:** `logic_check`

### 5. Verificar Viabilidade Final

Confirmar viabilidade de execução

**Agente:** `feasibility-expert`
**Ação:** `final_feasibility`

**Prompt:**
```
Faça verificação final de viabilidade:
1. Todos os recursos estão disponíveis?
2. O cronograma é realista?
3. Há riscos não mitigados?
4. Aprovações necessárias foram obtidas?
```
**Saída:** `final_feasibility`

### 6. Gerar Recomendações

Consolidar recomendações

**Agente:** `method-validator`
**Ação:** `generate_recommendations`

**Prompt:**
```
Gere recomendações finais:
1. Ajustes necessários antes de executar
2. Pontos de atenção durante execução
3. Mitigações a implementar
4. Documentação adicional necessária
```
**Entrada:** `alignment_check`, `validity_assessment`, `threats_identified`, `final_feasibility`
**Saída:** `recommendations`

### 7. Documentar Validação

Criar relatório de validação

**Agente:** `method-validator`
**Ação:** `document_validation`
**Entrada:** `alignment_check`, `validity_assessment`, `threats_identified`, `recommendations`
**Saída:** `validation_document`

## Saídas do Workflow

- **validation_document:** `_adks/_docs/03-methodology/method-validation.md` (md)
- **validation_data:** `_adks/_memory/method-validation.yaml` (yaml)

## Próximos Workflows

- `write-section`
- `plan-structure`

---
**Tags:** `phase-3` `methodology` `validation` `rigor` `quality`

---
*Compilado pelo AD-KS Compiler v1.0*
*Fonte: validate-method.workflow.yaml*