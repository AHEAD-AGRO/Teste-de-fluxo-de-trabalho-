# Teste de fluxo de trabalho

Laboratório para **validar o fluxo de trabalho compartilhado** da equipe antes
de aplicá-lo no projeto principal (aheadplan). Usa **Supabase** como backend
simulado — apenas para exercitar funções e fluxos, sem precisar de dados reais.

O que está sendo testado aqui:
- Trabalho em conjunto sem **sobrepor código** (merges e conflitos)
- Um ambiente de **teste** e um de **produção** separados
- **CI** (checagem + testes) obrigatório antes do merge
- Revisão de código obrigatória via **CODEOWNERS**

## Stack

- **Node + TypeScript** (mesma stack do projeto principal)
- **Supabase** (`@supabase/supabase-js`) como backend
- **Vitest** para testes

## Como rodar localmente

```bash
# 1. Instalar dependências
npm install

# 2. Configurar o ambiente
cp .env.example .env      # depois preencha as chaves do Supabase

# 3. Rodar a demonstração
npm run dev

# 4. Rodar os testes
npm test
```

> Sem preencher o `.env`, os testes (`npm test`) já funcionam, porque testam
> as funções puras. O `npm run dev` só precisa das chaves quando for conectar
> no Supabase de verdade.

## Estrutura

```
src/
  config/env.ts               escolhe o ambiente (teste/produção)
  lib/supabaseClient.ts       conexão com o Supabase
  services/taskUtils.ts       funções puras (testadas no CI)
  services/tasksRepository.ts funções que usam o banco
  index.ts                    demonstração
tests/                        testes (Vitest)
supabase/migrations/          estrutura do banco (SQL)
scripts/                      deploy de teste e produção
.github/                      CI, CODEOWNERS, template de PR
docs/FLUXO-DE-TRABALHO.md     👉 o guia completo do fluxo
```

## 📖 Leia primeiro

O passo a passo de como trabalhar (branches, PR, ambientes, proteção) está em
**[docs/FLUXO-DE-TRABALHO.md](docs/FLUXO-DE-TRABALHO.md)**.
