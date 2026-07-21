/**
 * Funções PURAS (sem banco de dados).
 *
 * Ficam separadas de propósito: são fáceis de testar no CI sem precisar
 * de chaves do Supabase, e são um ótimo lugar para praticar merges —
 * duas pessoas editando funções diferentes daqui não geram conflito.
 */

export interface Task {
  id?: number;
  title: string;
  done: boolean;
}

/** Remove espaços sobrando e normaliza o título. */
export function normalizeTitle(title: string): string {
  return title.trim().replace(/\s+/g, ' ');
}

/** Conta quantas tarefas estão concluídas e quantas estão pendentes. */
export function summarize(tasks: Task[]): { total: number; done: number; pending: number } {
  const done = tasks.filter((t) => t.done).length;
  return { total: tasks.length, done, pending: tasks.length - done };
}

/** [Renan] Retorna só as tarefas pendentes (não concluídas). */
export function filterPending(tasks: Task[]): Task[] {
  return tasks.filter((t) => !t.done);
}
