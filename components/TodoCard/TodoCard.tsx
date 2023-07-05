"use client";

import { useTodosStore, type TodoType } from "@/store/store";
import React, { useState } from "react";
import Modal from "../modal/Modal";

interface Props {
  todo: TodoType;
}
const TodoCard = ({ todo }: Props) => {
  const [open, setOpen] = useState(false);
  const hideModal = () => {
    setOpen(false);
  };

  const { removeTodo } = useTodosStore();

  return (
    <>
      <div className="flex-1 rounded-lg border border-gray-300 bg-white/20 p-6 pb-4 w-full h-fit">
        <p className="text-sm text-gray-600">id: {todo?.id}</p>
        <h3 className="font-semibold text-gray-900">{todo.Title}</h3>

        <p className="my-4 text-sm text-gray-700">{todo.Description}</p>
        <p className="text-sm cursor-pointer">Status: {todo.Status}</p>

        <div className="mt-5 flex justify-center items-center gap-4 border-t border-gray-100 pt-3">
          <button
            onClick={() => setOpen((prev) => !prev)}
            type="button"
            className="text-sm cursor-pointer text-green-600"
          >
            Update
          </button>
          <button
            onClick={() => removeTodo(todo)}
            type="button"
            className="text-sm cursor-pointer text-red-600"
          >
            Delete
          </button>
        </div>
      </div>
      {open && <Modal Type="Update" hideModal={hideModal} todo={todo} />}
    </>
  );
};

export default TodoCard;
