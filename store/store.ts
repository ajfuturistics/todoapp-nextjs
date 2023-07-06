import { types, destroy, Instance, onSnapshot } from "mobx-state-tree";

const Todo = types.model({
  id: types.identifier,
  Title: types.string,
  Description: types.string,
  Status: types.string,
});

export interface TodoType extends Instance<typeof Todo> {}

export const RootStore = types
  .model({
    todos: types.array(Todo),
  })
  .actions((self) => ({
    addTodo(todo: TodoData) {
      self.todos.unshift(todo);
    },
    removeTodo(todo: TodoType) {
      destroy(todo);
    },
    editTodo(newData: TodoType) {
      const todoIndex = self.todos.findIndex((todo) => todo.id === newData.id);
      self.todos[todoIndex] = newData;
    },
  }));

interface TodosStoreType extends Instance<typeof RootStore> {}

let _todosStore: TodosStoreType;

export const useTodosStore = () => {
  if (!_todosStore) {
    _todosStore = RootStore.create({
      todos: [],
    });

    // to fix localStorage undefined issue
    if (typeof window !== "undefined") {
      // updating store in localStorage when state changes
      onSnapshot(_todosStore, (snapshot) => {
        localStorage.setItem("store", JSON.stringify(snapshot));
      });
    }
  }

  return _todosStore;
};
