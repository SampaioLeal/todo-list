import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";

export interface TodoTask {
  id?: number;
  titulo: string;
  descricao: string;
  feito: boolean;
}

class TodoStore {
  todos: TodoTask[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addTodo(todo: TodoTask) {
    const newTodos = [...this.todos];
    const newID = (newTodos[this.todos.length - 1]?.id || 0) + 1;

    newTodos.push({ ...todo, id: newID });
    this.todos = newTodos;
  }

  editTodo(todo: TodoTask) {
    const newTodos = [...this.todos];
    const index = newTodos.findIndex((item) => item.id === todo.id);

    newTodos[index] = todo;
    this.todos = newTodos;
  }

  toggleTodo(id: number, value: boolean) {
    const newTodos = [...this.todos];
    const index = newTodos.findIndex((item) => item.id === id);

    newTodos[index].feito = value;
    this.todos = newTodos;
  }
}

const store = new TodoStore();

const context = createContext(store);
export const stateContext = { context: context, store };

const useStore = (): TodoStore => useContext(stateContext.context);
export default useStore;
