# 📋 Inicialização do AD-KS

> Workflow de inicialização que apresenta as opções de início
e direciona o usuário para o workflow apropriado.


---
**ID:** `workflow-init`
**Versão:** 1.0.0
**Módulo:** core
**Agente Líder:** `adks-master`
---

## Arquivos de Entrada

- `_adks/_config/project-config.yaml` *(opcional)*
  - Configuração do projeto (se existir)

## Passos do Workflow

### 1. Verificar Contexto

Verifica se existe projeto configurado e carrega contexto

**Agente:** `adks-master`
**Ação:** `check_project_context`
**Saída:** `context_loaded`, `project_exists`

### 2. Apresentar Opções

Mostra as 8 opções de início para o usuário

**Agente:** `adks-master`
**Ação:** `show_workflow_init_options`

**Prompt:**
```
Apresente as 8 opções de início usando o template workflow_init_options.
Se já existe um projeto, destaque a opção "Continuar Projeto".
```
**Entrada:** `context_loaded`
**Saída:** `selected_option`

### 3. Direcionar Seleção

Direciona para o workflow ou agente apropriado

**Agente:** `adks-master`
**Ação:** `route_to_selection`
**Entrada:** `selected_option`
**Saída:** `target_workflow`, `target_agent`

### 4. Executar Transferência

Transfere para o workflow ou agente selecionado

**Agente:** `adks-master`
**Ação:** `execute_handoff`
**Entrada:** `target_workflow`, `target_agent`, `context_loaded`

## Saídas do Workflow

- **workflow_selection:** `_adks/_memory/last-workflow-selection.yaml` (yaml)

## Próximos Workflows

- `new-research`
- `explore-idea`
- `continue-project`
- `analyze-references`
- `design-method`
- `write-section`
- `scientific-review`
- `improve-text`

---
**Tags:** `core` `initialization` `navigation`

---
*Compilado pelo AD-KS Compiler v1.0*
*Fonte: workflow-init.workflow.yaml*