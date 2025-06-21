"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "../../src/lib/axiosInstance";
import { useAuth } from "../../src/context/AuthContext";
import Image from "next/image";

interface Todo {
  id: string;
  username: string;
  handle: string;
  content: string;
  avatar: string;
  likes: number;
  shares: number;
  comments: number;
  saves: number;
  views: number;
}

export default function SocialMediaTodos() {

  const { activeAccountId } = useAuth(); // ✅ This is missing in your code

  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {

    
      try {


 const res = await axiosInstance.get("/api/v1/todo/all", {
          params: { accountId: activeAccountId },
        })





        setTodos(res.data.todos);
      } catch (err) {
        console.error("Failed to fetch public todos", err);
        setError("Failed to load todos. Try again later.");
      }
    };
    fetchTodos();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-extrabold text-gray-800">Public Todos</h1>
          <p className="text-gray-500">See what others are planning publicly.</p>
        </header>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        {todos.map((todo) => (
          <div
            key={todo.id}
            className="bg-white rounded-xl shadow-md p-5 mb-6 border border-gray-200 hover:shadow-lg transition"
          >
            <div className="flex items-center mb-4">
              <div className="relative w-12 h-12 mr-4">
                <Image
                  src={todo.avatar}
                  alt={todo.username + " avatar"}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <h2 className="font-bold text-lg text-gray-800">{todo.username}</h2>
                <p className="text-sm text-gray-500">@{todo.handle}</p>
              </div>
            </div>

            <p className="text-gray-800 text-lg mb-4 whitespace-pre-line">{todo.content}</p>

            <div className="flex flex-wrap gap-3 text-sm text-gray-600 font-semibold">
              <span className="hover:text-blue-600 cursor-pointer">👍 {todo.likes}</span>
              <span className="hover:text-blue-600 cursor-pointer">🔁 {todo.shares}</span>
              <span className="hover:text-blue-600 cursor-pointer">💬 {todo.comments}</span>
              <span className="hover:text-blue-600 cursor-pointer">💾 {todo.saves}</span>
              <span className="hover:text-blue-600 cursor-pointer">👀 {todo.views}</span>
            </div>
          </div>
        ))}

        {todos.length === 0 && !error && (
          <p className="text-center text-gray-500 mt-20">No public todos yet.</p>
        )}
      </div>
    </main>
  );
}