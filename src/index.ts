import config from './config/env';
import { normalizeTitle, summarize, type Task } from './services/taskUtils';

/**
 * Pequena demonstração que roda com `npm run dev`.
 * Mostra qual ambiente está ativo e exercita as funções puras.
 * (Só conecta no Supabase de verdade quando você preencher o .env.)
 */
function main(): void {
  console.log(`🌎 Ambiente ativo: ${config.appEnv.toUpperCase()}`);
  console.log(`🔗 Supabase URL:  ${config.supabaseUrl}`);

  const tarefas: Task[] = [
    { title: normalizeTitle('  estudar   git '), done: true },
    { title: 'testar merge', done: false },
    { title: 'configurar ambiente de teste', done: false },
  ];

  console.log('\n📋 Tarefas:', tarefas.map((t) => t.title));
  console.log('📊 Resumo:', summarize(tarefas));
}

main();
