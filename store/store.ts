import {
  types,
  destroy,
  Instance,
  onSnapshot,
  applySnapshot,
} from "mobx-state-tree";

interface PropData {
  id: string;
  Title: string;
  Description: string;
  Status: string;
}
const Todo = types.model({
  id: types.identifier,
  Title: types.string,
  Description: types.string,
  Status: types.string,
});

export const RootStore = types
  .model({
    todos: types.array(Todo),
  })
  .actions((self) => ({
    addTodo(todo: PropData) {
      self.todos.unshift(todo);
    },
    removeTodo(todo: Instance<typeof Todo>) {
      destroy(todo);
    },
    editTodo(newData: Instance<typeof Todo>) {
      const todoIndex = self.todos.findIndex((todo) => todo.id === newData.id);
      self.todos[todoIndex] = newData;
    },
  }));

interface TodosStoreType extends Instance<typeof RootStore> {}
export interface TodoType extends Instance<typeof Todo> {}

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
