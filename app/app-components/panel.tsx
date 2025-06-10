"use client";

import React, { useEffect, useState } from "react";

export type TaskType = {
  title: string;
  description: string;
  links: string[];
  priority: "high" | "medium" | "low";
  list: "personal" | "work";
  Visibility: "private" | "public";
  date: string;
  time: string;
  tags: string[];
  subtasks: string[];
};

interface PanelProps {
  task: TaskType;
  onChange: (t: TaskType) => void;
  onDelete: () => void;
}

export default function Panel({ task, onChange, onDelete }: PanelProps) {
  const [localTask, setLocalTask] = useState<TaskType>(task);
  const [newSubtask, setNewSubtask] = useState("");
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    setLocalTask(task);
  }, [task]);

  const handleSave = () => {
    onChange(localTask);
  };

  const addSubtask = () => {
    if (!newSubtask.trim()) return;
    setLocalTask((prev) => ({
      ...prev,
      subtasks: [...prev.subtasks, newSubtask.trim()],
    }));
    setNewSubtask("");
  };

  const addTag = () => {
    if (!newTag.trim()) return;
    setLocalTask((prev) => ({
      ...prev,
      tags: [...prev.tags, newTag.trim()],
    }));
    setNewTag("");
  };

  return (
    <div className="w-full max-w-md p-6 bg-gray-200 shadow-lg rounded-2xl h-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-600">Edit Task</h1>
        <div className="flex gap-2">
          <button
            onClick={onDelete}
            className="bg-white px-4 py-2 rounded-lg border border-gray-400 text-sm font-bold text-gray-600 hover:bg-red-200 duration-300"
          >
            Delete Task
          </button>
          <button
            onClick={handleSave}
            className="bg-yellow-300 px-4 py-2 rounded-lg border border-gray-400 text-sm font-bold text-gray-600 hover:bg-yellow-200 duration-300"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Title */}
      <input
        type="text"
        value={localTask.title}
        onChange={(e) => setLocalTask({ ...localTask, title: e.target.value })}
        placeholder="Task title"
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg text-gray-600"
      />

      {/* Description */}
      <textarea
        value={localTask.description}
        onChange={(e) =>
          setLocalTask({ ...localTask, description: e.target.value })
        }
        rows={3}
        placeholder="Task description"
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg text-gray-600"
      />

      {/* Link */}
      <label className="block text-sm font-medium text-gray-600 mb-1">
        Add Links
      </label>
      <input
        type="text"
        value={localTask.title}
        onChange={(e) => setLocalTask({ ...localTask, link: e.target.value })}
        placeholder="Add Link"
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg text-gray-600"
      />

      {/* Priority */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Priority
        </label>
        <select
          value={localTask.priority}
          onChange={(e) =>
            setLocalTask({
              ...localTask,
              priority: e.target.value as TaskType["priority"],
            })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-600"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {/* List */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          List
        </label>
        <select
          value={localTask.list}
          onChange={(e) => setLocalTask({ ...localTask, list: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-600"
        >
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
        </select>
      </div>

      {/* Public or Private */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Visibility
        </label>
        <select
          value={localTask.priviteOrPublic}
          onChange={(e) =>
            setLocalTask({
              ...localTask,
              priviteOrPublic: e.target.value as TaskType["priviteOrPublic"],
            })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-600"
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>

      {/* Date */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Due Date
        </label>
        <input
          type="date"
          value={localTask.date}
          onChange={(e) => setLocalTask({ ...localTask, date: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-600"
        />
      </div>

      {/* Time */}
      <label className="text-sm font-medium text-gray-600 block mb-1">
        Select Time
      </label>
      <input
        type="time"
        name="time"
        value=""
        className="w-full p-2 mb-3 border rounded"
      />

      {/* Tags */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Tags
        </label>
        <div className="flex gap-2">
          <input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="New tag"
            className="flex-1 px-3 py-2 border border-gray-300 bg-blue-100 rounded-lg text-gray-600"
          />
          <button
            onClick={addTag}
            className="bg-white px-4 py-2 rounded-lg border border-gray-400 text-sm text-gray-600 hover:bg-gray-200"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap mt-2 gap-2">
          {localTask.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-yellow-100 rounded-full text-sm text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Subtasks */}
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
            onClick={addSubtask}
            className="bg-white px-4 py-2 rounded-lg border border-gray-400 text-sm text-gray-600 hover:bg-gray-200"
          >
            Add
          </button>
        </div>
        <div className="flex flex-col gap-1">
          {localTask.subtasks.map((sub, idx) => (
            <label
              key={idx}
              className="flex items-center text-gray-700 text-sm"
            >
              <input type="checkbox" className="mr-2" />
              {sub}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
