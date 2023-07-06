"use client";
import { TodoType, useTodosStore } from "@/store/store";
import React, { FormEvent, useRef, useState } from "react";

interface Props {
  hideModal: () => void;
  todo?: TodoType;
  Type: string;
}
const Modal = ({ hideModal, Type = "Add", todo }: Props) => {
  const { addTodo, editTodo } = useTodosStore();
  const [data, setData] = useState(
    todo || {
      Title: "",
      Description: "",
      Status: "",
    }
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (data.Title === "" || data.Description === "" || data.Status === "") {
      alert("Fill all fields");
      return;
    }
    if (Type === "Update") {
      if (todo) {
        editTodo({
          id: todo?.id,
          ...data,
        });
      }
    } else {
      addTodo({
        id: Date.now().toString(),
        ...data,
      });
    }

    hideModal();
  };

  return (
    <div className="absolute z-10 overflow-y-auto top-0 w-full left-0">
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-900 opacity-75" />
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
          &#8203;
        </span>
        <div
          className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <h2 className="font-semibold my-4 text-xl text-center uppercase">
            {Type}
          </h2>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <label className="font-medium text-gray-800">
              Title ({data?.Title.length}/50)
            </label>
            <input
              type="text"
              className="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
              maxLength={50}
              value={data.Title}
              onChange={(e) =>
                setData((prev) => ({ ...prev, Title: e.target.value }))
              }
              required
            />
            <label className="font-medium text-gray-800">
              Description ({data?.Description.length}/150)
            </label>
            <textarea
              className="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
              maxLength={150}
              value={data?.Description}
              onChange={(e) =>
                setData((prev) => ({ ...prev, Description: e.target.value }))
              }
              required
            />
            <label className="font-medium text-gray-800">Status</label>
            <select
              className="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
              value={data?.Status}
              onChange={(e) =>
                setData((prev) => ({ ...prev, Status: e.target.value }))
              }
              required
            >
              <option value="">Select Status</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="bg-gray-200 px-4 py-3 text-right">
            <button
              type="button"
              className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
              onClick={hideModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2"
            >
              {Type}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Modal;
