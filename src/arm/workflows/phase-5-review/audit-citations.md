# 📋 Auditoria de Citações e Referências

> Workflow para auditar citações e referências do trabalho.
Verifica precisão, consistência e adequação das citações.


---
**ID:** `audit-citations`
**Versão:** 1.0.0
**Módulo:** arm
**Fase:** 5
**Agente Líder:** `citation-auditor`
**Agentes de Suporte:** `reference-manager`, `literature-curator`
---

## Arquivos de Entrada

- `_adks/_docs/**/*.md` *(opcional)*
  - Documentos com citações
- `_adks/_uploads/*.bib` *(opcional)*
  - Arquivo de referências
- `_adks/_uploads/*.docx` *(opcional)*
  - Documento Word

## Passos do Workflow

### 1. Coletar Citações

Extrair todas as citações do texto

**Agente:** `citation-auditor`
**Ação:** `collect_citations`

**Prompt:**
```
Colete todas as citações do documento:
1. Identifique citações diretas
2. Identifique citações indiretas
3. Note o formato usado
4. Liste autores e anos citados
```
**Saída:** `citations_list`, `citation_format`

### 2. Verificar Referências

Conferir citações vs lista de referências

**Agente:** `citation-auditor`
**Ação:** `cross_check`

**Prompt:**
```
Compare citações com lista de referências:
1. Todas as citações têm referência?
2. Todas as referências são citadas?
3. Anos e autores conferem?
4. Há duplicatas ou inconsistências?
```
**Entrada:** `citations_list`
**Saída:** `cross_check_results`

### 3. Verificar Precisão *(opcional)*

Conferir se citações são precisas

**Agente:** `citation-auditor`
**Ação:** `verify_accuracy`

**Prompt:**
```
Para citações selecionadas, verifique:
1. A citação reflete o que o autor disse?
2. O contexto está preservado?
3. Citações diretas são exatas?
4. Não há distorção do significado?
```
**Entrada:** `citations_list`
**Saída:** `accuracy_check`

### 4. Verificar Formatação

Conferir padrão de formatação

**Agente:** `reference-manager`
**Ação:** `check_format`

**Prompt:**
```
Verifique a formatação das citações:
1. Seguem o padrão escolhido (ABNT/APA/etc)?
2. São consistentes ao longo do texto?
3. Pontuação está correta?
4. Referências estão completas?
```
**Entrada:** `citations_list`, `citation_format`
**Saída:** `format_check`

### 5. Identificar Problemas

Consolidar problemas encontrados

**Agente:** `citation-auditor`
**Ação:** `identify_issues`

**Prompt:**
```
Consolide os problemas encontrados:
1. Citações sem referência
2. Referências não citadas
3. Erros de formatação
4. Possíveis imprecisões
5. Inconsistências
```
**Entrada:** `cross_check_results`, `accuracy_check`, `format_check`
**Saída:** `issues_list`

### 6. Gerar Relatório

Criar relatório de auditoria

**Agente:** `citation-auditor`
**Ação:** `generate_report`
**Entrada:** `citations_list`, `cross_check_results`, `format_check`, `issues_list`
**Saída:** `audit_report`

## Saídas do Workflow

- **audit_report:** `_adks/_docs/05-review/citation-audit.md` (md)
- **audit_data:** `_adks/_memory/citation-audit.yaml` (yaml)

## Próximos Workflows

- `detect-bias`
- `format-document`

---
**Tags:** `phase-5` `review` `citations` `references` `audit`

---
*Compilado pelo AD-KS Compiler v1.0*
*Fonte: audit-citations.workflow.yaml*