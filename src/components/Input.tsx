"use client";

import React, { useState } from "react";
import { useCreateTodo } from "../hook/useCreateTodo"; // ✅ adjust path if needed

type Props = {
  accountId: string;
  onTaskAdded: () => void;
  date: string;
};

export default function Input({ accountId, onTaskAdded, date }: Props) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const { createTodo, loading, error } = useCreateTodo();

  const handleAddTask = async () => {
    if (!newTaskTitle.trim() || !accountId || loading) return;

    const result = await createTodo({
      title: newTaskTitle.trim(),
      accountId,
      date,
      description: "",
      time: "",
      subTasks: [],
      tags: [],
      links: [],
      list: "personal", // ✅ lowercase as per your CreateTodoPayload
      priority: "low",
      visibility: "private",
    });

    if (result) {
      setNewTaskTitle("");
      onTaskAdded(); // Notify parent to refresh
    }
  };

  return (
    <div className="flex gap-2 mb-6">
      <input
        type="text"
        placeholder="+ Add New Task"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
        disabled={loading}
      />
      <button
        onClick={handleAddTask}
        disabled={loading}
        className={`px-4 py-2 rounded-md text-sm font-medium text-white ${
          loading
            ? "bg-yellow-300 cursor-not-allowed"
            : "bg-yellow-400 hover:bg-yellow-500"
        }`}
      >
        {loading ? "Adding..." : "Add"}
      </button>
      {error && (
        <p className="text-red-500 text-sm mt-2 ml-2">{error}</p>
      )}
    </div>
  );
}
