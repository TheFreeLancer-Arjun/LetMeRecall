"use client";
import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import Panel from "@/app/app-components/panel";

type Note = {
  title: string;
  color: string;
  content: string[];
};

const initialNotes: Note[] = [
  {
    title: "Social Media",
    color: "bg-yellow-100",
    content: [
      "Plan social content",
      "Build content calendar",
      "Plan promotion and distribution",
    ],
  },
  {
    title: "Content Strategy",
    color: "bg-blue-100",
    content: [
      "Would need time to get insights (goals, personals, budget, audits),",
      "Assemble my team (SEO, email marketer)",
      "Brainstorm on tooling."
      ,
    ],
  },
  {
    title: "Email A/B Tests",
    color: "bg-red-100",
    content: ["Subject lines", "Sender", "CTA", "Sending times"],
  },
  {
    title: "Banner Ads",
    color: "bg-orange-200",
    content: [
      "Notes from the workshop:",
      "Sizing matters",
      "Choose distinctive imagery",
      "Landing page must match",
    ],
  },
];

export default function StickyWall() {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [showForm, setShowForm] = useState(false);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(notes);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setNotes(items);
  };

  return (
    <div className="bg-white p-5 max-h-screen overflow-y-auto">
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
                <Draggable
                  key={index.toString()}
                  draggableId={index.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`rounded-[10px] shadow-md ${note.color} p-6 transition hover:scale-[1.01] w-[9cm] h-[8cm]`}
                    >
                      <h2 className="font-bold text-3xl text-gray-800 mb-2">
                        {note.title}
                      </h2>
                      <ul className="list-disc pl-5 text-sm text-gray-600 leading-relaxed ml-2 font-semibold">
                        {note.content.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Draggable>
              ))}

              {provided.placeholder}


{/* if double click on sctiky note */}

  <div className="w-full max-w-md p-6 bg-gray-200 shadow-lg rounded-2xl h-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-600">Edit Task</h1>
            <div className="flex gap-2">
              <button className="bg-white px-4 py-2 rounded-lg border border-gray-400 text-sm font-bold text-gray-600 hover:bg-red-200 duration-300">
                Delete Task
              </button>
              <button className="bg-yellow-300 px-4 py-2 rounded-lg border border-gray-400 text-sm font-bold text-gray-600 hover:bg-yellow-200 duration-300">
                Save Changes
              </button>
            </div>
          </div>

          {/* Title */}
          <input
            type="text"
            placeholder="Task title"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg text-gray-600"
          />

          {/* Description */}
          <textarea
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
            placeholder="Add Link"
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg text-gray-600"
          />

          {/* Priority */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Priority
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-600">
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
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-600">
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
            </select>
          </div>

          {/* Public or Private */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Visibility
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-600">
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
                placeholder="New tag"
                className="flex-1 px-3 py-2 border border-gray-300 bg-blue-100 rounded-lg text-gray-600"
              />
              <button className="bg-white px-4 py-2 rounded-lg border border-gray-400 text-sm text-gray-600 hover:bg-gray-200">
                Add
              </button>
            </div>
            <div className="flex flex-wrap mt-2 gap-2">
              <span className="px-3 py-1 bg-yellow-100 rounded-full text-sm text-gray-700"></span>
            </div>
          </div>

          {/* Subtasks */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Subtasks
            </label>
            <div className="flex gap-2 mb-2">
              <input
                placeholder="New subtask"
                className="flex-1 px-3 py-2 border border-gray-300 bg-blue-100 rounded-lg text-gray-600"
              />
              <button className="bg-white px-4 py-2 rounded-lg border border-gray-400 text-sm text-gray-600 hover:bg-gray-200">
                Add
              </button>
            </div>
            <div className="flex flex-col gap-1">
              <label className="flex items-center text-gray-700 text-sm">
                <input type="checkbox" className="mr-2" />
              </label>
            </div>
          </div>
        </div> 



              {/* Add Note Form Toggle */}
              {!showForm ? (
                <div
                  onClick={() => setShowForm(true)}
                  className="w-[9cm] h-[8cm] rounded-[10px] shadow-md bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-6xl text-gray-600 cursor-pointer transition"
                >
                  +
                </div>
              ) : (
                <div className="w-[9cm] max-w-md p-6 bg-gray-200 shadow-lg rounded-2xl h-[8cm]">
                  {/* Header */}
                  <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-gray-600">
                      Add Task
                    </h1>
                  </div>

                  {/* Title */}
                  <input
                    type="text"
                    placeholder="Task title"
                    className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg text-gray-600"
                  />

                  {/* Subtasks */}
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Subtasks
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        placeholder="New subtask"
                        className="flex-1 px-3 py-2 border border-gray-300 bg-blue-100 rounded-lg text-gray-600"
                      />
                      <button className="bg-white px-4 py-2 rounded-lg border border-gray-400 text-sm text-gray-600 hover:bg-gray-200">
                        Add
                      </button>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="flex items-center text-gray-700 text-sm"></label>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="bg-yellow-300 px-4 w-full py-2 rounded-lg border border-gray-400 text-sm font-bold text-gray-600 hover:bg-yellow-200 duration-300">
                      Save
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
