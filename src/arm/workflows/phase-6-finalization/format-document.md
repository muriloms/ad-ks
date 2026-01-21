# 📋 Formatação Final do Documento

> Workflow para formatação final do documento.
Aplica template do periódico/programa e prepara
documento para submissão.


---
**ID:** `format-document`
**Versão:** 1.0.0
**Módulo:** arm
**Fase:** 6
**Agente Líder:** `latex-specialist`
**Agentes de Suporte:** `reference-manager`, `structure-designer`
---

## Arquivos de Entrada

- `_adks/_docs/04-writing/**/*.md` *(opcional)*
  - Seções do documento
- `_adks/_uploads/*.tex` *(opcional)*
  - Documento LaTeX existente
- `_adks/_uploads/*.docx` *(opcional)*
  - Documento Word existente

## Passos do Workflow

### 1. Identificar Requisitos

Entender requisitos de formatação

**Agente:** `latex-specialist`
**Ação:** `identify_requirements`

**Prompt:**
```
Identifique os requisitos de formatação:
1. Qual é o destino? (periódico, programa, conferência)
2. Há template específico?
3. Quais são as regras de formatação?
4. Limites de páginas/palavras?
5. Formato de figuras/tabelas?
```
**Saída:** `format_requirements`, `template_info`

### 2. Configurar Template

Preparar template do documento

**Agente:** `latex-specialist`
**Ação:** `setup_template`

**Prompt:**
```
Configure o template:
1. Carregue/crie template adequado
2. Configure margens, fontes, espaçamento
3. Configure cabeçalhos/rodapés
4. Prepare estrutura de seções
```
**Entrada:** `format_requirements`, `template_info`
**Saída:** `template_setup`

### 3. Formatar Texto

Aplicar formatação ao conteúdo

**Agente:** `latex-specialist`
**Ação:** `format_text`

**Prompt:**
```
Aplique formatação ao texto:
1. Títulos e subtítulos
2. Parágrafos e espaçamento
3. Listas e enumerações
4. Destaques e ênfases
5. Notas de rodapé
```
**Entrada:** `template_setup`
**Saída:** `formatted_text`

### 4. Formatar Referências

Aplicar estilo às referências

**Agente:** `reference-manager`
**Ação:** `format_references`

**Prompt:**
```
Formate as referências:
1. Aplique estilo correto (ABNT/APA/etc)
2. Ordene conforme requisito
3. Verifique completude
4. Configure citações no texto
```
**Entrada:** `format_requirements`
**Saída:** `formatted_references`

### 5. Formatar Figuras e Tabelas

Ajustar elementos visuais

**Agente:** `latex-specialist`
**Ação:** `format_visuals`

**Prompt:**
```
Formate figuras e tabelas:
1. Tamanho adequado
2. Legendas formatadas
3. Numeração correta
4. Posicionamento adequado
5. Qualidade de imagem
```
**Saída:** `formatted_visuals`

### 6. Compilar Documento

Gerar documento final

**Agente:** `latex-specialist`
**Ação:** `compile_document`

**Prompt:**
```
Compile o documento:
1. Junte todas as partes
2. Gere PDF/documento final
3. Verifique paginação
4. Verifique referências cruzadas
5. Resolva warnings/erros
```
**Entrada:** `formatted_text`, `formatted_references`, `formatted_visuals`
**Saída:** `compiled_document`

### 7. Verificação Final

Conferir documento compilado

**Agente:** `latex-specialist`
**Ação:** `final_check`

**Prompt:**
```
Faça verificação final:
1. Todas as páginas estão corretas?
2. Sumário está atualizado?
3. Referências cruzadas funcionam?
4. Não há texto cortado?
5. Atende limites de tamanho?
```
**Entrada:** `compiled_document`
**Saída:** `final_document`

## Saídas do Workflow

- `final_document`
- `source_files`

## Próximos Workflows

- `create-presentation`
- `final-checklist`
- `prepare-submission`

---
**Tags:** `phase-6` `finalization` `formatting` `latex` `document`

---
*Compilado pelo AD-KS Compiler v1.0*
*Fonte: format-document.workflow.yaml*