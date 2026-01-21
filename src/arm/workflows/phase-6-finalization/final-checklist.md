# 📋 Checklist Final de Qualidade

> Workflow de verificação final antes da submissão.
Garante que todos os elementos estão completos
e em conformidade.


---
**ID:** `final-checklist`
**Versão:** 1.0.0
**Módulo:** arm
**Fase:** 6
**Agente Líder:** `method-validator`
**Agentes de Suporte:** `citation-auditor`, `style-guardian`, `structure-designer`
---

## Arquivos de Entrada

- `_adks/_docs/06-final/*` *(opcional)*
  - Documentos finais
- `_adks/_memory/*.yaml` *(opcional)*
  - Dados do projeto

## Passos do Workflow

### 1. Verificar Estrutura

Conferir completude da estrutura

**Agente:** `structure-designer`
**Ação:** `check_structure`

**Prompt:**
```
Verifique a estrutura do documento:
- [ ] Todas as seções obrigatórias presentes?
- [ ] Ordem das seções correta?
- [ ] Numeração de seções consistente?
- [ ] Sumário atualizado?
- [ ] Listas de figuras/tabelas (se requerido)?
```
**Saída:** `structure_check`

### 2. Verificar Conteúdo

Conferir completude do conteúdo

**Agente:** `method-validator`
**Ação:** `check_content`

**Prompt:**
```
Verifique o conteúdo:
- [ ] Introdução contextualiza adequadamente?
- [ ] Revisão cobre conceitos necessários?
- [ ] Metodologia está completa?
- [ ] Resultados respondem aos objetivos?
- [ ] Discussão interpreta os resultados?
- [ ] Conclusão sintetiza contribuições?
- [ ] Limitações estão declaradas?
```
**Saída:** `content_check`

### 3. Verificar Citações

Conferir citações e referências

**Agente:** `citation-auditor`
**Ação:** `check_citations`

**Prompt:**
```
Verifique citações e referências:
- [ ] Todas citações têm referência?
- [ ] Todas referências são citadas?
- [ ] Formato consistente?
- [ ] Informações completas?
- [ ] Links/DOIs funcionam?
```
**Saída:** `citations_check`

### 4. Verificar Formatação

Conferir formatação

**Agente:** `style-guardian`
**Ação:** `check_formatting`

**Prompt:**
```
Verifique a formatação:
- [ ] Fonte e tamanho corretos?
- [ ] Margens conforme requisito?
- [ ] Espaçamento correto?
- [ ] Títulos formatados consistentemente?
- [ ] Figuras/tabelas bem posicionadas?
- [ ] Legendas presentes e corretas?
```
**Saída:** `formatting_check`

### 5. Verificar Linguagem

Conferir qualidade textual

**Agente:** `style-guardian`
**Ação:** `check_language`

**Prompt:**
```
Verifique a linguagem:
- [ ] Sem erros ortográficos?
- [ ] Sem erros gramaticais?
- [ ] Tom acadêmico consistente?
- [ ] Terminologia consistente?
- [ ] Clareza em todo o texto?
```
**Saída:** `language_check`

### 6. Verificar Requisitos

Conferir requisitos específicos

**Agente:** `method-validator`
**Ação:** `check_requirements`

**Prompt:**
```
Verifique requisitos do destino:
- [ ] Limite de páginas/palavras respeitado?
- [ ] Formato de arquivo correto?
- [ ] Elementos obrigatórios presentes?
- [ ] Anonimização (se blind review)?
- [ ] Declarações necessárias incluídas?
```
**Saída:** `requirements_check`

### 7. Gerar Relatório

Consolidar verificações

**Agente:** `method-validator`
**Ação:** `generate_report`

**Prompt:**
```
Consolide as verificações:
1. Status geral (pronto/não pronto)
2. Itens pendentes
3. Riscos identificados
4. Recomendações finais
```
**Entrada:** `structure_check`, `content_check`, `citations_check`, `formatting_check`, `language_check`, `requirements_check`
**Saída:** `final_report`

## Saídas do Workflow

- **final_report:** `_adks/_docs/06-final/quality-checklist.md` (md)
- **checklist_data:** `_adks/_memory/quality-checklist.yaml` (yaml)

## Próximos Workflows

- `prepare-submission`

---
**Tags:** `phase-6` `finalization` `checklist` `quality` `verification`

---
*Compilado pelo AD-KS Compiler v1.0*
*Fonte: final-checklist.workflow.yaml*