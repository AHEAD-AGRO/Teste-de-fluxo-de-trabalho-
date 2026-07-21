import { createClient } from '@supabase/supabase-js';

// Conexão com o Supabase (usa as variáveis VITE_ do arquivo .env).
// A chave "publishable" pode ficar no navegador — é pública por natureza.
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

interface Task {
  id: number;
  title: string;
  done: boolean;
}

// Elementos da tela
const form = document.querySelector<HTMLFormElement>('#new-task-form')!;
const input = document.querySelector<HTMLInputElement>('#task-title')!;
const list = document.querySelector<HTMLUListElement>('#task-list')!;
const status = document.querySelector<HTMLParagraphElement>('#status')!;

/** Busca as tarefas no banco e desenha na tela. */
async function carregar(): Promise<void> {
  const { data, error } = await supabase.from('tasks').select('*').order('id');
  if (error) {
    status.textContent = `Erro ao carregar: ${error.message}`;
    return;
  }
  desenhar((data ?? []) as Task[]);
}

/** Monta a lista visual a partir das tarefas. */
function desenhar(tarefas: Task[]): void {
  list.innerHTML = '';

  if (tarefas.length === 0) {
    const vazio = document.createElement('li');
    vazio.className = 'empty';
    vazio.textContent = 'Nenhuma tarefa ainda. Adicione a primeira! 👆';
    list.appendChild(vazio);
  }

  for (const tarefa of tarefas) {
    const li = document.createElement('li');
    li.className = tarefa.done ? 'done' : '';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = tarefa.done;
    checkbox.addEventListener('change', () => alternar(tarefa));

    const texto = document.createElement('span');
    texto.textContent = tarefa.title;

    li.append(checkbox, texto);
    list.appendChild(li);
  }

  status.textContent = `${tarefas.length} tarefa(s)`;
}

/** Marca/desmarca uma tarefa como concluída. */
async function alternar(tarefa: Task): Promise<void> {
  await supabase.from('tasks').update({ done: !tarefa.done }).eq('id', tarefa.id);
  carregar();
}

// Adicionar nova tarefa
form.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  const titulo = input.value.trim();
  if (!titulo) return;

  const { error } = await supabase.from('tasks').insert({ title: titulo, done: false });
  if (error) {
    status.textContent = `Erro ao adicionar: ${error.message}`;
    return;
  }
  input.value = '';
  carregar();
});

// Primeira carga
carregar();
