# Supabase — banco de teste e de produção

Esta pasta guarda as **migrations** (mudanças de estrutura do banco) em SQL.
A regra de ouro: **toda mudança no banco vira um arquivo aqui** e é aplicada
nos dois ambientes — nunca altere o banco só pelo painel sem registrar.

## Os dois ambientes

| Ambiente   | Projeto Supabase        | Ligado à branch |
|------------|-------------------------|-----------------|
| Teste      | projeto "…-teste"       | `develop`       |
| Produção   | projeto "…-producao"    | `main`          |

## Como aplicar as migrations

Você pode aplicar de dois jeitos:

**1. Rápido (painel do Supabase):**
- Abra o projeto no site do Supabase → **SQL Editor**
- Cole o conteúdo do arquivo `.sql` e clique em **Run**
- Faça isso no projeto de **teste** e depois no de **produção**

**2. Recomendado (Supabase CLI):**
```bash
# instalar uma vez
npm install -g supabase

# aplicar as migrations no projeto ativo
supabase db push
```

## Criando uma nova migration

Crie um arquivo novo com data na frente para manter a ordem, por exemplo:
`20260721101500_adiciona_coluna_prioridade.sql`
