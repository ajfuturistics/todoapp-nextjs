"use client";

import TodoCard from "@/components/TodoCard/TodoCard";
import Modal from "@/components/modal/Modal";
import { useTodosStore } from "@/store/store";
import { observer } from "mobx-react-lite";
import { useState } from "react";

const Home = observer(() => {
  const [open, setOpen] = useState(false);

  const hideModal = () => {
    setOpen(false);
  };
  const tasksStore = useTodosStore();

  return (
    <main className="relative flex flex-col justify-center items-center my-4 p-2">
      <div className="w-full max-w-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">TodoList</h1>
          <div>
            <button
              className="py-1 px-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              onClick={() => setOpen((prev) => !prev)}
            >
              Add New Todo
            </button>
            {open && <Modal Type="Add" hideModal={hideModal} />}
          </div>
        </div>
        {tasksStore.todos.length !== 0 ? (
          <section className="w-full grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-2 mt-2">
            {tasksStore.todos.map((data) => (
              <TodoCard key={data.id} todo={data} />
            ))}
          </section>
        ) : (
          <p className="text-center py-4">No todos found</p>
        )}
      </div>
    </main>
  );
});

export default Home;
