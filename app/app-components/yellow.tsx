"use client";

import React from "react";
import Image from "next/image";
import { useAllTodos } from "../../src/hook/useAllTodos"; // ✅ adjust if needed
import { useAuth } from "@/src/components/AuthContext";

export default function Yellow() {
  const accountId = useAuth();
  const { tasks, error, loading, } = useAllTodos(`${accountId}`);

  if (loading || !tasks) {
    return <div className="text-gray-500 p-4">Loading...</div>;
  }

  return (
    <div className="bg-[#F7E39A] text-gray-900 p-5 rounded-3xl w-[5cm] h-[14cm] flex justify-center items-start shadow-xl">
      <div className="flex flex-col justify-center items-center">
        <div className="text-4xl font-light mt-6 text-center">
          assign
          <div>tasks</div>
          <div>to</div>
          <span className="text-gray-500 font-semibold">
            { "others"}
          </span>
        </div>

        <span className="bg-white px-5 py-4 mr-[3cm] mt-2 rounded-full flex items-center justify-center ml-auto cursor-pointer border-gray-400 border-dashed border-2 text-2xl hover:bg-gray-200">
          →
        </span>

        <Image
          className="rounded-full mt-3"
          src={""}
          alt="Task or user"
          width={128}
          height={128}
        />
      </div>
    </div>
  );
}
