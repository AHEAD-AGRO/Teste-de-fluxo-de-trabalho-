#!/usr/bin/env bash
# ==========================================================================
# Deploy para o ambiente de TESTE (staging).
# Rodado automaticamente pelo GitHub Actions quando algo entra em `develop`.
# Por enquanto é um esqueleto: troque os comandos pelos do deploy real.
# ==========================================================================
set -euo pipefail

echo "🚀 Iniciando deploy para o ambiente de TESTE..."

export APP_ENV=test

# Exemplo de passos (descomente/adapte conforme o projeto real):
# npm ci
# npm run typecheck
# npm test
# supabase db push        # aplica migrations no Supabase de teste
# npm run build && ...    # publica a aplicação

echo "✅ Deploy de TESTE concluído."
