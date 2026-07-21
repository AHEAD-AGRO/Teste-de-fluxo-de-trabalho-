# Runbook de setup — PARA O CLAUDE EXECUTAR

> **Este arquivo é para o Claude Code (do Renan) ler e executar.**
> Objetivo: preparar a máquina do Renan para trabalhar neste projeto, fazendo
> **automaticamente** tudo que for possível e **parando para pedir ao Renan**
> apenas o que exige uma pessoa (logins em navegador, chaves secretas).
>
> Legenda:
> - 🤖 **[AUTO]** = o Claude pode fazer sozinho
> - 🙋 **[RENAN]** = precisa de uma ação humana; pare e peça

---

## Contexto do projeto (para o Claude entender)

- **Repositório (público):** https://github.com/AHEAD-AGRO/Teste-de-fluxo-de-trabalho-
- **Stack:** Node + TypeScript + Vite (tela web) + Supabase (backend simulado).
- **Propósito:** laboratório para praticar o fluxo de trabalho antes de aplicar
  no projeto principal. Supabase é só um backend de teste com dados falsos.
- **Fluxo de branches:** `feature/*` → PR → `develop` (teste) → PR → `main` (produção).
  As branches `main` e `develop` são **protegidas**: só recebem código via Pull
  Request aprovado. Push direto é bloqueado.

---

## Passos (executar em ordem)

### 1. 🤖 [AUTO] Verificar pré-requisitos
- Rode `git --version` e `node --version`.
- Se o **Node** não existir, instale:
  - Windows: `winget install OpenJS.NodeJS.LTS --accept-source-agreements --accept-package-agreements --silent`
- ⚠️ Observação: logo após instalar o Node, o PATH pode não atualizar na sessão
  atual. Se `node`/`npm` "não for reconhecido", prefixe o caminho na sessão:
  no PowerShell, `$env:PATH = "C:\Program Files\nodejs;" + $env:PATH`.

### 2. 🤖 [AUTO] Clonar o repositório
- O repositório é **público**, então o clone **não precisa de login**.
- Escolha uma pasta de projetos (ex.: `C:\Users\<usuario>\Projetos`) e rode:
  ```bash
  git clone https://github.com/AHEAD-AGRO/Teste-de-fluxo-de-trabalho-.git
  cd Teste-de-fluxo-de-trabalho-
  ```

### 3. 🤖 [AUTO] Instalar dependências
- Rode `npm install`.
- Se o npm 11+ bloquear scripts de instalação (aviso sobre `esbuild`):
  ```bash
  npm approve-scripts esbuild
  npm rebuild esbuild
  ```

### 4. 🙋 [RENAN] Chaves do Supabase (arquivo .env)
- Copie o modelo: `cp .env.example .env` (o `.env` não vem no Git, é secreto).
- **Pare e peça ao Renan** as chaves do Supabase de **teste** (a Evelyn tem):
  `TEST_SUPABASE_URL`, `TEST_SUPABASE_ANON_KEY`, e também `VITE_SUPABASE_URL`,
  `VITE_SUPABASE_ANON_KEY` (podem ser os mesmos valores do de teste).
- Preencha o `.env` com o que o Renan fornecer.
- Sem as chaves, o app não conecta no banco — mas `npm test` já funciona
  (os testes são de funções puras).

### 5. 🤖 [AUTO] Validar a instalação
- `npm test` → devem passar todos os testes.
- `npm run typecheck` → sem erros.
- `npm run dev` → abre a tela em http://localhost:5173 (só conecta no banco se o
  `.env` estiver preenchido).

### 6. 🙋 [RENAN] Identidade e login do Git
- Configure a identidade dos commits (**pergunte ao Renan** o nome e e-mail):
  ```bash
  git config --global user.name "Nome do Renan"
  git config --global user.email "email-do-renan@aheadagro.com.br"
  ```
- ⚠️ O **primeiro `git push`** vai abrir o **navegador** para o Renan logar no
  GitHub (conta `gitaheadsolutions`). **Isso é um passo humano** — o Claude não
  faz login em navegador. Avise o Renan para completar esse login quando pedir.

### 7. ℹ️ Como trabalhar (explicar ao Renan e seguir sempre)
```bash
git checkout develop
git pull                                  # pega o mais recente
git checkout -b feature/nome-da-tarefa    # branch própria
# ... editar, salvar ...
git add .
git commit -m "Descrição do que foi feito"
git push -u origin feature/nome-da-tarefa
```
Depois: abrir Pull Request para `develop` no GitHub, aguardar o CI passar e a
revisão da Evelyn aprovar, então mesclar.

---

## Regras que o Claude DEVE respeitar

1. **Nunca** commitar ou dar push direto em `main` ou `develop` (são protegidas;
   use sempre uma branch `feature/*` + Pull Request).
2. **Nunca** colocar chaves/segredos no código; segredos só no `.env` (gitignored).
3. Antes de criar uma branch, **sempre** `git pull` na `develop`.
4. **Pare e peça ao Renan** em todo passo marcado 🙋 [RENAN] — não invente
   chaves nem tente logins de navegador.
5. Se aparecer **conflito** de merge, traga a `develop` (`git pull origin develop`),
   resolva os arquivos marcados e faça commit — nunca descarte o trabalho do outro.

---

## Referências no próprio projeto
- `docs/COMO-COMECAR.md` — guia de instalação para humanos.
- `docs/FLUXO-DE-TRABALHO.md` — explicação completa do fluxo e dos ambientes.
- `README.md` — visão geral.
