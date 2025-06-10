"use client";
import React, { useState, useMemo } from "react";

type EventType = {
  title: string;
  description: string;
  date: string;
  time: string;
};

type ViewMode = "Day" | "Week" | "Month";

export default function Calendar() {
  const [showForm, setShowForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("Day");
  const [currentDate, setCurrentDate] = useState(new Date());

  const [form, setForm] = useState<EventType>({
    title: "",
    description: "",
    date: "",
    time: "",
  });

  const [events, setEvents] = useState<EventType[]>([
    {
      title: "Session 1: Marketing Sprint",
      description: "Team marketing sprint for product roadmap.",
      date: "2025-07-06",
      time: "09:00",
    },
    {
      title: "Sales Catchup",
      description: "Weekly meeting with the sales team.",
      date: "2025-07-07",
      time: "10:00",
    },
    {
      title: "Renew driver’s license",
      description: "Go to RTO and renew your license.",
      date: "2025-07-07",
      time: "11:00",
    },
  ]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.title || !form.date || !form.time) {
      alert("Please fill in title, date, and time.");
      return;
    }

    setEvents([...events, form]);
    setShowForm(false);
    setForm({ title: "", description: "", date: "", time: "" });
  };

  const handleDoubleClick = (event: EventType) => {
    setSelectedEvent(event);
  };

  const getDayName = (date: Date) =>
    date.toLocaleDateString("en-US", { weekday: "long" });

  const filteredEvents = useMemo(() => {
    if (viewMode === "Day") {
      const formatted = currentDate.toISOString().split("T")[0];
      return events.filter((e) => e.date === formatted);
    } else if (viewMode === "Week") {
      const start = new Date(currentDate);
      start.setDate(currentDate.getDate() - currentDate.getDay());
      const end = new Date(start);
      end.setDate(end.getDate() + 6);
      return events.filter((e) => {
        const d = new Date(e.date);
        return d >= start && d <= end;
      });
    } else {
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      return events.filter((e) => {
        const d = new Date(e.date);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      });
    }
  }, [events, viewMode, currentDate]);

  const times = [...new Set(filteredEvents.map((e) => e.time))].sort();

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    if (viewMode === "Day") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1));
    } else if (viewMode === "Week") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
    } else {
      newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  return (
    <div className="p-10 bg-white w-[32cm] min-h-screen relative">
      {/* Header */}
      <div className="h-[4cm] absolute left-0 top-0 p-5 w-full">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-bold text-gray-700 flex gap-4">
            <span>{currentDate.getDate()}</span>
            <span className="uppercase">
              {currentDate.toLocaleDateString("en-US", { month: "long" })}
            </span>
            <span>{currentDate.getFullYear()}</span>
          </h1>

          <div className="flex gap-2">
            <button
              onClick={() => navigateDate("prev")}
              className="bg-gray-200 px-3 py-2 rounded-full"
            >
              ⬅️
            </button>
            <button
              onClick={() => navigateDate("next")}
              className="bg-gray-200 px-3 py-2 rounded-full"
            >
              ➡️
            </button>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-white px-4 py-2 rounded-lg border border-gray-400 text-sm font-medium hover:bg-gray-200 text-gray-600 hover:text-gray-800 transition"
            >
              Add Event
            </button>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="gap-4 bg-gray-200 w-[6cm] px-2 py-2 rounded-xl flex justify-center items-center">
          {(["Day", "Week", "Month"] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`text-sm px-3 py-1 rounded-lg ${
                viewMode === mode
                  ? "bg-gray-400 text-gray-800 font-bold"
                  : "bg-white text-gray-800 font-semibold"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Day Label */}
      <p className="text-2xl uppercase text-gray-600 ml-[4cm] font-bold mt-[3cm]">
        {getDayName(currentDate)}
      </p>

      {/* Time + Events */}
      <div className="flex gap-10 mt-10">
        <div className="space-y-6 text-gray-500 font-medium text-xl">
          {times.map((time, index) => (
            <div key={index}>
              {new Date(`1970-01-01T${time}`).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 w-full ml-7">
          {filteredEvents.map((event, index) => (
            <div
              key={index}
              onDoubleClick={() => handleDoubleClick(event)}
              className={`rounded-lg px-4 py-7 font-medium text-2xl w-full cursor-pointer ${
                index % 3 === 0
                  ? "bg-blue-100"
                  : index % 3 === 1
                  ? "bg-yellow-100"
                  : "bg-red-100"
              }`}
            >
              {event.title}
            </div>
          ))}
        </div>
      </div>

      {/* Add Event Form */}
      {showForm && (
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
      )}

      {/* Modal for Event Details */}
      {selectedEvent && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-2">{selectedEvent.title}</h3>
            <p className="text-sm text-gray-700 mb-4">
              {selectedEvent.description}
            </p>
            <p className="text-xs text-gray-500 mb-2">
              📅 {selectedEvent.date} | ⏰ {selectedEvent.time}
            </p>
            <button
              onClick={() => setSelectedEvent(null)}
              className="mt-2 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
