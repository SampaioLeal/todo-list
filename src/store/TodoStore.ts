import { makeAutoObservable } from "mobx";

export interface TodoTask {
  id?: number;
  titulo: string;
  descricao: string;
  feito: boolean;
}

class TodoStore {
  constructor() {
    makeAutoObservable(this);
  }

  todos: TodoTask[] = [];

  addTodo(todo: TodoTask) {
    const newID = (this.todos[this.todos.length - 1]?.id || 0) + 1;

    this.todos.push({ ...todo, id: newID });
  }
}

const store = new TodoStore();

export default function useStore() {
  return store;
}
