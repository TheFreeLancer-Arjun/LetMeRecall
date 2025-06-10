"use client";

import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Panel, { TaskType } from "../../app-components/panel";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { initialTasks } from "../../data/tasksData";

export default function Task({ title }: { title: string }) {
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(null);
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState<TaskType[]>(initialTasks);


  const handleAddTask = () => {
    if (newTask.trim() === "") return;

    const newTaskObj: TaskType = {
      title: newTask.trim(),
      description: "",
      date: new Date().toISOString().slice(0, 10),
      subtasks: [],
      tags: [],
      list: "Personal",
      priority: "low",
      priviteOrPublic: "private",
    };

    setTasks([...tasks, newTaskObj]);
    setNewTask("");
  };

  const updateTask = (index: number, updatedTask: TaskType) => {
    const newTasks = [...tasks];
    newTasks[index] = updatedTask;
    setTasks(newTasks);
  };

  const deleteTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    setSelectedTaskIndex(null);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reorderedTasks = Array.from(tasks);
    const [movedItem] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedItem);
    setTasks(reorderedTasks);
  };

  return (
    <section className="w-[32cm] h-[18.5cm] overflow-y-scroll flex gap-5 p-10 bg-white">
      {/* LEFT COLUMN */}
      <div className="w-[60%]">
        <h1 className="text-5xl font-bold mb-5 text-gray-800">
          {title}
          <span className="bg-white px-4 py-2 rounded-lg ml-5 border-gray-300 border text-3xl">
            {tasks.length}
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
            Add
          </button>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="taskList">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {tasks.map((task, index) => (
                  <Draggable key={index} draggableId={String(index)} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`p-4 rounded-lg cursor-pointer border mb-4 transition-all duration-300 ${
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
                          <input type="checkbox" className="mr-2" />
                          <span className="flex-1 text-gray-800 font-medium">
                            {task.title}
                          </span>
                          <span className="text-gray-400">›</span>
                        </div>

                        <div className="text-xs text-gray-500 mt-2 flex gap-3 flex-wrap items-center">
                          <span className="font-bold">📅 {task.date}</span>

                          <span className="w-[14px] h-[14px] font-bold bg-gray-200 text-gray-700 rounded-[2px] text-[11px] flex justify-center items-center mt-[2px]">
                            {task.subtasks.length}
                          </span>
                          <span className="font-bold">Subtasks</span>

                          <span className="flex items-center gap-1">
                            <span
                              className={`w-[14px] h-[14px] rounded-[2px] mt-[2px] ${
                                task.list === "Personal"
                                  ? "bg-green-400"
                                  : "bg-red-400"
                              }`}
                            ></span>
                            <span className="font-bold">{task.list}</span>
                          </span>

                          <span className="flex items-center gap-1">
                            <span
                              className={`w-[14px] h-[14px] rounded-[2px] mt-[2px] ${
                                task.priviteOrPublic.toLowerCase() === "public"
                                  ? "bg-blue-400"
                                  : "bg-gray-400"
                              }`}
                            ></span>
                            <span className="font-bold">{task.priviteOrPublic}</span>
                          </span>
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

      {/* RIGHT COLUMN */}
      <div className="w-[50%]">
        {selectedTaskIndex !== null && (
          <Panel
            task={tasks[selectedTaskIndex]}
            onChange={(updatedTask) => updateTask(selectedTaskIndex, updatedTask)}
            onDelete={() => deleteTask(selectedTaskIndex)}
          />
        )}
      </div>
    </section>
  );
}
