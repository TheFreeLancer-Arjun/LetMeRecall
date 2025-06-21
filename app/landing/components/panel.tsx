"use client";

import React, { useEffect, useState } from "react";

// 🔒 Shared type
export type TaskType = {
  id?: string;
  title: string;
  description?: string;
  date?: string;
  time?: string;
  subTasks: string[];
  tags: string[];
  links: string[];
  list: "Personal" | "Work";
  priority?: "high" | "medium" | "low";
  visibility?: "private" | "public";
  accountId: string;
};

type RawTaskType =
  | TaskType
  | (Omit<TaskType, "subTasks"> & { subTasks?: string[] });

interface PanelProps {
  task: RawTaskType;
  onChange: (t: TaskType) => void;
  onDelete: () => void;
}

const normalizeTask = (raw: RawTaskType): TaskType => ({
  ...raw,
  subTasks: Array.isArray(raw.subTasks) ? raw.subTasks : [],
  tags: raw.tags || [],
  links: raw.links || [],
});

export default function Panel({ task, onChange, onDelete }: PanelProps) {
  const [localTask, setLocalTask] = useState<TaskType>(() => normalizeTask(task));
  const [newSubtask, setNewSubtask] = useState("");
  const [newTag, setNewTag] = useState("");
  const [newLink, setNewLink] = useState("");

  useEffect(() => {
    setLocalTask(normalizeTask(task));
  }, [task]);

  const handleSave = () => {
    onChange(localTask); // ⬅️ Backend call removed
  };

  const handleDelete = () => {
    onDelete(); // ⬅️ Backend call removed
  };

  const addItem = (field: keyof TaskType, value: string) => {
    if (!value.trim()) return;
    setLocalTask((prev) => ({
      ...prev,
      [field]: [...(prev[field] as string[]), value.trim()],
    }));
  };

  return (
    <div className="w-full max-w-md p-6 bg-[#BA6FFF]/50 shadow-lg rounded-2xl h-auto   text-[#1C0424]  border-[4px]" >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold ">Task</h1>
        <div className="flex gap-2">
          <button
            onClick={handleDelete}
            className="px-3 py-2 bg-[#FF8F9B] border text-[#670D19] font-bold rounded text-sm"
          >
            Delete
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-2 bg-[#DEFF96] rounded text-sm font-bold"
          >
            Save
          </button>
        </div>
      </div>

      <input
        type="text"
        value={localTask.title}
        onChange={(e) => setLocalTask({ ...localTask, title: e.target.value })}
        placeholder="Task title"
        className="w-full mb-4 px-4 py-2 border border-[#1C0424] rounded      bg-[#E9B2FE]"
      />

      <textarea
        value={localTask.description || ""}
        onChange={(e) =>
          setLocalTask({ ...localTask, description: e.target.value })
        }
        rows={3}
        placeholder="Task description"
        className="w-full mb-4 px-4 py-2 border border-[#1C0424] rounded      bg-[#E9B2FE]"
      />

      <input
        type="date"
        value={localTask.date || ""}
        onChange={(e) => setLocalTask({ ...localTask, date: e.target.value })}
        className="w-full mb-4 px-4 py-2 border border-[#1C0424] rounded      bg-[#E9B2FE]"
      />
      <input
        type="time"
        value={localTask.time || ""}
        onChange={(e) => setLocalTask({ ...localTask, time: e.target.value })}
        className="w-full mb-4 px-4 py-2 border border-[#1C0424] rounded      bg-[#E9B2FE]"
      />

      <select
        value={localTask.list}
        onChange={(e) =>
          setLocalTask({ ...localTask, list: e.target.value as TaskType["list"] })
        }
        className="w-full mb-4 px-4 py-2 border border-[#1C0424] rounded      bg-[#E9B2FE]"
      >
        <option value="Personal">Personal</option>
        <option value="Work">Work</option>
      </select>

      <select
        value={localTask.visibility || ""}
        onChange={(e) =>
          setLocalTask({
            ...localTask,
            visibility: e.target.value as TaskType["visibility"],
          })
        }
        className="w-full mb-4 px-4 py-2 border border-[#1C0424] rounded      bg-[#E9B2FE]"
      >
        
        <option value="private">Private</option>
        <option value="public">Public</option>
      </select>

      <select
        value={localTask.priority || ""}
        onChange={(e) =>
          setLocalTask({
            ...localTask,
            priority: e.target.value as TaskType["priority"],
          })
        }
        className="w-full mb-4 px-4 py-2 border border-[#1C0424] rounded      bg-[#E9B2FE]"
      >
        
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      {/* Tags */}
      <div className="mb-4">
        <input
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Add tag"
          className="w-full mb-2 px-4 py-2 border rounded      bg-[#E9B2FE]"
        />
        <button
          onClick={() => {
            addItem("tags", newTag);
            setNewTag("");
          }}
          className="mb-2 px-3 py-1 bg-[#DEFF96] border rounded       text-sm"
        >
          Add Tag
        </button>
        <div className="flex flex-wrap gap-2">
          {localTask.tags.map((tag, i) => (
            <span key={`${tag}-${i}`} className="bg-[#DEFF96] px-2 py-1 rounded-2xl   ">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="mb-4">
        <input
          value={newLink}
          onChange={(e) => setNewLink(e.target.value)}
          placeholder="Add link"
          className="w-full mb-2 px-4 py-2 border rounded bg-[#E9B2FE]"
        />
        <button
          onClick={() => {
            addItem("links", newLink);
            setNewLink("");
          }}
          className="mb-2 px-3 py-1 bg-[#DEFF96] border rounded text-sm"
        >
          Add Link
        </button>
        <ul className="text-sm pl-4 list-disc">
          {localTask.links.map((link, i) => (
            <li key={`${link}-${i}`}>{link}</li>
          ))}
        </ul>
      </div>

      {/* Subtasks */}
      <div>
        <input
          value={newSubtask}
          onChange={(e) => setNewSubtask(e.target.value)}
          placeholder="Add subtask"
          className="w-full mb-2 px-4 py-2 border rounded bg-[#E9B2FE]"
        />
        <button
          onClick={() => {
            addItem("subTasks", newSubtask);
            setNewSubtask("");
          }}
          className="mb-2 px-3 py-1 bg-[#DEFF96] border rounded text-sm  "
        >
          Add Subtask
        </button>
        <ul className="text-sm  pl-4 list-disc">
          {localTask.subTasks.map((subTask, i) => (
            <li key={`${subTask}-${i}`}>{subTask}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
