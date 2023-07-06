"use client";
import React, { useState } from "react";
import Modal from "../modal/Modal";

const Header = () => {
  const [open, setOpen] = useState(false);

  const hideModal = () => {
    setOpen(false);
  };
  return (
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
  );
};

export default Header;
