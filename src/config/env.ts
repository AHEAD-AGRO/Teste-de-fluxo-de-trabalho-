import 'dotenv/config';

/**
 * Configuração de ambiente.
 *
 * O mesmo código roda em dois ambientes, escolhidos pela variável APP_ENV:
 *   - "test"       -> usa o projeto Supabase de TESTE
 *   - "production" -> usa o projeto Supabase de PRODUÇÃO
 *
 * Assim, testar e produzir usam bancos separados e nunca se misturam.
 */
export type AppEnv = 'test' | 'production';

const appEnv = (process.env.APP_ENV ?? 'test') as AppEnv;

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Variável de ambiente ausente: ${name}. ` +
        `Copie o arquivo .env.example para .env e preencha as chaves.`,
    );
  }
  return value;
}

const isProd = appEnv === 'production';

export const config = {
  appEnv,
  isProd,
  supabaseUrl: required(isProd ? 'PROD_SUPABASE_URL' : 'TEST_SUPABASE_URL'),
  supabaseAnonKey: required(isProd ? 'PROD_SUPABASE_ANON_KEY' : 'TEST_SUPABASE_ANON_KEY'),
};

export default config;
