# 🎓 AD-KS - Academic Knowledge System

[![npm version](https://img.shields.io/npm/v/ad-ks.svg)](https://www.npmjs.com/package/ad-ks)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org)

> Framework multi-agente para suporte à pesquisa acadêmica

O **AD-KS (Agent-Driven Knowledge System)** utiliza múltiplos agentes de IA especializados para auxiliar pesquisadores em todas as fases do processo de pesquisa acadêmica.

## ✨ Características

- 🤖 **29 agentes especializados** organizados em 7 equipes
- 📋 **24 workflows** cobrindo 6 fases da pesquisa
- 🌍 **Multilíngue**: Português, Inglês e Espanhol
- 🔧 **Customizável**: Adapte os agentes à sua área
- 💾 **Memória persistente**: Contexto do projeto mantido

## 🚀 Instalação Rápida

```bash
npx ad-ks install
```

Ou instalação global:

```bash
npm install -g ad-ks
adks install
```

## 👥 Equipes de Agentes

| Equipe | Agentes | Especialidade |
|--------|---------|---------------|
| 🏗️ **Team Builder** | 3 | Personalização de agentes para sua área |
| 💡 **Team Ideation** | 5 | Exploração de ideias e formulação |
| 🔬 **Team Rigor** | 4 | Validação e rigor científico |
| 📚 **Team Literature** | 4 | Revisão e síntese da literatura |
| 🔧 **Team Methodology** | 4 | Design metodológico |
| ✍️ **Team Writing** | 5 | Escrita acadêmica e formatação |
| 📅 **Team Planning** | 3 | Planejamento e gestão |

## 📋 Fases do Projeto

```
Fase 1: Exploração e Definição
   ↓ explore-idea → define-topic → research-question → define-objectives
Fase 2: Revisão da Literatura  
   ↓ analyze-references → build-framework → identify-gaps → write-review
Fase 3: Metodologia
   ↓ design-method → define-procedures → data-strategy → validate-method
Fase 4: Escrita e Estruturação
   ↓ plan-structure → write-section → improve-text
Fase 5: Revisão e Validação
   ↓ review-logic → audit-citations → detect-bias
Fase 6: Finalização
   ↓ format-document → create-presentation → final-checklist → prepare-submission
```

## 🎯 Comandos Principais

| Comando | Descrição |
|---------|-----------|
| `*help` | Ver todos os comandos |
| `*workflow-init` | Iniciar um workflow |
| `*status` | Ver status do projeto |
| `*list-agents` | Listar agentes |
| `*list-workflows` | Listar workflows |
| `*team <nome>` | Ir para uma equipe |

## 📁 Estrutura Criada

```
seu-projeto/
├── CLAUDE.md              # Arquivo principal para o Claude
└── _adks/
    ├── _config/           # Configurações
    ├── _memory/           # Memória dos agentes
    ├── _docs/             # Documentos gerados
    │   ├── 01-exploration/
    │   ├── 02-literature/
    │   ├── 03-methodology/
    │   ├── 04-writing/
    │   ├── 05-review/
    │   └── 06-final/
    ├── _customizations/   # Customizações
    └── _uploads/          # Seus arquivos
```

## 🛠️ CLI

```bash
adks install    # Instalar AD-KS
adks status     # Ver status
adks help       # Ajuda
```

## 🔧 Desenvolvimento

```bash
npm install          # Instalar dependências
npm run validate     # Validar schemas
npm run compile      # Compilar YAML → MD
npm test             # Rodar testes
```

## 📊 Estatísticas

| Componente | Quantidade |
|------------|------------|
| Agentes | 29 |
| Workflows | 24 |
| Equipes | 7 |
| Fases | 6 |

## 📄 Licença

MIT © 2024-2025

---

**Desenvolvido com ❤️ para pesquisadores acadêmicos**
