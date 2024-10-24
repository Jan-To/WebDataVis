import { writable } from 'svelte/store';

export const runPythonStore = createRunCounter();

function createRunCounter() {
  const { subscribe, set, update } = writable(0);

  return {
      subscribe,
      set,
      update,
      run: () => update(n => n + 1 % Number.MAX_SAFE_INTEGER)
  };
}