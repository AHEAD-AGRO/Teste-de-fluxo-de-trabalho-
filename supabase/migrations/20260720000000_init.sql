-- ==========================================================================
-- Migration inicial.
-- Cria a tabela de exemplo usada para testar o fluxo de trabalho.
-- Rode a MESMA migration nos dois projetos (teste e produção) para
-- manter os dois ambientes com a mesma estrutura.
-- ==========================================================================

create table if not exists public.tasks (
  id          bigint generated always as identity primary key,
  title       text not null,
  done        boolean not null default false,
  created_at  timestamptz not null default now()
);
