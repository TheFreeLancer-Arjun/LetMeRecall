"use client";

import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { useCreateTodo } from "../hook/useCreateTodo";
import { useTodos } from "../hook/useTodos";

interface EventForm {
  title: string;
  description: string;
  date: string;
  time?: string | null;
}

type ViewMode = "Day" | "Week" | "Month";

export default function Calendar() {
  const { activeAccountId } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("Day");
  const [form, setForm] = useState<EventForm>({
    title: "",
    description: "",
    date: "",
    time: "",
  });

  const { createTodo, loading: creating, error: createError } = useCreateTodo();
  const { todos, loading: todosLoading, error: todosError } = useTodos(
    "today",
    activeAccountId
  );

  const formatTime = (time: string | null | undefined) => {
    if (!time || time === "00:00") return "00:00";
    const parsed = new Date(`1970-01-01T${time}`);
    return parsed.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.title || !form.date || !form.time || !activeAccountId) return;

    const payload = {
      title: form.title,
      description: form.description,
      date: form.date,
      time: form.time || "00:00",
      accountId: activeAccountId,
      list: "personal" as const,
      visibility: "private" as const,
      subTasks: [],
      tags: [],
      links: [],
      priority: "low" as const,
    };

    const created = await createTodo(payload);

    if (created) {
      setForm({ title: "", description: "", date: "", time: "" });
      setShowForm(false);
    }
  };

  const getDayName = (date: Date) =>
    date.toLocaleDateString("en-US", { weekday: "long" });

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    if (viewMode === "Day")
      newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1));
    else if (viewMode === "Week")
      newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
    else newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1));
    setCurrentDate(newDate);
  };

  return (
    <div className="p-4 w-full overflow-y-scroll bg-[#F9FAFB]">
      {/* Header */}
      <div className="flex justify-between">
        <div>
          <h1 className="text-5xl font-bold text-gray-700">
            {currentDate.toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </h1>
          <div className="mt-2 flex gap-2 bg-gray-200 p-2 rounded-xl">
            {["Day", "Week", "Month"].map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode as ViewMode)}
                className={`px-4 py-1 rounded-lg ${
                  viewMode === mode ? "bg-gray-300 font-bold" : "bg-white"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-end gap-4">
          <button
            onClick={() => setShowForm(true)}
            className="bg-white border px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-200"
          >
            Add Event
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => navigateDate("prev")}
              className="bg-gray-200 px-3 py-2 rounded-xl"
            >
              ⬅️
            </button>
            <button
              onClick={() => navigateDate("next")}
              className="bg-gray-200 px-3 py-2 rounded-xl"
            >
              ➡️
            </button>
          </div>
        </div>
      </div>

      <p className="text-2xl uppercase text-gray-600 font-bold mt-6">
        {getDayName(currentDate)}
      </p>

      <div className="mt-4 space-y-4">
        {todosLoading ? (
          <p className="text-gray-500 italic">Loading...</p>
        ) : todos.length === 0 ? (
          <p className="text-gray-500 italic">No events for today.</p>
        ) : (
          todos.map((event, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-[4cm] text-right text-gray-500 text-xl">
                {formatTime((event as any).time)}
              </div>
              <div
                className={`p-4 rounded-xl w-full shadow-md text-xl font-medium ${
                  index % 3 === 0
                    ? "bg-[#D1EAED]"
                    : index % 3 === 1
                    ? "bg-[#FFDADA]"
                    : "bg-[#E0FFD1]"
                }`}
              >
                {event.title}
              </div>
            </div>
          ))
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Event</h2>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              className="w-full mb-3 px-3 py-2 border rounded"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="w-full mb-3 px-3 py-2 border rounded"
            />
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full mb-3 px-3 py-2 border rounded"
            />
            <input
              type="time"
              name="time"
              value={form.time || ""}
              onChange={handleChange}
              className="w-full mb-3 px-3 py-2 border rounded"
            />

            {createError && (
              <p className="text-sm text-red-600 mb-2">{createError}</p>
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 rounded bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={creating}
                className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
              >
                {creating ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
