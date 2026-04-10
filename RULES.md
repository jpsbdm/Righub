# RULES.md

## 📜 Propósito
Este documento define **regras e convenções comuns** que todos os agentes (scripts, sub‑agentes, workflows) do projeto **RIGHUB** devem seguir. Ele serve como contrato de colaboração, garantindo consistência, qualidade e alinhamento com a estratégia de desenvolvimento orientada a testes.

---

## ✅ Fluxo de Trabalho para Tarefas
1. **Leitura e Extração** – Sempre comece lendo a especificação (ex.: `INICIO.md`) e extraindo **tarefas** para `TASKS.md`.
2. **Planejamento de Testes** – Antes de escrever qualquer código, crie ou atualize `TEST.md` listando **todos os testes** necessários (unit, integração, E2E, performance, segurança, acessibilidade).
3. **Implementação** – Desenvolva a funcionalidade **apenas** após os testes estarem definidos. Cada mudança deve ser acompanhada por testes correspondentes.
4. **Validação** – Execute a suíte de testes. Se algum falhar, corrija antes de prosseguir.
5. **Movimentação de Tarefas** – Quando a implementação for concluída e os testes passarem, **mova a tarefa** de `TASKS.md` para `DONE.md`, mantendo a mesma categoria (Backend, Frontend, DevOps, etc.).
6. **Documentação** – Atualize a documentação relevante (README, API docs, UI specs) antes de fechar a tarefa.

---

## 🎨 Diretrizes de Design (Frontend)
- **Estética Premium** – Use paletas de cores harmoniosas, tipografia Google Fonts (ex.: *Inter*), gradientes suaves e micro‑animações.
- **Responsividade** – Todos os componentes devem funcionar em desktop, tablet e mobile.
- **Acessibilidade** – Conformidade WCAG AA; use `aria-*` e teste com axe‑core.
- **Componentização** – Crie componentes reutilizáveis via `shadcn/ui` e siga o design‑system definido em `src/design`.

---

## 🛠️ Convenções de Código
- **TypeScript** – Estrito (`strict: true`).
- **Lint/Format** – ESLint + Prettier; falhas de lint impedem merge.
- **Arquitetura Modular** – Cada domínio (`core-platform`, `garage`, `community-social`, …) tem sua própria camada de *entities*, *use‑cases*, *repositories* e *routes*.
- **Naming** – Use `PascalCase` para classes/entidades, `camelCase` para funções/variáveis, `kebab-case` para arquivos.
- **Commit Messages** – Prefixo `[feat]`, `[fix]`, `[test]`, `[docs]`, `[chore]` seguido de descrição curta.

---

## 📦 Estrutura de Agentes Separados
```
Righub/
├─ agents/                 # Agentes / sub‑agentes
│   ├─ core/               # Lógica de negócio central
│   ├─ garage/             # Agente responsável pelo módulo garage
│   ├─ community/          # Agente para social & forum
│   └─ utils/              # Utilitários compartilhados
├─ workflows/              # Arquivos .md com passos de execução
│   └─ deploy.md
├─ src/                    # Código fonte da aplicação (Next.js)
├─ tests/                  # Testes automatizados
├─ RULES.md                # ← Este arquivo
├─ TASKS.md
├─ DONE.md
└─ TEST.md
```
- Cada sub‑pasta em `agents/` contém **scripts**, **workflows** e **configurações** específicas ao domínio.
- Todos os agentes importam as **regras comuns** de `RULES.md` (ex.: via comentário de cabeçalho ou leitura programática) para garantir que o fluxo de trabalho acima seja seguido.

---

## 🔧 Integração com Workflows
- Nos arquivos de workflow (`*.md` em `workflows/`) inclua a anotação `// turbo` ou `// turbo-all` quando for seguro auto‑executar passos de comando.
- Cada passo que envolve `run_command` deve ter `SafeToAutoRun: true` **apenas** se a anotação estiver presente.
- Use a seção **"Passos"** para descrever claramente o que o agente deve fazer, incluindo:
  1. Verificar pré‑requisitos.
  2. Executar comando.
  3. Capturar saída e validar.
  4. Atualizar arquivos de tarefa (`TASKS.md` / `DONE.md`).

---

## 📚 Referência Rápida
- **Test‑First** – Sempre escreva/atualize testes antes de código.
- **Move‑Task** – Quando concluído, mova a linha da tarefa de `TASKS.md` para `DONE.md`.
- **Design Premium** – Não aceite UI “básica”; siga as diretrizes de estética.
- **Agent Compliance** – Qualquer agente que não respeite estas regras será sinalizado por lint/CI.

---

*Este arquivo deve ser versionado e revisado periodicamente para refletir mudanças de processo ou tecnologia.*
