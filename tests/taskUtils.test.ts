import { describe, it, expect } from 'vitest';
import { normalizeTitle, summarize } from '../src/services/taskUtils';

describe('normalizeTitle', () => {
  it('remove espaços extras nas pontas e no meio', () => {
    expect(normalizeTitle('  comprar   leite ')).toBe('comprar leite');
  });

  it('mantém um título já normalizado', () => {
    expect(normalizeTitle('testar merge')).toBe('testar merge');
  });
});

describe('summarize', () => {
  it('conta tarefas concluídas e pendentes', () => {
    const resultado = summarize([
      { title: 'a', done: true },
      { title: 'b', done: false },
      { title: 'c', done: false },
    ]);
    expect(resultado).toEqual({ total: 3, done: 1, pending: 2 });
  });

  it('lida com lista vazia', () => {
    expect(summarize([])).toEqual({ total: 0, done: 0, pending: 0 });
  });
});
