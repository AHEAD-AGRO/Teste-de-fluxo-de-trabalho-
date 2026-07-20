# Fluxo de trabalho compartilhado

Este documento descreve **como as duas pessoas trabalham juntas** neste
repositório sem sobrepor código, com um ambiente de **teste** e um de
**produção**. A ideia é validar tudo aqui e depois replicar no projeto principal.

---

## 1. As branches

| Branch      | Para quê serve            | Ambiente ligado   | Protegida? |
|-------------|---------------------------|-------------------|------------|
| `main`      | Código estável, "no ar"   | **Produção**      | ✅ Sim     |
| `develop`   | Integração / homologação  | **Teste**         | ✅ Sim     |
| `feature/*` | Trabalho do dia a dia     | —                 | ❌ Não     |

Regra: **ninguém commita direto na `main` nem na `develop`.** Toda mudança
entra por um Pull Request.

---

## 2. O ciclo de uma mudança (passo a passo)

```bash
# 1. Sempre parta da develop atualizada
git checkout develop
git pull

# 2. Crie uma branch para a sua tarefa
git checkout -b feature/minha-tarefa

# 3. Trabalhe, salve e suba
git add .
git commit -m "Descrição do que fiz"
git push -u origin feature/minha-tarefa
```

4. No GitHub, abra um **Pull Request** da sua `feature/...` para a `develop`.
5. O **CI roda sozinho** (typecheck + testes). Se falhar, o merge fica bloqueado.
6. A **outra pessoa revisa** (o CODEOWNERS chama quem é dona daquela parte).
7. Com CI verde + aprovação → **merge na `develop`** → publica no ambiente de **teste**.
8. Quando o teste estiver ok, abre um PR de **`develop` → `main`** → após revisão,
   vai para **produção**.

---

## 3. Por que o código não se sobrepõe

- O **Git** já impede sobrescrita silenciosa: se as duas mexerem na mesma linha,
  ele gera um **conflito** e obriga alguém a resolver antes do merge.
- A regra de **PR + revisão obrigatória** garante que ninguém empurra por cima
  do trabalho da outra sem passar por revisão.
- O **CI obrigatório** bloqueia o merge se algum teste quebrar.

### Resolvendo um conflito (quando aparecer)
```bash
git checkout feature/minha-tarefa
git pull origin develop      # traz o que mudou na develop
# o Git aponta os arquivos em conflito; edite escolhendo o que fica
git add .
git commit
git push
```

---

## 4. Os dois ambientes

- **Teste**: projeto Supabase separado, ligado à `develop`. É onde você
  experimenta sem medo — dados podem ser apagados/recriados à vontade.
- **Produção**: projeto Supabase separado, ligado à `main`. Só recebe o que
  já passou pelo teste.

A escolha do ambiente é feita pela variável `APP_ENV` (`test` ou `production`)
no arquivo `.env`. Veja `.env.example`.

---

## 5. O que precisa ser configurado no GitHub (uma vez)

Estes passos são feitos no site, em **Settings** do repositório:

### a) Proteção da branch `main` e `develop`
Em **Settings → Branches → Add branch protection rule**, para cada uma:
- ✅ Require a pull request before merging
- ✅ Require approvals (mínimo **1**)
- ✅ Require review from Code Owners
- ✅ Require status checks to pass → selecionar o check **CI**
- ✅ Require branches to be up to date before merging
- ✅ Do not allow bypassing the above settings

### b) Ambientes (Environments)
Em **Settings → Environments**, crie **staging** e **production**:
- Em cada um, guarde as chaves do Supabase correspondente como **secrets**
  (`SUPABASE_URL`, `SUPABASE_ANON_KEY`).
- No **production**, marque **Required reviewers** para exigir aprovação
  manual antes de publicar.

---

## 6. Resumo em uma frase

> Trabalha em `feature/*` → PR para `develop` (testa) → PR para `main` (produção),
> sempre com CI verde e revisão da outra pessoa.
