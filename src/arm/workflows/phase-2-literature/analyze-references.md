# 📋 Análise de Referências Bibliográficas

> Workflow para analisar e organizar referências bibliográficas.
Inclui estratégia de busca, avaliação de fontes e organização
temática da literatura.


---
**ID:** `analyze-references`
**Versão:** 1.0.0
**Módulo:** arm
**Fase:** 2
**Agente Líder:** `literature-curator`
**Agentes de Suporte:** `theory-connector`, `gap-identifier`, `reference-manager`
---

## Arquivos de Entrada

- `_adks/_memory/research-question.yaml` *(opcional)*
  - Pergunta de pesquisa
- `_adks/_memory/topic-definition.yaml` *(opcional)*
  - Definição do tópico
- `_adks/_uploads/*.bib` *(opcional)*
  - Arquivos BibTeX com referências
- `_adks/_uploads/*.pdf` *(opcional)*
  - PDFs de artigos

## Passos do Workflow

### 1. Definir Estratégia de Busca

Planejar como buscar literatura

**Agente:** `literature-curator`
**Ação:** `define_search_strategy`

**Prompt:**
```
Defina a estratégia de busca:
1. Palavras-chave principais e sinônimos
2. Bases de dados relevantes para a área
3. Critérios de inclusão e exclusão
4. Período de cobertura
5. Tipos de publicação (artigos, livros, etc.)
```
**Saída:** `search_strategy`

### 2. Coletar Referências

Orientar coleta de referências

**Agente:** `literature-curator`
**Ação:** `guide_collection`

**Prompt:**
```
Oriente o pesquisador na coleta:
1. Execute buscas nas bases definidas
2. Aplique critérios de inclusão/exclusão
3. Documente resultados por base
4. Importe referências para gerenciador

Pergunte quantas referências foram encontradas.
```
**Entrada:** `search_strategy`
**Saída:** `collection_results`

### 3. Avaliar Fontes

Avaliar qualidade e relevância

**Agente:** `literature-curator`
**Ação:** `evaluate_sources`

**Prompt:**
```
Para as referências coletadas:
1. Avalie relevância para a pesquisa
2. Verifique qualidade da fonte (periódico, citações)
3. Classifique por prioridade de leitura
4. Identifique fontes seminais/essenciais
```
**Entrada:** `collection_results`
**Saída:** `evaluated_sources`, `priority_list`

### 4. Organizar por Temas

Categorizar literatura por temas

**Agente:** `literature-curator`
**Ação:** `organize_themes`

**Prompt:**
```
Organize as referências por temas:
1. Identifique temas/categorias principais
2. Classifique cada referência
3. Identifique conexões entre temas
4. Note lacunas em cada tema
```
**Entrada:** `evaluated_sources`
**Saída:** `thematic_organization`

### 5. Identificar Obras-Chave *(opcional)*

Destacar trabalhos fundamentais

**Agente:** `theory-connector`
**Ação:** `identify_key_works`

**Prompt:**
```
Identifique os trabalhos mais importantes:
1. Obras seminais da área
2. Revisões de literatura relevantes
3. Trabalhos mais citados
4. Publicações mais recentes
```
**Entrada:** `thematic_organization`
**Saída:** `key_works`

### 6. Documentar Análise

Criar documentação da análise

**Agente:** `literature-curator`
**Ação:** `document_analysis`
**Entrada:** `search_strategy`, `thematic_organization`, `key_works`
**Saída:** `analysis_document`

## Saídas do Workflow

- **analysis_document:** `_adks/_docs/02-literature/reference-analysis.md` (md)
- **references_data:** `_adks/_memory/references-analysis.yaml` (yaml)

## Próximos Workflows

- `build-framework`
- `identify-gaps`
- `write-review`

---
**Tags:** `phase-2` `literature` `references` `search`

---
*Compilado pelo AD-KS Compiler v1.0*
*Fonte: analyze-references.workflow.yaml*