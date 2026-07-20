#!/usr/bin/env bash
# ==========================================================================
# Deploy para o ambiente de PRODUÇÃO.
# Rodado automaticamente pelo GitHub Actions quando algo entra em `main`.
# Por enquanto é um esqueleto: troque os comandos pelos do deploy real.
# ==========================================================================
set -euo pipefail

echo "🚀 Iniciando deploy para o ambiente de PRODUÇÃO..."

export APP_ENV=production

# Exemplo de passos (descomente/adapte conforme o projeto real):
# npm ci
# npm run typecheck
# npm test
# supabase db push        # aplica migrations no Supabase de produção
# npm run build && ...    # publica a aplicação

echo "✅ Deploy de PRODUÇÃO concluído."
