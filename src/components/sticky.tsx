"use client";

import React, { useState, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { useAllTodos } from "../hook/useAllTodos";
import { useCreateTodo } from "../hook/useCreateTodo";
import { useAuth } from "./AuthContext";

type StickyTask = {
  id: string;
  title: string;
  subtasks: string[]; // ✅ Always an array
};

export default function StickyWall() {
  const { activeAccountId } = useAuth();
  const { tasks, error: todosError, loading: todosLoading } = useAllTodos(`${activeAccountId}`);
  const { createTodo, loading: creating, error: createError } = useCreateTodo();

  const [notes, setNotes] = useState<StickyTask[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [newSubtask, setNewSubtask] = useState("");
  const [subtasks, setSubtasks] = useState<string[]>([]);

  useEffect(() => {
    const formatted = tasks.map((todo: any) => ({
      id: todo.id,
      title: todo.title,
      subtasks: todo.subTasks || [],
    }));
    setNotes(formatted);
  }, [tasks]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(notes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setNotes(items);
  };

  const handleAddSubtask = () => {
    if (!newSubtask.trim()) return;
    setSubtasks((prev) => [...prev, newSubtask.trim()]);
    setNewSubtask("");
  };

  const handleSaveTask = async () => {
    if (!activeAccountId || !title.trim()) return;

    const payload = {
      title,
      description: "",
      date: new Date().toISOString().split("T")[0],
      time: "00:00",
      accountId: activeAccountId,
      list: "personal" as const,
      priority: "low" as const,
      visibility: "private" as const,
      subTasks: subtasks,
      tags: [],
      links: [],
    };

    const created = await createTodo(payload);

    if (created) {
      setNotes((prev) => [
        ...prev,
        { id: created.id, title: created.title, subtasks: created.subTasks || [] },
      ]);
      setShowForm(false);
      setTitle("");
      setSubtasks([]);
    }
  };

  return (
    <div className="bg-white p-5 h-screen w-screen overflow-y-auto">
      <h1 className="text-5xl font-bold text-gray-900 mb-8 p-1 text-start">
        Sticky Wall
      </h1>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="notes" direction="horizontal">
          {(provided) => (
            <div
              className="flex flex-wrap items-center gap-5 p-6 border-[2px] border-gray-400/40 rounded-xl"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {notes.map((note, index) => (
                <Draggable key={note.id} draggableId={note.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="rounded-[10px] shadow-md bg-yellow-100 p-6 transition hover:scale-[1.01] w-[9cm] h-[8cm]"
                    >
                      <h2 className="font-bold text-3xl text-gray-800 mb-2">
                        {note.title}
                      </h2>
                      <ul className="list-disc pl-5 text-sm text-gray-600 leading-relaxed ml-2 font-semibold">
                        {(note.subtasks || []).map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}

              {!showForm ? (
                <div
                  onClick={() => setShowForm(true)}
                  className="w-[9cm] h-[8cm] rounded-[10px] shadow-md bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-6xl text-gray-600 cursor-pointer transition"
                >
                  +
                </div>
              ) : (
                <div className="w-[9cm] max-w-md p-6 bg-gray-200 shadow-lg rounded-2xl ">
                  <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-gray-600">Add Task</h1>
                  </div>

                  <input
                    type="text"
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg text-gray-600"
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Subtasks
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        value={newSubtask}
                        onChange={(e) => setNewSubtask(e.target.value)}
                        placeholder="New subtask"
                        className="flex-1 px-3 py-2 border border-gray-300 bg-blue-100 rounded-lg text-gray-600"
                      />
                      <button
                        onClick={handleAddSubtask}
                        className="bg-white px-4 py-2 rounded-lg border border-gray-400 text-sm text-gray-600 hover:bg-gray-200"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-col gap-1">
                      {subtasks.map((sub, i) => (
                        <label key={i} className="flex items-center text-gray-700 text-sm">
                          <input type="checkbox" className="mr-2" disabled /> {sub}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={handleSaveTask}
                      disabled={creating}
                      className="bg-yellow-300 px-4 w-full py-2 rounded-lg border border-gray-400 text-sm font-bold text-gray-600 hover:bg-yellow-200 duration-300 disabled:opacity-50"
                    >
                      {creating ? "Saving..." : "Save"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
