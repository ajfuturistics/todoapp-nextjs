"use client";

import React from "react";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  console.log(error.name);

  return (
    <div className="grid h-screen px-4 bg-white place-content-center">
      <div className="text-center">
        <h1 className="font-black text-gray-200 text-9xl">
          {error?.name || "Error"}
        </h1>

        <p className="mt-4 text-gray-500">
          {error.message || "Something went wrong"}
        </p>

        <button
          type="button"
          onClick={() => reset()}
          className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
