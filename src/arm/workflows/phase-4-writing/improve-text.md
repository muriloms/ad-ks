# 📋 Melhoria de Texto Acadêmico

> Workflow para melhorar texto acadêmico existente.
Foca em clareza, coesão, estilo e impacto do texto.


---
**ID:** `improve-text`
**Versão:** 1.0.0
**Módulo:** arm
**Fase:** 4
**Agente Líder:** `academic-writer`
**Agentes de Suporte:** `style-guardian`, `logic-checker`
---

## Arquivos de Entrada

- `_adks/_uploads/*.docx` *(opcional)*
  - Documento Word
- `_adks/_uploads/*.md` *(opcional)*
  - Documento Markdown
- `_adks/_uploads/*.tex` *(opcional)*
  - Documento LaTeX

## Passos do Workflow

### 1. Receber Texto

Obter texto a ser melhorado

**Agente:** `academic-writer`
**Ação:** `receive_text`

**Prompt:**
```
Receba o texto para melhoria:
1. Peça o texto ou arquivo
2. Identifique o tipo de melhoria desejada
3. Pergunte sobre contexto (seção, público, etc.)
4. Entenda restrições (tamanho, estilo, etc.)
```
**Saída:** `original_text`, `improvement_goals`, `constraints`

### 2. Diagnosticar Problemas

Identificar pontos de melhoria

**Agente:** `academic-writer`
**Ação:** `diagnose_issues`

**Prompt:**
```
Analise o texto e identifique:
1. Problemas de clareza
2. Problemas de estrutura
3. Problemas de coesão
4. Problemas de estilo
5. Pontos fortes a manter
```
**Entrada:** `original_text`
**Saída:** `diagnosis`

### 3. Verificar Fluxo Lógico *(opcional)*

Analisar coerência argumentativa

**Agente:** `logic-checker`
**Ação:** `check_flow`

**Prompt:**
```
Verifique o fluxo lógico:
1. Os argumentos seguem sequência lógica?
2. Há saltos ou lacunas?
3. As transições são adequadas?
4. A conclusão decorre das premissas?
```
**Entrada:** `original_text`
**Saída:** `logic_assessment`

### 4. Melhorar Clareza

Tornar texto mais claro

**Agente:** `academic-writer`
**Ação:** `improve_clarity`

**Prompt:**
```
Melhore a clareza do texto:
1. Simplifique frases complexas
2. Elimine ambiguidades
3. Defina termos quando necessário
4. Use linguagem precisa
```
**Entrada:** `original_text`, `diagnosis`
**Saída:** `clearer_text`

### 5. Melhorar Coesão

Melhorar conexões entre partes

**Agente:** `academic-writer`
**Ação:** `improve_cohesion`

**Prompt:**
```
Melhore a coesão:
1. Adicione/melhore transições
2. Use conectivos adequados
3. Mantenha consistência terminológica
4. Crie referências internas quando útil
```
**Entrada:** `clearer_text`
**Saída:** `cohesive_text`

### 6. Refinar Estilo

Polir o estilo do texto

**Agente:** `style-guardian`
**Ação:** `refine_style`

**Prompt:**
```
Refine o estilo:
1. Ajuste tom acadêmico
2. Elimine verbosidade
3. Varie estrutura das frases
4. Garanta consistência
```
**Entrada:** `cohesive_text`, `constraints`
**Saída:** `refined_text`

### 7. Apresentar Melhorias

Mostrar versão melhorada

**Agente:** `academic-writer`
**Ação:** `present_improvements`

**Prompt:**
```
Apresente o resultado:
1. Mostre versão melhorada
2. Destaque principais mudanças
3. Explique razões das alterações
4. Ofereça alternativas quando relevante
```
**Entrada:** `original_text`, `refined_text`, `diagnosis`
**Saída:** `improved_document`

## Saídas do Workflow

- **improved_document:** `_adks/_docs/04-writing/improved-text.md` (md)

## Próximos Workflows

- `review-logic`
- `audit-citations`

---
**Tags:** `phase-4` `writing` `improvement` `editing` `clarity`

---
*Compilado pelo AD-KS Compiler v1.0*
*Fonte: improve-text.workflow.yaml*