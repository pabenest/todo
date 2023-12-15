import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TodoStore {
  todos: string[];
  addTodo: (todo: string) => void;
}

export const useTodoStore = create<TodoStore>()((set, get) => ({
    todos: [],
    addTodo: (todo) => set({ todos: [...get().todos, todo] }),
  }));
