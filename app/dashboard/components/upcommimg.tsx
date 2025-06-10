'use client';
import React, { useState } from 'react';

type Task = {
  title: string;
  date?: string;
  subtasks?: number;
  tag?: string;
};

const initialTasksToday: Task[] = [
  { title: 'Research content ideas' },
  { title: 'Create a database of guest authors' },
  {
    title: 'Renew driver’s license',
    date: '2022-03-22',
    subtasks: 1,
    tag: 'Personal',
  },
  { title: 'Consult accountant' },
];

const initialTasksTomorrow: Task[] = [
  { title: 'Create job posting for SEO specialist' },
  { title: 'Request design assets for landing page' },
];

const initialTasksThisWeek: Task[] = [
  { title: 'Research content ideas' },
  { title: 'Create a database of guest authors' },
  { title: 'Renew driver’s license' },
  { title: 'Consult accountant' },
  { title: 'Print business card' },
];

const TaskItem = ({
  task,
  isChecked,
  onCheck,
}: {
  task: Task;
  isChecked: boolean;
  onCheck: () => void;
}) => (
  <div className="flex items-start justify-between hover:bg-gray-50 p-2 rounded cursor-pointer">
    <div className="flex gap-2 items-start">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(e) => {
          e.stopPropagation();
          onCheck();
        }}
        className="mt-1"
      />
      <div>
        <div className="font-medium text-gray-700 text-sm">{task.title}</div>
        {task.date && (
          <div className="flex gap-2 text-xs text-gray-500 mt-1 items-center">
            <span>📅 {task.date}</span>
            <span>🧩 {task.subtasks ?? 0} Subtasks</span>
            <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
              {task.tag}
            </span>
          </div>
        )}
      </div>
    </div>
    <span className="text-gray-400">{'>'}</span>
  </div>
);

export default function Upcoming() {
  const [todayInput, setTodayInput] = useState('');
  const [tomorrowInput, setTomorrowInput] = useState('');
  const [weekInput, setWeekInput] = useState('');

  const [tasksToday, setTasksToday] = useState<Task[]>(initialTasksToday);
  const [tasksTomorrow, setTasksTomorrow] = useState<Task[]>(initialTasksTomorrow);
  const [tasksThisWeek, setTasksThisWeek] = useState<Task[]>(initialTasksThisWeek);

  const [checkedTasks, setCheckedTasks] = useState<Set<string>>(new Set());

  const toggleCheck = (title: string) => {
    setCheckedTasks((prev) => {
      const newSet = new Set(prev);
      newSet.has(title) ? newSet.delete(title) : newSet.add(title);
      return newSet;
    });
  };

  const deleteCheckedTasks = () => {
    const filterTasks = (tasks: Task[]) =>
      tasks.filter((task) => !checkedTasks.has(task.title));

    setTasksToday(filterTasks(tasksToday));
    setTasksTomorrow(filterTasks(tasksTomorrow));
    setTasksThisWeek(filterTasks(tasksThisWeek));
    setCheckedTasks(new Set());
  };

  const renderTaskList = (tasks: Task[]) =>
    tasks.map((task, index) => (
      <div
        key={index}
        className="flex items-start justify-between mb-2 gap-4 border rounded-xl p-2"
      >
        <div className="flex-1">
          <TaskItem
            task={task}
            isChecked={checkedTasks.has(task.title)}
            onCheck={() => toggleCheck(task.title)}
          />
        </div>
      </div>
    ));

  return (
    <div className="w-[30cm] p-10 bg-white h-[18.5cm] overflow-y-scroll">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
          Upcoming{' '}
          <span className="text-gray-400 text-xl font-normal">
            {tasksToday.length + tasksTomorrow.length + tasksThisWeek.length}
          </span>
        </h1>
        <button
          onClick={deleteCheckedTasks}
          disabled={checkedTasks.size === 0}
          className={`px-4 py-2 rounded font-semibold ${
            checkedTasks.size === 0
              ? 'bg-gray-300 cursor-not-allowed text-gray-600'
              : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          Delete Selected
        </button>
      </div>

      {/* Sections */}
      <div className="flex gap-6 flex-wrap">
        {/* Today */}
        <section className="bg-white p-6 rounded-lg shadow border flex-1 min-w-[1000px]">
          <h2 className="text-2xl font-semibold mb-6">Today</h2>
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              placeholder="Add New Task"
              value={todayInput}
              onChange={(e) => setTodayInput(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 flex-grow text-sm"
            />
            <button
              onClick={() => {
                if (todayInput.trim()) {
                  setTasksToday([{ title: todayInput.trim() }, ...tasksToday]);
                  setTodayInput('');
                }
              }}
              className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700 transition"
            >
              + Add
            </button>
          </div>
          <div>{renderTaskList(tasksToday)}</div>
        </section>

        {/* Tomorrow */}
        <section className="bg-white p-6 rounded-lg shadow border flex-1 min-w-[320px]">
          <h2 className="text-2xl font-semibold mb-6">Tomorrow</h2>
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              placeholder="Add New Task"
              value={tomorrowInput}
              onChange={(e) => setTomorrowInput(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 flex-grow text-sm"
            />
            <button
              onClick={() => {
                if (tomorrowInput.trim()) {
                  setTasksTomorrow([{ title: tomorrowInput.trim() }, ...tasksTomorrow]);
                  setTomorrowInput('');
                }
              }}
              className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700 transition"
            >
              + Add
            </button>
          </div>
          <div>{renderTaskList(tasksTomorrow)}</div>
        </section>

        {/* This Week */}
        <section className="bg-white p-6 rounded-lg shadow border flex-1 min-w-[320px]">
          <h2 className="text-2xl font-semibold mb-6">This Week</h2>
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              placeholder="Add New Task"
              value={weekInput}
              onChange={(e) => setWeekInput(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 flex-grow text-sm"
            />
            <button
              onClick={() => {
                if (weekInput.trim()) {
                  setTasksThisWeek([{ title: weekInput.trim() }, ...tasksThisWeek]);
                  setWeekInput('');
                }
              }}
              className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700 transition"
            >
              + Add
            </button>
          </div>
          <div>{renderTaskList(tasksThisWeek)}</div>
        </section>
      </div>
    </div>
  );
}
