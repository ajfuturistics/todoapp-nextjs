"use client";

import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useTodosStore } from "@/store/store";
import TodoCard from "../TodoCard/TodoCard";
import { applySnapshot } from "mobx-state-tree";

const TodoList = observer(() => {
  const tasksStore = useTodosStore();

  useEffect(() => {
    // getting data from localstorage
    let store = localStorage.getItem("store");
    if (store) {
      // updating todos if data present in localstorage
      applySnapshot(tasksStore, JSON.parse(store));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {tasksStore?.todos?.length !== 0 ? (
        <section className="w-full grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-2 mt-2">
          {tasksStore?.todos?.map((data) => (
            <TodoCard key={data.id} todo={data} />
          ))}
        </section>
      ) : (
        <p className="my-2 text-center">No todos found</p>
      )}
    </>
  );
});

export default TodoList;
