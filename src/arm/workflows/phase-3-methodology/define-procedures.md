# 📋 Definição de Procedimentos de Pesquisa

> Workflow para detalhar os procedimentos de coleta e análise.
Transforma o design metodológico em passos concretos e
executáveis.


---
**ID:** `define-procedures`
**Versão:** 1.0.0
**Módulo:** arm
**Fase:** 3
**Agente Líder:** `procedure-designer`
**Agentes de Suporte:** `method-architect`, `data-strategist`
---

## Arquivos de Entrada

- `_adks/_memory/method-design.yaml` *(obrigatório)*
  - Design metodológico

## Passos do Workflow

### 1. Detalhar Participantes/Amostra

Especificar população e amostra

**Agente:** `procedure-designer`
**Ação:** `detail_participants`

**Prompt:**
```
Detalhe participantes/amostra:
1. Quem são os participantes? (ou qual é o corpus?)
2. Critérios de inclusão
3. Critérios de exclusão
4. Tamanho da amostra e justificativa
5. Estratégia de recrutamento/seleção
```
**Saída:** `participants_details`

### 2. Desenhar Instrumentos

Criar/adaptar instrumentos de coleta

**Agente:** `procedure-designer`
**Ação:** `design_instruments`

**Prompt:**
```
Para cada instrumento necessário:
1. Tipo de instrumento (questionário, roteiro, checklist, etc.)
2. Construtos/variáveis que mede
3. Estrutura do instrumento
4. Fonte (criado, adaptado, validado)
5. Procedimento de validação (se criado)
```
**Saída:** `instruments_design`

### 3. Definir Procedimentos de Coleta

Detalhar como dados serão coletados

**Agente:** `procedure-designer`
**Ação:** `define_collection`

**Prompt:**
```
Detalhe os procedimentos de coleta:
1. Sequência de etapas
2. Quem coleta
3. Onde acontece
4. Quanto tempo leva
5. Como registrar os dados
6. Procedimentos de backup
```
**Entrada:** `instruments_design`
**Saída:** `collection_procedures`

### 4. Definir Procedimentos de Análise

Detalhar como dados serão analisados

**Agente:** `procedure-designer`
**Ação:** `define_analysis`

**Prompt:**
```
Detalhe os procedimentos de análise:
1. Técnicas de análise para cada tipo de dado
2. Software/ferramentas a serem usados
3. Categorias de análise (se qualitativa)
4. Testes estatísticos (se quantitativa)
5. Procedimentos de validação da análise
```
**Saída:** `analysis_procedures`

### 5. Abordar Questões Éticas

Definir procedimentos éticos

**Agente:** `procedure-designer`
**Ação:** `address_ethics`

**Prompt:**
```
Defina procedimentos éticos:
1. Necessidade de aprovação em comitê de ética
2. Termo de consentimento
3. Garantia de anonimato/confidencialidade
4. Riscos e benefícios para participantes
5. Armazenamento seguro de dados
```
**Saída:** `ethical_procedures`

### 6. Criar Cronograma

Estabelecer cronograma de execução

**Agente:** `procedure-designer`
**Ação:** `create_timeline`

**Prompt:**
```
Crie cronograma detalhado:
1. Fases da coleta de dados
2. Duração estimada de cada fase
3. Marcos importantes
4. Buffers para imprevistos
```
**Saída:** `execution_timeline`

### 7. Documentar Procedimentos

Compilar documentação

**Agente:** `procedure-designer`
**Ação:** `document_procedures`
**Entrada:** `participants_details`, `instruments_design`, `collection_procedures`, `analysis_procedures`, `ethical_procedures`, `execution_timeline`
**Saída:** `procedures_document`

## Saídas do Workflow

- **procedures_document:** `_adks/_docs/03-methodology/procedures.md` (md)
- **procedures_data:** `_adks/_memory/procedures.yaml` (yaml)

## Próximos Workflows

- `data-strategy`
- `validate-method`

---
**Tags:** `phase-3` `methodology` `procedures` `instruments` `ethics`

---
*Compilado pelo AD-KS Compiler v1.0*
*Fonte: define-procedures.workflow.yaml*