"use client";

import React from "react";
import { FaRegHandPaper } from "react-icons/fa";
import { useAuth } from "../../src/hook/useAuth";
import { useTodoStats } from "../../src/hook/useTodoStats";

export default function White() {
  const { user, activeAccountId, loading: authLoading } = useAuth();
  const { stats, loading, error } = useTodoStats(activeAccountId);

  if (authLoading || loading || !user || !stats) {
    return <div className="p-4 text-gray-500">Loading...</div>;
  }

  return (
    <section className="pl-6 pr-6 pt-5 pb-6 bg-gray-200 rounded-3xl w-full max-w-[25cm] h-[10cm]">
      <h2 className="text-xl font-medium text-gray-700 mb-2">Statistics</h2>

      <article className="mb-4 space-y-3">
        <div className="flex items-center text-2xl sm:text-5xl text-gray-900 font-semibold">
          Hello{" "}
          <FaRegHandPaper className="ml-3 text-2xl sm:text-5xl text-gray-700" />{" "}
          {stats.username || "User"}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="text-center sm:text-left">
            <p className="text-xl sm:text-2xl font-semibold text-gray-900">
              Your Overall Score Is
            </p>

            <div className="flex gap-2 items-center mt-2">
              <span className="block text-2xl sm:text-5xl font-bold text-gray-900">
                {stats.overallScore}
              </span>
            </div>
          </div>
        </div>
      </article>

      <div className="flex flex-wrap items-center gap-1 p-1 text-sm font-semibold text-gray-900">
        <div className="bg-white px-4 py-2 sm:py-3 rounded-3xl border border-gray-400 hover:border-[3px] transition">
          📈 Growth: {stats.growthPercent}
        </div>
        <div className="bg-white px-4 py-2 sm:py-3 rounded-3xl border border-gray-400 hover:border-[3px] transition">
          🏆 Best Result: {stats.bestResult} Tasks
        </div>
        <div className="bg-white w-14 h-14 rounded-full rotate-[-45deg] flex items-center justify-center ml-auto cursor-pointer border-2 border-gray-400 text-2xl hover:bg-gray-200 transition">
          →
        </div>
      </div>
    </section>
  );
}
