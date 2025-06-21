"use client";
import React, { useState } from "react";
import { FaCalendarAlt, FaStar, FaUserAlt } from "react-icons/fa";

interface Task {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  description: string;
  date: string;
  list: string;
  visibility: "public" | "private";
  priority: "low" | "medium" | "high";
  tags: string[];
  subTasks: string[];
}

export default function ToDoApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [contactData, setContactData] = useState({
    firstName: "",
    lastName: "",
    title: "",
    description: "",
    email: "",
    role: "",
    howFound: "",
  });

  const handleContactChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setContactData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTask: Task = {
      id: crypto.randomUUID(),
      firstName: contactData.firstName,
      lastName: contactData.lastName,
      title: contactData.title,
      description: `Email: ${contactData.email}, Role: ${contactData.role}, Found via: ${contactData.howFound}  ${contactData.description}`,
      date: new Date().toISOString().split("T")[0],
      list: "Contact",
      visibility: "public",
      priority: "medium",
      tags: [
        ...(contactData.role ? [contactData.role] : []),
        ...(contactData.howFound ? [contactData.howFound] : []),
      ],
      subTasks: [],
    };

    setTasks((prev) => [...prev, newTask]);

    setContactData({
      firstName: "",
      lastName: "",
      title: "",
      description: "",
      email: "",
      role: "",
      howFound: "",
    });

    alert("Contact submitted and added to tasks!");
  };

  const getPriorityColor = (priority: string) => {
    if (priority === "high") return "bg-red-500";
    if (priority === "medium") return "bg-yellow-400";
    return "bg-green-500";
  };

  const renderCard = (task: Task) => (
    <div
      key={task.id}
      className="rounded-2xl overflow-hidden bg-[#DDCCFF] border border-[#670D19] shadow-md"
    >
      <div
           style={{ fontFamily: "Rationale" }}
      
      className="h-[4cm] flex justify-center items-center bg-[#FCF7B3]">
        <div className="w-[70%] flex-col p-4 gap-2">
          <div className="text-7xl font-medium text-[#5C3609]  uppercase">
            {task.firstName} {task.lastName}
          </div>
        </div>
      </div>

      <div className="flex gap-3 p-2 bg-white h-[4cm]">
        <div className="w-[3.5cm] h-[3cm] bg-[#FCF7B3] rounded-3xl flex justify-center items-center text-7xl text-[#5C3609] ">
          <FaUserAlt />
        </div>
        <div className="flex justify-between items-center gap-2 w-full bg-white px-4 rounded-2xl">
          <div className="text-lg font-light">
            <div className="font-medium text-4xl text-[#5C3609] mb-[2cm]">
              {task.title}
            </div>
          </div>
          <div className="text-4xl font-light bg-[#FCF7B3] px-5 py-5 rounded-full text-yellow-400">
            <FaStar />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap p-4 bg-white">
        <p className="text-xl">{task.description}</p>

        <div className="text-lg mt-2 flex flex-wrap gap-2 px-2 py-2 rounded-2xl text-[#1C0424] font-semibold justify-center items-center pl-[2cm]">
          <span className="flex items-center gap-1">
            <FaCalendarAlt /> {task.date}
          </span>
          <span className="px-2 py-1 rounded-2xl bg-green-100 text-green-800 font-semibold">
            {task.list}
          </span>
          <span className="flex items-center gap-1 px-2 py-1 font-semibold">
            <span className="w-3 h-3 rounded-sm bg-green-400" />
            {task.visibility}
          </span>
          <span className="flex items-center gap-1 px-2 py-1 font-semibold">
            <span
              className={`w-3 h-3 rounded-sm ${getPriorityColor(
                task.priority
              )}`}
            />
            {task.priority}
          </span>
          {task.tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-[#DEFF96] font-semibold px-3 py-1 rounded-xl"
            >
              #{tag}
            </span>
          ))}
          <span className="bg-[#DEFF96] font-semibold px-3 py-1 rounded-xl">
            {task.subTasks.length} subtasks
          </span>
        </div>
      </div>

      <div
          style={{ fontFamily: "Rationale" }}
      className="flex h-[4cm] gap-28 justify-center items-center p-2 bg-[#FCF7B3]">
        <div className=" hover:bg-red-300 text-[#5C3609]  w-[7cm] h-[3cm] rounded-full cursor-pointer flex justify-center items-center text-4xl font-bold border border-[#1C0424]">
          Reject
        </div>
        <div className="bg-[#DEFF96] text-black px-24 h-[2.5cm] rounded-3xl cursor-pointer flex justify-center items-center text-4xl font-bold border">
          Done
        </div>
      </div>
    </div>
  );

  const previewTask: Task = {
    id: "preview",
    firstName: contactData.firstName || "First",
    lastName: contactData.lastName || "Last",
    title: contactData.title || "Untitled",
   description: `Email: ${contactData.email || "email@example.com"}, ${contactData.description || ""}, Role: ${contactData.role || "Role"}, Found via: ${contactData.howFound || "Source"}`,

    date: new Date().toISOString().split("T")[0],
    list: "Contact",
    visibility: "public",
    priority: "medium",
    tags: [
      contactData.role || "role",
      contactData.howFound || "source",
    ],
    subTasks: [],
  };

  return (
    <div className="min-h-screen w-full  flex flex-col lg:flex-row justify-center items-start gap-6 p-10">
      <div className="w-[60%] flex flex-col gap-6">
        {renderCard(previewTask)}
        {tasks.map(renderCard)}
      </div>

      <div className="w-[40%]">
        <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col gap-6">
          <h2 
              style={{ fontFamily: "Rationale" }}
          
          className="text-3xl font-bold   text-[#5C3609]  uppercase">Contact Info</h2>
          <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
            <div className="flex gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={contactData.firstName}
                onChange={handleContactChange}
                className="w-full p-4 border rounded-xl"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={contactData.lastName}
                onChange={handleContactChange}
                className="w-full p-4 border rounded-xl"
                required
              />
            </div>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={contactData.title}
              onChange={handleContactChange}
              className="w-full p-4 border rounded-xl"
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={contactData.description}
              onChange={handleContactChange}
              className="w-full p-4 border rounded-xl"
            />
            <input
              type="email"
              name="email"
              placeholder="Work Email"
              value={contactData.email}
              onChange={handleContactChange}
              className="p-4 border rounded-xl"
              required
            />
            <select
              name="role"
              value={contactData.role}
              onChange={handleContactChange}
              className="p-4 border rounded-xl"
              required
            >
              <option value="">Select Role</option>
              <option value="founder">Founder</option>
              <option value="ceo">CEO</option>
              <option value="cfo">CFO</option>
              <option value="vp">VP</option>
              <option value="director">Director</option>
              <option value="manager">Manager</option>
              <option value="other">Other</option>
            </select>
            <select
              name="howFound"
              value={contactData.howFound}
              onChange={handleContactChange}
              className="p-4 border rounded-xl"
              required
            >
              <option value="">How did you find us?</option>
              <option value="x">X (Twitter)</option>
              <option value="linkedin">LinkedIn</option>
              <option value="google">Google</option>
              <option value="youtube">YouTube</option>
              <option value="word_of_mouth">Word of Mouth</option>
              <option value="podcast">Podcast</option>
            </select>
            <button
              type="submit"
              className="bg-[#DEFF96] text-[#001B2E] font-bold py-3 rounded-xl"
            >
              Submit Info
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
