# 📋 Preparação para Submissão

> Workflow final para preparar e realizar submissão.
Organiza materiais e guia o processo de submissão
ao periódico, programa ou conferência.


---
**ID:** `prepare-submission`
**Versão:** 1.0.0
**Módulo:** arm
**Fase:** 6
**Agente Líder:** `project-planner`
**Agentes de Suporte:** `latex-specialist`, `academic-writer`
---

## Arquivos de Entrada

- `_adks/_docs/06-final/*` *(obrigatório)*
  - Documentos finais
- `_adks/_memory/quality-checklist.yaml` *(opcional)*
  - Resultado do checklist

## Passos do Workflow

### 1. Verificar Prontidão

Confirmar que documento está pronto

**Agente:** `project-planner`
**Ação:** `verify_readiness`

**Prompt:**
```
Verifique a prontidão para submissão:
1. Checklist de qualidade aprovado?
2. Todos os coautores revisaram?
3. Orientador aprovou (se aplicável)?
4. Documento está finalizado?

Se não estiver pronto, identifique pendências.
```
**Saída:** `readiness_status`, `pending_items`

### 2. Identificar Informações de Submissão

Coletar dados do destino

**Agente:** `project-planner`
**Ação:** `identify_submission`

**Prompt:**
```
Identifique informações de submissão:
1. Nome do periódico/conferência/programa
2. URL do sistema de submissão
3. Prazo de submissão
4. Taxa de submissão (se houver)
5. Requisitos específicos
```
**Saída:** `submission_info`

### 3. Preparar Carta de Apresentação *(opcional)*

Redigir cover letter

**Agente:** `academic-writer`
**Ação:** `prepare_cover_letter`

**Prompt:**
```
Redija carta de apresentação:
1. Dirigida ao editor
2. Título do artigo
3. Breve descrição da contribuição
4. Por que é adequado para o periódico
5. Declarações necessárias
6. Informações de contato
```
**Entrada:** `submission_info`
**Saída:** `cover_letter`

### 4. Preparar Materiais Suplementares *(opcional)*

Organizar anexos e suplementos

**Agente:** `project-planner`
**Ação:** `prepare_supplementary`

**Prompt:**
```
Organize materiais suplementares:
1. Dados brutos (se compartilhados)
2. Materiais adicionais
3. Apêndices
4. Declarações de ética
5. Autorizações necessárias
```
**Saída:** `supplementary_materials`

### 5. Verificar Formatos

Confirmar formatos de arquivo

**Agente:** `latex-specialist`
**Ação:** `check_formats`

**Prompt:**
```
Verifique os formatos de arquivo:
1. Documento principal no formato correto?
2. Figuras em formato aceito?
3. Tabelas em formato aceito?
4. Suplementares no formato correto?
5. Tamanho dos arquivos adequado?
```
**Entrada:** `submission_info`
**Saída:** `format_verification`

### 6. Criar Checklist de Submissão

Lista final para submissão

**Agente:** `project-planner`
**Ação:** `create_checklist`

**Prompt:**
```
Crie checklist de submissão:
- [ ] Documento principal
- [ ] Carta de apresentação
- [ ] Figuras separadas (se requerido)
- [ ] Tabelas separadas (se requerido)
- [ ] Materiais suplementares
- [ ] Informações de autores
- [ ] Palavras-chave
- [ ] Área temática
- [ ] Declarações necessárias
```
**Saída:** `submission_checklist`

### 7. Documentar Submissão

Registrar dados da submissão

**Agente:** `project-planner`
**Ação:** `document_submission`

**Prompt:**
```
Após a submissão, documente:
1. Data e hora da submissão
2. Número/ID da submissão
3. Confirmação recebida?
4. Prazo esperado de resposta
5. Próximos passos
```
**Entrada:** `submission_info`, `submission_checklist`
**Saída:** `submission_record`

## Saídas do Workflow

- `submission_package`
- `submission_record`

---
**Tags:** `phase-6` `finalization` `submission` `publication` `final`

---
*Compilado pelo AD-KS Compiler v1.0*
*Fonte: prepare-submission.workflow.yaml*