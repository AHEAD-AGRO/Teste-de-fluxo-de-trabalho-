# Como começar (guia para novos integrantes)

Guia passo a passo para alguém entrar no projeto, instalar tudo e trabalhar
**sem sobrescrever o código de ninguém**.

---

## Parte 1 — Instalar os programas (uma vez)

1. **Git** → https://git-scm.com/download/win
2. **Node.js (LTS)** → https://nodejs.org (ou `winget install OpenJS.NodeJS.LTS`)
3. **VS Code** → https://code.visualstudio.com
4. Ter uma **conta no GitHub** com acesso ao repositório (peça a um owner).

> Depois de instalar o Node, **feche e reabra** o VS Code/terminal para o
> comando `node` funcionar.

---

## Parte 2 — Baixar o projeto (uma vez)

```bash
# escolha uma pasta, ex: C:\Users\SEU-USUARIO\Projetos
git clone https://github.com/AHEAD-AGRO/Teste-de-fluxo-de-trabalho-.git
cd Teste-de-fluxo-de-trabalho-

# instalar as dependências
npm install
```

> Se aparecer aviso sobre "install scripts" do esbuild (npm 11+):
> `npm approve-scripts esbuild` e depois `npm rebuild esbuild`.

### Configurar o ambiente
```bash
# copie o modelo e preencha as chaves do Supabase de teste
cp .env.example .env
```
Peça as chaves do Supabase de **teste** para quem já tem (elas não vão no Git).
Preencha no `.env`: `TEST_SUPABASE_URL`, `TEST_SUPABASE_ANON_KEY`,
`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`.

### Rodar
```bash
npm run dev     # abre a tela em http://localhost:5173
npm test        # roda os testes
```

---

## Parte 3 — O jeito de trabalhar (NÃO sobrescrever código)

Esta é a parte mais importante. **Nunca trabalhe direto na `main` ou `develop`.**

### O ciclo de toda mudança

```bash
# 1. Sempre comece pegando a versão mais recente da develop
git checkout develop
git pull

# 2. Crie uma branch só sua para a tarefa
git checkout -b feature/nome-da-sua-tarefa

# 3. Trabalhe, salve e suba
git add .
git commit -m "Descrição do que você fez"
git push -u origin feature/nome-da-sua-tarefa
```

4. No GitHub, abra um **Pull Request** da sua branch para a `develop`.
5. O **CI roda sozinho** (testes). Se falhar, corrija antes de continuar.
6. **A outra pessoa revisa e aprova** (você não pode aprovar o próprio PR).
7. Com CI verde + aprovação → **Merge** na `develop`.

### Por que isso evita sobrescrever

- Cada um trabalha na **sua branch** → não mexe na do outro.
- O merge só entra via **PR revisado** → nada passa por cima sem alguém ver.
- Se duas pessoas mexerem na mesma linha, o Git **avisa o conflito** e obriga
  a resolver antes de mesclar (ninguém apaga o trabalho do outro em silêncio).

### Se aparecer um conflito
```bash
git checkout feature/sua-branch
git pull origin develop     # traz o que mudou na develop
# o Git marca os arquivos em conflito; edite escolhendo o que fica
git add .
git commit
git push
```
No VS Code, os conflitos aparecem destacados com botões
"Accept Current / Accept Incoming / Accept Both" — é só escolher.

---

## Regra de ouro

> **Antes de começar o dia:** `git pull` na develop.
> **Para cada tarefa:** uma branch nova.
> **Para entrar na develop/main:** sempre via Pull Request revisado.
