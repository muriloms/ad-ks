# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [0.1.0-alpha.1] - 2026-01-21

### Adicionado

#### Infraestrutura (Etapas 1-3)
- Estrutura inicial do pacote NPM
- CLI com Commander.js (`adks install`, `adks status`, `adks help`)
- Wrapper NPX para execução direta
- Sistema de comandos modular

#### Validação (Etapa 4)
- Schema Zod para agentes, workflows e módulos
- Script de validação (`npm run validate`)
- Testes unitários com Vitest

#### Core (Etapas 5-6)
- ADKS Master - agente orquestrador principal
- Workflow de inicialização com 8 opções
- Compilador YAML→MD com watch mode

#### Agentes ARM (Etapas 7-9) - 28 agentes
- **Team Builder (3)**: context-analyst, agent-builder, domain-expert
- **Team Ideation (5)**: idea-facilitator, question-architect, hypothesis-builder, gap-identifier, vision-synthesizer
- **Team Rigor (4)**: method-validator, logic-checker, citation-auditor, bias-detector
- **Team Literature (4)**: literature-curator, theory-connector, synthesis-writer, reference-manager
- **Team Methodology (4)**: method-architect, procedure-designer, data-strategist, feasibility-expert
- **Team Writing (5)**: academic-writer, structure-designer, style-guardian, latex-specialist, presentation-expert
- **Team Planning (3)**: project-planner, progress-tracker, task-coordinator

#### Workflows ARM (Etapas 10-11) - 23 workflows
- **Fase 1 (5)**: explore-idea, define-topic, research-question, define-objectives, build-hypothesis
- **Fase 2 (4)**: analyze-references, build-framework, identify-gaps, write-review
- **Fase 3 (4)**: design-method, define-procedures, data-strategy, validate-method
- **Fase 4 (3)**: plan-structure, write-section, improve-text
- **Fase 5 (3)**: review-logic, audit-citations, detect-bias
- **Fase 6 (4)**: format-document, create-presentation, final-checklist, prepare-submission

#### Instalação (Etapa 12)
- Comando `install` funcional
- Templates de configuração
- Criação automática de estrutura
- Documentação completa

### Estatísticas

| Componente | Quantidade |
|------------|------------|
| Agentes | 29 (1 Core + 28 ARM) |
| Workflows | 24 (1 Core + 23 ARM) |
| Equipes | 7 |
| Fases | 6 |

### Corrigido
- Erro de validação em custom_prompts (array → string)
- Permissões de executáveis via postinstall
- Dependências depreciadas (Jest → Vitest)
