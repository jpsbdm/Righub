# DEPLOY.md - Estratégia de Deploy e Infraestrutura

Este documento registra todas as decisões de infraestrutura, serviços de terceiros e procedimentos de deploy do projeto **RIGHUB**.

---

## 🚀 Resumo da Stack de Infraestrutura

| Componente | Provedor | Plano | Notas |
| :--- | :--- | :--- | :--- |
| **Hospedagem (App)** | Vercel | Free (Hobby) | Escalável para Pro conforme necessidade. |
| **Banco de Dados** | Neon | Free Tier | PostgreSQL Serverless com suporte a branching. |
| **Autenticação** | Lucia Auth | - | Rodando no próprio servidor (Self-hosted). |
| **Storage (Mídia)** | Cloudflare R2 | Free / Pay-as-you-go | S3-compatible, focado em baixo custo de egress. |
| **Background Jobs** | Trigger.dev | Free | Para processamentos assíncronos e crons. |

---

## 🛠️ Detalhes de Configuração

### 1. Banco de Dados (Neon)
*   **Decisão:** PostgreSQL via Neon para aproveitar o branching e escalabilidade serverless.
*   **Acesso:** Via Drizzle ORM.
*   **Variáveis:** `DATABASE_URL` no `.env`.

### 2. Autenticação (Lucia Auth)
*   **Decisão:** Uso do Lucia v3 para total controle dos dados de usuário e custo zero de MAU (Monthly Active Users).
*   **Armazenamento:** Tabelas `user` e `session` no Postgres.

### 3. Storage de Mídia (Cloudflare R2)
*   **Decisão:** Cloudflare R2 devido ao custo zero de saída de dados (egress), essencial para uma plataforma com muitas fotos de veículos.
*   **Estratégia de Upload:** **Presigned URLs**. O cliente (browser) solicita uma URL temporária ao servidor e faz o upload diretamente para o R2, evitando o limite de timeout da Vercel (10s).
*   **Acesso:** CDN via domínio customizado ou R2.dev (inicialmente).

### 4. Deploy na Vercel
*   **Framework:** Next.js (App Router).
*   **Regiões:** `Washington, D.C., USA (iad1)` - Próximo aos servidores da Neon para menor latência.

---

## 📝 Passo a Passo para Novos Membros

1.  **Clone o repo** e instale as dependências: `npm install`.
2.  **Variáveis de Ambiente:** Copie `.env.example` para `.env` e preencha as chaves.
3.  **Database Push:** Execute `npm run db:push` para sincronizar o schema.
4.  **Dev Server:** `npm run dev`.

---

*Última atualização: 11/04/2026*
