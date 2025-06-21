"use client";

import React, { useEffect, useState } from "react";
import Panel, { TaskType as RawTaskType } from "./panel";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import {
  FaArrowRight,
  FaBars,
  FaBatteryEmpty,
  FaBatteryFull,
  FaCalendarAlt,
  FaEllipsisV,
  FaInternetExplorer,
  FaRegTrashAlt,
  FaStar,
  FaStarAndCrescent,
  FaStarOfLife,
  FaTrash,
  FaTrashAlt,
  FaTrashRestore,
  FaTrashRestoreAlt,
  FaWifi,
} from "react-icons/fa";
import Image from "next/image";

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

type Task = RawTaskType & { id: string };

export default function Task({ title }: Props) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Buy Groceries",
      description:
        "Milk, Bread, Eggs Reply using both in default theming to provide immersive user experience...",
      date: "2025-06-15",
      time: "09:00",
      subTasks: ["Go to store", "Choose items", "Pay"],
      tags: ["shopping"],
      links: [],
      list: "Personal",
      priority: "medium",
      visibility: "private",
      accountId: "local",
    },
    {
      id: "2",
      title: "Team Meeting",
      description:
        "Weekly Reply using both in default theming to provide immersive user experienceWeekly Reply using both in default theming to provide immersive user experienceWeekly Reply using both in default theming to provide immersive user experienceWeekly Reply using both in default theming to provide immersive user experienceWeekly Reply using both in default theming to provide immersive user experienceWeekly Reply using both in default theming to provide immersive user experience",
      date: "2025-06-16",
      time: "11:30",
      subTasks: ["Prepare report", "Discuss issues"],
      tags: ["work"],
      links: [],
      list: "Work",
      priority: "high",
      visibility: "public",
      accountId: "local",
    },
  ]);

  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(
    null
  );
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (!newTask.trim()) return;

    const newTaskObj: Task = {
      id: Date.now().toString(),
      title: newTask.trim(),
      description: "",
      date: new Date().toISOString().slice(0, 10),
      time: "",
      subTasks: [],
      tags: [],
      links: [],
      list: "Personal",
      priority: "low",
      visibility: "private",
      accountId: "local",
    };

    setTasks((prev) => [...prev, newTaskObj]);
    setNewTask("");
  };

  const updateTask = (index: number, updatedTask: Task) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = updatedTask;
    setTasks(updatedTasks);
  };

  const deleteTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
    setSelectedTaskIndex(null);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reordered = [...tasks];
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setTasks(reordered);
  };
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12 || 12;
      const formatted = `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;
      setTime(formatted);
    };

    updateTime(); // initial
    const interval = setInterval(updateTime, 1000); // update every second
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full h-screen overflow-y-auto flex-col gap-5 bg-white rounded-4xl border-[3px] border-[] ">
      <section className="flex p-2  justify-between items-center  text-xl">
        <div className="pl-5  font-medium">{time} </div>
        <div className="flex justify-center items-center gap-4 pr-4 ">
          <FaWifi />
          <FaBatteryFull />
        </div>
      </section>

      <h1 className="text-5xl font-bold text-[#1C0424] flex justify-start items-center ">
        <div
          style={{ fontFamily: "Rationale" }}
          className="text-7xl sm:text-8xl md:text-9xl uppercase italic expressive font-headline  text-[#5C3609]"
        >
          Today
        </div>
      </h1>

      <div className="w-full flex justify-center items-start gap-2">
        {/* LEFT SECTION - EVEN INDEXED TASKS */}
        <div className=" w-[50%] p-2 flex justify-center items-center flex-col gap-2  ">
          <div className=" flex justify-center items-center bg-white  rounded-full px-3 py-3 w-full   shadow-lg border-gray-200 border ">
            <div className="flex gap-2 items-center  rounded-4xl    bg-white w-[85%]    ">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder=" Add New Task"
                className="rounded-4xl   placeholder-[#2B0B36]/80  focus:outline-none  w-full ml-5 text-xl "
              />
            </div>

            <div className="  w-[15%] flex justify-center items-center  ">
              <button
                onClick={handleAddTask}
                className=" text-lg   font-semibold rounded-full border border-[#1C0424] bg-[#DEFF96]  px-5 py-2 "
              >
                Add
              </button>
            </div>
          </div>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="taskListLeft">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {tasks
                    .filter((_, index) => index % 2 === 0)
                    .map((task) => {
                      const index = tasks.findIndex((t) => t.id === task.id);
                      return (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={` rounded-2xl cursor-pointer mb-2 transition w-full ${
                                selectedTaskIndex === index
                                  ? "bg-[#FCF7B3] border-[1px] border-[#670D19]  p-5"
                                  : "bg-white p-5 border"
                              }`}
                              onClick={() =>
                                setSelectedTaskIndex(
                                  selectedTaskIndex === index ? null : index
                                )
                              }
                            >
                              {/* your left task JSX UI exactly same as before */}
                              <div className="flex gap-3  w-full  p-2 rounded-2xl ">
                                <div className="w-[1.5cm] h-[1.5cm] bg-gray-300 rounded-3xl"></div>
                                <div className="flex  justify-between items-center gap-2 w-full  bg-[white] p-1  rounded-2xl">
                                  <div className="text-lg font-light  px-4  rounded-2xl  ">
                                    <div className="text-2xl font-medium  text-gray-300 ">
                                      Usename
                                    </div>
                                    <div className="text-sm font-light text-gray-700 p-1 flex justify-center items-start ">
                                      online from 10:00 AM
                                    </div>
                                  </div>
                                  <div className="text-2xl  font-light bg-[#FCF7B3]  px-2 py-2 rounded-full text-yellow-400">
                                    <FaStar />
                                  </div>{" "}
                                </div>
                              </div>
                              <div className="flex items-center justify-center ">
                                <span className="text-2xl font-medium text-[#5C3609] flex-1 pt-5  ">
                                  {task.title}
                                </span>
                              </div>
                              <div className="flex flex-wrap pt-2">
                                <h1 className="p-1  text-gray-500">
                                  {task.description.length > 200
                                    ? `${task.description.slice(0, 200)}...`
                                    : task.description}
                                </h1>
                                <div className="text-sm mt-2 flex flex-wrap gap-2 px-2 py-2  rounded-2xl text-[#1C0424] font-semibold">
                                  <span className="flex items-center gap-1">
                                    <FaCalendarAlt /> {task.date}
                                  </span>
                                  <span className="px-2 py-1 rounded-2xl bg-green-100 text-green-800 font-semibold">
                                    {task.list}
                                  </span>
                                  <span className="flex items-center gap-1 px-2 py-1 font-semibold  text-gray-500">
                                    <span
                                      className={`w-3 h-3 rounded-sm ${
                                        task.visibility === "public"
                                          ? "bg-green-400"
                                          : "bg-red-400"
                                      }`}
                                    ></span>
                                    {task.visibility}
                                  </span>
                                  <span className="flex items-center gap-1 px-2 py-1 font-semibold text-gray-500">
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
                                      className="bg-[#DEFF96] font-semibold px-3 py-1 rounded-xl"
                                    >
                                      #{tag}
                                    </span>
                                  ))}
                                  <span className="bg-[#DEFF96] font-semibold px-3 py-1 rounded-xl">
                                    {task.subTasks?.length || 0} subtasks
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        {/* RIGHT SECTION - ODD INDEXED TASKS */}
        <div className=" w-[50%]  flex justify-center items-center p-2">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="taskListRight">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {tasks
                    .filter((_, index) => index % 2 !== 0)
                    .map((task) => {
                      const index = tasks.findIndex((t) => t.id === task.id);
                      return (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={` rounded-t-2xl cursor-pointer mb-2 transition rounded-2xl overflow-hidden ${
                                selectedTaskIndex === index
                                  ? "bg-[#FCF7B3] border-[1px] border-[#670D19]"
                                  : "bg-white border"
                              }`}
                              onClick={() =>
                                setSelectedTaskIndex(
                                  selectedTaskIndex === index ? null : index
                                )
                              }
                            >
                              {/* your right task JSX UI exactly same as before */}
                              <div className="h-[2.5cm]  flex justify-center items-center bg-[#FCF7B3]">
                                <div className="w-[70%] flex-col p-4 gap-2 ">
                                  <div
                                    style={{ fontFamily: "Rationale" }}
                                   className="text-4xl font-medium text-[#5C3609] ">
                                    {task.title}
                                  </div>
                                  <div className="text-sm font-light text-gray-500  p-1">
                                    Created At 10:00 AM
                                  </div>
                                </div>
                                <div className="w-[30%] flex  justify-center items-center gap-4 ">
                                  <button className="w-10 h-10 rounded-2xl bg-[#FAB981] flex justify-center items-center">
                                    <FaRegTrashAlt className="text-white text-2xl" />
                                  </button>
                                  <button className="w-10 h-10 rounded-2xl bg-[#FAB981] flex justify-center items-center p-3  ">
                                    <FaEllipsisV className="text-[#5C3609] text-2xl " />
                                  </button>
                                </div>
                              </div>
                              <div className="flex gap-3 p-2  bg-white  rounded-2xl ml-2 mr-2 mt-2 ">
                                <div className="w-[1.5cm] h-[1.5cm] bg-[#FAB981] rounded-3xl"></div>
                                <div className="flex  justify-between items-center gap-2 w-full   bg-white px-4  rounded-2xl ">
                                  <div className=" font-light  ">
                                    <div className="text-xl font-medium  text-gray-300">
                                      Usename
                                    </div>
                                    <div className="text-sm font-light text-gray-700 p-1 flex justify-center items-start ">
                                      online from 10:00 AM
                                    </div>
                                  </div>
                                  <div className="text-2xl  font-light bg-[#FCF7B3]  px-2 py-2 rounded-full text-yellow-400">
                                    <FaStar />
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-wrap p-4">
                                <h1 className="text-md text-gray-600">
                                  {task.description.length > 300
                                    ? `${task.description.slice(0, 300)}...`
                                    : task.description}
                                </h1>
                                <div className="text-sm mt-2 flex flex-wrap gap-2 px-2 py-2  rounded-2xl text-[#1C0424] font-semibold">
                                  <span className="flex items-center gap-1">
                                    <FaCalendarAlt /> {task.date}
                                  </span>
                                  <span className="px-2 py-1 rounded-2xl bg-green-100 text-green-800 font-semibold">
                                    {task.list}
                                  </span>
                                  <span className="flex items-center gap-1 px-2 py-1 font-semibold text-gray-500 ">
                                    <span
                                      className={`w-3 h-3 rounded-sm ${
                                        task.visibility === "public"
                                          ? "bg-green-400"
                                          : "bg-red-400"
                                      }`}
                                    ></span>
                                    {task.visibility}
                                  </span>
                                  <span className="flex items-center gap-1 px-2 py-1 font-semibold text-gray-500 ">
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
                                      className="bg-[#DEFF96] font-semibold px-3 py-1 rounded-xl"
                                    >
                                      #{tag}
                                    </span>
                                  ))}
                                  <span className="bg-[#DEFF96] font-semibold px-3 py-1 rounded-xl">
                                    {task.subTasks?.length || 0} subtasks
                                  </span>
                                </div>
                              </div>
                              <div
                                style={{ fontFamily: "Rationale" }}
                                className="flex   gap-28  justify-center  items-center   p-2    bg-[#FCF7B3]"
                              >
                                <div className="bg-[#FCF7B3] hover:bg-red-300 text-[#5C3609]  w-[4cm] h-[3cm] rounded-full cursor-pointer flex justify-center items-center text-4xl font-bold  border-1  border-[#1C0424]">
                                  Reject
                                </div>
                                <div className="bg-[#DEFF96]  text-black px-24 h-[2.5cm] rounded-3xl cursor-pointer flex justify-center items-center text-4xl font-bold border ">
                                  Done
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-[40%]">
        {selectedTaskIndex !== null && (
          <Panel
            task={tasks[selectedTaskIndex]}
            onChange={(updated) => updateTask(selectedTaskIndex, updated)}
            onDelete={() => deleteTask(selectedTaskIndex)}
          />
        )}
      </div>
    </section>
  );
}
