"use client";

import React, { useState } from "react";
import { FaCalendarAlt, FaStar } from "react-icons/fa";
import Input from "./Input";
import { useTodos, TodoType } from "../hook/useTodos";
import { useAuth } from "../components/AuthContext";

export default function Upcoming() {
  const { activeAccountId } = useAuth();

  const { todos: todayTasks, refetch: refetchToday } = useTodos("today", activeAccountId);
  const { todos: tomorrowTasks, refetch: refetchTomorrow } = useTodos("tomorrow", activeAccountId);
  const { todos: weekTasks, refetch: refetchWeek } = useTodos("week", activeAccountId);

  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(null);
  const [newTask, setNewTask] = useState("");

  const getDateString = (daysToAdd = 0) => {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    return date.toISOString().split("T")[0];
  };

  const handleAddTask = () => {
    // your task creation logic here
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-400";
      case "low":
        return "bg-green-400";
      default:
        return "bg-gray-300";
    }
  };

  const renderTasks = (title: string, tasks: TodoType[], date: string) => (
    <div className="w-full max-w-2xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-700 flex items-center gap-3">
        <span style={{ fontFamily: "Rationale" }}>{title}</span>
        <span className="text-sm bg-gray-100 border px-3 py-1 rounded text-gray-600 font-semibold">
          {tasks.length}
        </span>
      </h2>

      <div className="mb-6 w-full flex items-center gap-4 bg-white rounded-full shadow px-4 py-2 border">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add New Task"
          className="flex-1 text-lg outline-none placeholder-gray-500"
        />
        <button
          onClick={handleAddTask}
          className="bg-green-400 hover:bg-green-500 text-white px-4 py-2 rounded-full"
        >
          Add
        </button>
      </div>

      <div className="space-y-4  bg-amber-950">
        {tasks.map((task, index) => (
          <div
            key={task.id}
            className={`p-4 rounded-xl border shadow-sm transition cursor-pointer bg-white hover:shadow-md ${
              selectedTaskIndex === index ? "border-yellow-500 bg-yellow-50" : "border-gray-200"
            }`}
            onClick={() => setSelectedTaskIndex(selectedTaskIndex === index ? null : index)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-700">{task.title}</h3>
              <FaStar className="text-yellow-400" />
            </div>
            <p className="text-gray-600 mt-2">
              {task.description.length > 150
                ? `${task.description.slice(0, 150)}...`
                : task.description}
            </p>
            <div className="flex gap-3 mt-3 flex-wrap text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <FaCalendarAlt /> {task.date}
              </span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold">
                {task.list}
              </span>
              <span className="flex items-center gap-1">
                <span className={`w-3 h-3 rounded-full ${
                  task.visibility === "public" ? "bg-green-400" : "bg-red-400"
                }`}></span>
                {task.visibility}
              </span>
              <span className="flex items-center gap-1">
                <span className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`}></span>
                {task.priority}
              </span>
              {(task.tags || []).map((tag, i) => (
                <span
                  key={i}
                  className="bg-yellow-100 text-yellow-800 font-semibold px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
              <span className="bg-yellow-100 text-yellow-800 font-semibold px-2 py-1 rounded-full">
                {task.subTasks?.length || 0} subtasks
              </span>
            </div>
          </div>
        ))}
      </div>

      <Input
        accountId={activeAccountId!}
        date={date}
        onTaskAdded={() => {
          setTimeout(() => {
            refetchToday();
            refetchTomorrow();
            refetchWeek();
          }, 200);
        }}
      />
    </div>
  );

  return (
    <div className="w-screen flex-col justify-center items-center py-14 px-4 md:px-8 bg-gray-50">
      <h1 className="text-5xl md:text-7xl font-extrabold mb-10 text-gray-800 flex items-center gap-6">
        <span style={{ fontFamily: "Rationale" }}>Upcoming</span>
        <span className="bg-white px-6 py-2 rounded-lg border border-gray-300 text-2xl shadow">
          {todayTasks.length + tomorrowTasks.length + weekTasks.length}
        </span>
      </h1>

      <section className="w-full max-w-7xl grid lg:grid-cols-2 gap-10">
        {renderTasks("Today", todayTasks, getDateString(0))}
        <div className="hidden lg:block"></div>
      </section>

      <div className="w-full max-w-7xl mt-10 grid md:grid-cols-2 gap-10">
        {renderTasks("Tomorrow", tomorrowTasks, getDateString(1))}
        {renderTasks("Week", weekTasks, getDateString(7))}
      </div>
    </div>
  );
}
