# 📋 Estratégia de Dados

> Workflow para definir a estratégia completa de dados.
Inclui definição de variáveis, plano de amostragem e
plano de análise detalhado.


---
**ID:** `data-strategy`
**Versão:** 1.0.0
**Módulo:** arm
**Fase:** 3
**Agente Líder:** `data-strategist`
**Agentes de Suporte:** `method-architect`, `procedure-designer`
---

## Arquivos de Entrada

- `_adks/_memory/method-design.yaml` *(opcional)*
  - Design metodológico
- `_adks/_memory/hypotheses.yaml` *(opcional)*
  - Hipóteses

## Passos do Workflow

### 1. Definir Variáveis/Constructos

Especificar variáveis da pesquisa

**Agente:** `data-strategist`
**Ação:** `define_variables`

**Prompt:**
```
Defina as variáveis/constructos:

Para pesquisa quantitativa:
- Variável dependente
- Variável independente
- Variáveis de controle
- Operacionalização de cada uma

Para pesquisa qualitativa:
- Constructos/categorias de interesse
- Dimensões de análise
```
**Saída:** `variables_definition`

### 2. Planejar Amostragem

Definir estratégia amostral

**Agente:** `data-strategist`
**Ação:** `plan_sampling`

**Prompt:**
```
Defina a estratégia de amostragem:
1. Tipo de amostragem (probabilística/não-probabilística)
2. Técnica específica
3. Tamanho da amostra
4. Cálculo/justificativa do tamanho
5. Critérios de seleção
```
**Saída:** `sampling_plan`

### 3. Definir Fontes de Dados

Especificar de onde vêm os dados

**Agente:** `data-strategist`
**Ação:** `define_sources`

**Prompt:**
```
Especifique as fontes de dados:
1. Dados primários vs secundários
2. Fontes específicas
3. Formato dos dados
4. Como acessar/coletar
5. Limitações de cada fonte
```
**Entrada:** `sampling_plan`
**Saída:** `data_sources`

### 4. Criar Plano de Análise

Detalhar como analisar os dados

**Agente:** `data-strategist`
**Ação:** `create_analysis_plan`

**Prompt:**
```
Crie o plano de análise:

Para cada objetivo/hipótese:
1. Que dados são necessários?
2. Que análise será feita?
3. Que teste/técnica será usada?
4. Que software será usado?
5. Como interpretar os resultados?
```
**Entrada:** `variables_definition`
**Saída:** `analysis_plan`

### 5. Planejar Gestão de Dados

Definir como gerenciar dados

**Agente:** `data-strategist`
**Ação:** `plan_management`

**Prompt:**
```
Defina a gestão de dados:
1. Como dados serão armazenados
2. Formato de arquivos
3. Backup e segurança
4. Organização/nomenclatura
5. Tempo de retenção
```
**Saída:** `data_management_plan`

### 6. Documentar Estratégia

Compilar documentação

**Agente:** `data-strategist`
**Ação:** `document_strategy`
**Entrada:** `variables_definition`, `sampling_plan`, `data_sources`, `analysis_plan`, `data_management_plan`
**Saída:** `strategy_document`

## Saídas do Workflow

- **strategy_document:** `_adks/_docs/03-methodology/data-strategy.md` (md)
- **strategy_data:** `_adks/_memory/data-strategy.yaml` (yaml)

## Próximos Workflows

- `validate-method`

---
**Tags:** `phase-3` `methodology` `data` `sampling` `analysis`

---
*Compilado pelo AD-KS Compiler v1.0*
*Fonte: data-strategy.workflow.yaml*