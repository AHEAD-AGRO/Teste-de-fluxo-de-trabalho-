import { supabase } from '../lib/supabaseClient';
import { normalizeTitle, type Task } from './taskUtils';

/**
 * Funções que falam com o Supabase (o backend simulado).
 * A tabela `tasks` é criada pela migration em supabase/migrations.
 */

/** Cria uma nova tarefa no ambiente ativo. */
export async function createTask(title: string): Promise<Task> {
  const { data, error } = await supabase
    .from('tasks')
    .insert({ title: normalizeTitle(title), done: false })
    .select()
    .single();

  if (error) throw error;
  return data as Task;
}

/** Lista todas as tarefas do ambiente ativo. */
export async function listTasks(): Promise<Task[]> {
  const { data, error } = await supabase.from('tasks').select('*').order('id');

  if (error) throw error;
  return (data ?? []) as Task[];
}
