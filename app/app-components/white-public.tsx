"use client";

import React from "react";
import Image from "next/image";
import { useAuth } from "../../src/components/AuthContext";
import { usePublicTodos } from "../../src/hook/usePublicTodos";

export default function WhitePublic() {
  const { activeAccountId } = useAuth();
  const { todos, loading, error } = usePublicTodos(activeAccountId);

  if (loading || !todos) {
    return <div className="p-6 text-gray-500">Loading...</div>;
  }

  return (
    <div className="w-[15cm] h-[14cm] bg-gray-200 shadow-lg rounded-3xl overflow-hidden font-sans p-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <h1 className="text-3xl font-semibold">
          <span className="text-gray-400">by</span> HabitsJournal
        </h1>
        <div className="flex gap-2 pt-5">
          <span className="w-16 h-16 flex items-center justify-center bg-gray-600 text-white rounded-full text-sm font-medium">
            i
          </span>
          <span className="w-16 h-16 flex items-center justify-center bg-black text-white rounded-full text-sm font-medium">
            i
          </span>
        </div>
      </div>

      {/* Info Section */}
      <div>
        <h2 className="text-gray-800 text-3xl font-semibold">Community</h2>
        <p className="text-gray-600 text-5xl font-bold">{todos.length} Posts</p>
        <button className="flex items-center gap-2 font-light mt-2 underline text-gray-400 text-2xl">
          Read Now
          <span className="w-8 h-8 flex items-center justify-center bg-gray-400 text-gray-300 rounded-full text-xs">
            i
          </span>
        </button>
      </div>

      {/* Image with Overlay */}
      <div className="relative w-full p-2">
        <Image
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxctjU21pUENIsGN1F4qY21P7GfdEbhTMp2g&s"
          alt="Community Banner for Habits Journal"
          width={600}
          height={400}
          className="w-full h-[7cm] object-cover rounded-t-full rounded-l-full"
        />
        <div className="absolute top-4 left-24 bg-white bg-opacity-60 px-4 py-2 rounded-4xl text-black text-xl font-bold">
          habitsjournal.com
        </div>
        <div className="absolute bottom-[2.5cm] left-3">
          <span className="w-20 h-20 flex items-center justify-center bg-white text-black rounded-full text-sm font-semibold">
            i
          </span>
        </div>
      </div>
    </div>
  );
}
