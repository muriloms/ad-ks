# 📋 Criação de Apresentação

> Workflow para criar apresentação da pesquisa.
Usado para defesas, conferências, seminários e
outras apresentações orais.


---
**ID:** `create-presentation`
**Versão:** 1.0.0
**Módulo:** arm
**Fase:** 6
**Agente Líder:** `presentation-expert`
**Agentes de Suporte:** `academic-writer`, `structure-designer`
---

## Arquivos de Entrada

- `_adks/_docs/**/*.md` *(opcional)*
  - Documentos do projeto
- `_adks/_memory/*.yaml` *(opcional)*
  - Dados do projeto

## Passos do Workflow

### 1. Definir Contexto

Entender contexto da apresentação

**Agente:** `presentation-expert`
**Ação:** `define_context`

**Prompt:**
```
Defina o contexto da apresentação:
1. Qual é a ocasião? (defesa, conferência, seminário)
2. Quanto tempo disponível?
3. Quem é a audiência?
4. Há requisitos específicos?
5. Haverá perguntas depois?
```
**Saída:** `presentation_context`, `time_limit`, `audience_profile`

### 2. Planejar Estrutura

Definir estrutura da apresentação

**Agente:** `presentation-expert`
**Ação:** `plan_structure`

**Prompt:**
```
Planeje a estrutura:
1. Defina seções principais
2. Aloque tempo para cada seção
3. Identifique pontos-chave
4. Planeje transições
5. Reserve tempo para conclusão
```
**Entrada:** `presentation_context`, `time_limit`
**Saída:** `presentation_outline`

### 3. Extrair Pontos-Chave

Identificar conteúdo essencial

**Agente:** `presentation-expert`
**Ação:** `extract_key_points`

**Prompt:**
```
Extraia os pontos-chave do trabalho:
1. Problema/motivação principal
2. Pergunta de pesquisa
3. Metodologia (resumida)
4. Resultados principais
5. Contribuições/conclusões

Lembre: menos é mais em apresentações.
```
**Entrada:** `presentation_outline`
**Saída:** `key_points`

### 4. Desenhar Slides

Criar conteúdo dos slides

**Agente:** `presentation-expert`
**Ação:** `design_slides`

**Prompt:**
```
Desenhe os slides:
1. Um ponto principal por slide
2. Título que comunica a mensagem
3. Pouco texto (máximo 6 bullets)
4. Elementos visuais quando possível
5. Notas do apresentador
```
**Entrada:** `presentation_outline`, `key_points`
**Saída:** `slides_content`

### 5. Preparar Visuais

Criar/adaptar elementos visuais

**Agente:** `presentation-expert`
**Ação:** `prepare_visuals`

**Prompt:**
```
Prepare elementos visuais:
1. Gráficos simplificados
2. Tabelas resumidas
3. Diagramas explicativos
4. Imagens relevantes

Todos devem ser legíveis à distância.
```
**Entrada:** `slides_content`
**Saída:** `visual_elements`

### 6. Adicionar Notas

Criar notas do apresentador

**Agente:** `presentation-expert`
**Ação:** `add_notes`

**Prompt:**
```
Crie notas do apresentador:
1. Pontos a mencionar
2. Transições entre slides
3. Tempo estimado por slide
4. Lembretes importantes
```
**Entrada:** `slides_content`
**Saída:** `speaker_notes`

### 7. Preparar Perguntas *(opcional)*

Antecipar perguntas da banca

**Agente:** `presentation-expert`
**Ação:** `prepare_qa`

**Prompt:**
```
Antecipe perguntas:
1. Perguntas sobre metodologia
2. Perguntas sobre limitações
3. Perguntas sobre contribuições
4. Perguntas desafiadoras

Prepare respostas para cada uma.
```
**Entrada:** `presentation_context`
**Saída:** `qa_preparation`

### 8. Compilar Apresentação

Gerar apresentação final

**Agente:** `presentation-expert`
**Ação:** `compile_presentation`
**Entrada:** `slides_content`, `visual_elements`, `speaker_notes`, `qa_preparation`
**Saída:** `presentation_document`

## Saídas do Workflow

- **presentation_document:** `_adks/_docs/06-final/presentation.md` (md)
- **presentation_data:** `_adks/_memory/presentation.yaml` (yaml)

## Próximos Workflows

- `final-checklist`

---
**Tags:** `phase-6` `finalization` `presentation` `defense` `slides`

---
*Compilado pelo AD-KS Compiler v1.0*
*Fonte: create-presentation.workflow.yaml*