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
    this.sync();
  }

  editTodo(todo: TodoTask) {
    const newTodos = [...this.todos];
    const index = newTodos.findIndex((item) => item.id === todo.id);

    newTodos[index] = todo;
    this.todos = newTodos;
    this.sync();
  }

  deleteTodo(todo: TodoTask) {
    const newTodos = [...this.todos].filter((item) => item.id !== todo.id);
    this.todos = newTodos;
    this.sync();
  }

  toggleTodo(id: number, value: boolean) {
    const newTodos = [...this.todos];
    const index = newTodos.findIndex((item) => item.id === id);

    newTodos[index].feito = value;
    this.todos = newTodos;
    this.sync();
  }

  getLocal() {
    const local = localStorage.getItem("todos");

    if (local)
      try {
        const parsed = JSON.parse(local);

        if (Array.isArray(parsed)) {
          this.todos = parsed;
        }
      } catch (err) {
        this.todos = [];
      }
  }
  sync() {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }
}

const store = new TodoStore();

const context = createContext(store);
export const stateContext = { context: context, store };

const useStore = (): TodoStore => useContext(stateContext.context);
export default useStore;
