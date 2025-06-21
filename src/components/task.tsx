"use client";

import React, { useState } from "react";
import Panel, { TaskType as RawTaskType } from "../../app/app-components/panel";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { useAuth } from "./AuthContext";
import { FaArrowRight, FaCalendarAlt } from "react-icons/fa";
import { useTodos, TodoType } from "../hook/useTodos";
import { useCreateTodo } from "../hook/useCreateTodo";

const getPriorityColor = (priority: string | undefined) => {
  switch (priority) {
    case "low":
      return "bg-yellow-400";
    case "medium":
      return "bg-green-400";
    case "high":
      return "bg-red-400";
    default:
      return "bg-gray-300";
  }
};

const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

type Props = {
  title: string;
};

export default function Task({ title }: Props) {
  const { activeAccountId } = useAuth();
  const { todos, refetch } = useTodos("today", activeAccountId);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(
    null
  );
  const [newTask, setNewTask] = useState("");

  const { createTodo, loading, error } = useCreateTodo();

  const handleAddTask = async () => {
    if (!newTask.trim() || !activeAccountId) return;

    try {
      await createTodo({
        title: newTask.trim(),
        description: "",
        date: new Date().toISOString().slice(0, 10),
        time: "",
        subTasks: [],
        tags: [],
        links: [],
        list: "personal",
        priority: "low",
        visibility: "private",
        accountId: activeAccountId,
      });

      setNewTask("");
      refetch();
    } catch (err) {
      console.error("❌ Failed to add task:", err);
    }
  };

  const updateTask = (index: number, updatedTask: TodoType) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = {
      ...updatedTask,
      list: updatedTask.list.toLowerCase() as "personal" | "work",
    };
    // You may update local state if needed
  };

  const deleteTask = (index: number) => {
    setSelectedTaskIndex(null);
    // Optionally remove from local state
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reordered = [...todos];
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    // Optional: update order in backend or local state
  };

  return (
    <section className="w-screen h-screen overflow-y-scroll flex gap-5 p-10 bg-white">
      <div className="w-[60%]">
        <h1 className="text-5xl font-bold mb-5 text-gray-800">
          {title}
          <span className="bg-white px-4 py-2 rounded-lg ml-5 border-gray-300 border text-3xl">
            {todos.length}
          </span>
        </h1>

        <div className="flex gap-2 items-center mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="+ Add New Task"
            className="border border-gray-300 rounded px-4 py-2 text-sm w-full"
          />
          <button
            onClick={handleAddTask}
            className="bg-white px-4 py-2 rounded-lg border border-gray-400 text-sm font-medium hover:bg-gray-200 text-gray-600 hover:text-gray-800 duration-700"
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>

        {error && <p className="text-red-500 mb-2 text-sm">❌ {error}</p>}

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="taskList">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {todos.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`p-4 rounded-lg cursor-pointer border mb-4 transition ${
                          selectedTaskIndex === index
                            ? "bg-blue-50 border-blue-400"
                            : "bg-white"
                        }`}
                        onClick={() =>
                          setSelectedTaskIndex(
                            selectedTaskIndex === index ? null : index
                          )
                        }
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-medium text-gray-700 flex-1">
                            {task.title}
                          </span>
                          <FaArrowRight className="text-gray-600 text-xl" />
                        </div>

                        <div className="text-sm text-gray-500 mt-2 flex flex-wrap gap-2">
                          <span className="flex items-center gap-1">
                            <FaCalendarAlt /> {task.date}
                          </span>
                          <span className="px-2 py-1 rounded bg-green-100 text-green-800 font-semibold">
                            {task.list}
                          </span>
                          <span className="flex items-center gap-1 px-2 py-1 font-semibold">
                            <span
                              className={`w-3 h-3 rounded-sm ${
                                task.visibility === "public"
                                  ? "bg-green-400"
                                  : "bg-red-400"
                              }`}
                            ></span>
                            {task.visibility}
                          </span>
                          <span className="flex items-center gap-1 px-2 py-1 font-semibold">
                            <span
                              className={`w-3 h-3 rounded-sm ${getPriorityColor(
                                task.priority
                              )}`}
                            ></span>
                            {task.priority}
                          </span>
                          {(task.tags || []).map((tag, i) => (
                            <span
                              key={i}
                              className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-semibold"
                            >
                              #{tag}
                            </span>
                          ))}
                          <span>{task.subTasks?.length || 0} subtasks</span>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {/* Right Panel */}
      <div className="w-[50%]">
        {selectedTaskIndex !== null && (
          <Panel
            task={
              {
                ...todos[selectedTaskIndex],
                accountId: activeAccountId, // ✅ ensure accountId is passed
                list: capitalize(todos[selectedTaskIndex].list),
              } as RawTaskType
            }
            onChange={(updated: any) =>
              updateTask(selectedTaskIndex, {
                ...updated,
                list: updated.list.toLowerCase() as "personal" | "work",
              })
            }
            onDelete={() => deleteTask(selectedTaskIndex)}
          />
        )}
      </div>
    </section>
  );
}
