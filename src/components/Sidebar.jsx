import {
  FiSearch,
  FiCalendar,
  FiSettings,
  FiLogOut,
  FiPlus,
} from "react-icons/fi";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import {
  PiUserCircleLight,
  PiBriefcaseLight,
  PiListBulletsLight,
  PiCalendarCheckLight,
  PiStarLight,
  PiNoteLight,
  PiCalendarBlankLight,
} from "react-icons/pi";

import { Link, useLocation } from "react-router-dom";
const views = [
  {
    name: "Upcoming",
    icon: <PiCalendarCheckLight className="text-indigo-400 text-base" />,
    count: 5,
  },

  {
    name: "Calendar",
    icon: <PiCalendarBlankLight className="text-cyan-400 text-base" />,
    count: 0,
  },
  {
    name: "Sticky Wall",
    icon: <PiNoteLight className="text-yellow-400 text-base" />,
    count: 1,
  },
];

const defaultLists = [
  { name: "Personal", color: "#f87171", count: 3 },
  { name: "Work", color: "#60a5fa", count: 6 },
  { name: "List 1", color: "#fbbf24", count: 3 },
];

const tags = [
  { name: "Tag 1", color: "bg-zinc-200 text-zinc-700" },
  { name: "Tag 2", color: "bg-zinc-200 text-zinc-700" },
];

export default function Sidebar({
  activeView = "Upcoming",
  onViewChange,
  lists: propLists,
  setLists: setPropLists,
  onClose,
  showCancel = true,
}) {
  const [search, setSearch] = useState("");
  const [lists, setLists] =
    propLists && setPropLists
      ? [propLists, setPropLists]
      : useState(defaultLists);
  const [showAddList, setShowAddList] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [newListColor, setNewListColor] = useState("#6366f1");
  const colorPalette = [
    "#f87171", // red
    "#fbbf24", // yellow
    "#60a5fa", // blue
    "#34d399", // green
    "#a78bfa", // purple
    "#f472b6", // pink
    "#f59e42", // orange
    "#38bdf8", // sky
    "#facc15", // amber
    "#6ee7b7", // teal
    "#6366f1", // indigo
    "#e879f9", // fuchsia
    "#fcd34d", // gold
    "#4ade80", // emerald
    "#818cf8", // violet
    "#fca5a5", // light red
    "#fde68a", // light yellow
    "#a3e635", // lime
    "#fda4af", // rose
    "#c084fc", // purple dark
  ];

  const handleAddList = (e) => {
    e.preventDefault();
    if (!newListName.trim()) return;
    setLists((prev) => [
      ...prev,
      { name: newListName.trim(), color: newListColor, count: 0 },
    ]);
    setNewListName("");
    setNewListColor("#6366f1");
    setShowAddList(false);
  };

  return (
    <>
      <aside className="flex flex-col h-full sm:w-90 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border-r border-zinc-200 dark:border-zinc-800  p-6 gap-4 transition-colors duration-300 md:static md:translate-x-0 md:shadow-none relative overflow-y-auto">
        {/* Cancel/Close Button */}
        {showCancel && (
          <button
            type="button"
            onClick={() => onClose && onClose()}
            className="absolute top-3 right-3 text-zinc-400 hover:text-zinc-600 text-2xl font-bold cursor-pointer z-10"
            aria-label="Close Sidebar"
          >
            &times;
          </button>
        )}
        {/* Logo / App Name */}
        <div className="flex items-center gap-1 mb-2">
          <div>
            <img
              src="https://static.vecteezy.com/system/resources/previews/009/591/562/non_2x/check-mark-icon-free-png.png"
              alt=""
              width={40}
            />
          </div>
          <span className="font-bold text-lg tracking-tight text-zinc-900 dark:text-white">
            Taskora
          </span>
        </div>
        {/* Search */}
        <div className="relative mb-4">
          <FiSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
          />
        </div>
        {/* Views */}
        <nav className="flex flex-col gap-1 mb-2">
          <span className="text-xs font-medium text-zinc-400 uppercase px-2 mb-1">
            Views
          </span>
          <Link
            to="/"
            className={`flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all group cursor-pointer ${
              useLocation().pathname === "/"
                ? "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300"
                : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200"
            }`}
          >
            <span className="w-6 h-6 flex items-center justify-center">
              <PiCalendarCheckLight className="text-indigo-400 text-base" />
            </span>
            <span className="flex-1 text-left text-sm font-normal">
              Dashboard
            </span>
            <span className="ml-2 min-w-[1.5rem] h-6 flex items-center justify-center bg-zinc-100 dark:bg-zinc-700 text-xs font-semibold text-zinc-500 rounded-md px-2">
              5
            </span>
          </Link>
        </nav>
        <hr className="border-zinc-200 dark:border-zinc-700 my-2" />
        {/* Lists */}
        <div className="mb-2">
          <span className="text-xs font-medium text-zinc-400 uppercase px-2 mb-1">
            Lists
          </span>
          <div className="flex flex-col gap-1">
            {lists.map((list) => (
              <div
                key={list.name}
                className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200 transition-all group cursor-pointer"
              >
                <span
                  className="w-5 h-5 rounded-md border border-zinc-200 dark:border-zinc-700 mr-1"
                  style={{ backgroundColor: list.color }}
                />
                <span className="flex-1 text-left text-sm font-normal">
                  {list.name}
                </span>
                <span className="ml-2 min-w-[1.5rem] h-6 flex items-center justify-center bg-zinc-100 dark:bg-zinc-700 text-xs font-semibold text-zinc-500 rounded-md px-2">
                  {list.count}
                </span>
              </div>
            ))}
            <button
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 transition-all group"
              onClick={() => setShowAddList(true)}
            >
              <FiPlus className="w-5 h-5" />
              <span className="flex-1 text-left text-sm font-normal">
                Add New List
              </span>
            </button>
          </div>
        </div>
        {/* Tags */}

        {/* Tag Legend Section */}
        <div className="mt-6 px-2">
          <span className="text-xs font-medium text-zinc-400 uppercase">
            Tag Legend
          </span>
          <ul className="space-y-3 mt-3">
            <li className="flex items-center">
              <span
                className="inline-block w-4 h-4 rounded mr-2"
                style={{ backgroundColor: "#ef4444" }}
              ></span>
              <span className="text-sm text-gray-700">Urgent</span>
            </li>
            <li className="flex items-center">
              <span
                className="inline-block w-4 h-4 rounded mr-2"
                style={{ backgroundColor: "#f59e42" }}
              ></span>
              <span className="text-sm text-gray-700">High Priority</span>
            </li>
            <li className="flex items-center">
              <span
                className="inline-block w-4 h-4 rounded mr-2"
                style={{ backgroundColor: "#fde047" }}
              ></span>
              <span className="text-sm text-gray-700">Medium Priority</span>
            </li>
          </ul>
        </div>
        <div className="flex-1" />
        {/* Settings & Sign out */}
        <div className="flex flex-col gap-1 mt-auto">
          <Link
            to="/profile"
            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200 transition-all group"
          >
            <PiUserCircleLight className="text-lg" />
            <span className="flex-1 text-left text-sm font-normal">
              Profile
            </span>
          </Link>
          <Link
            to="/settings"
            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200 transition-all group"
          >
            <FiSettings className="text-lg" />
            <span className="flex-1 text-left text-sm font-normal">
              Settings
            </span>
          </Link>
          <button className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400 transition-all group">
            <FiLogOut className="text-lg" />
            <span className="flex-1 text-left text-sm font-normal">
              Sign out
            </span>
          </button>
        </div>
      </aside>
      {/* Add List Modal rendered via portal for full-screen overlay */}
      {showAddList &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <form
              onSubmit={handleAddList}
              className="relative bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-6 max-w-xs w-full mx-auto flex flex-col gap-5 border border-zinc-100 dark:border-zinc-800 animate-fade-in"
              style={{ minWidth: 0 }}
            >
              <button
                type="button"
                onClick={() => setShowAddList(false)}
                className="absolute top-3 right-3 text-zinc-400 hover:text-zinc-600 text-2xl font-bold cursor-pointer"
                aria-label="Close"
              >
                &times;
              </button>
              <div className="flex flex-col items-center gap-2 mb-2">
                <span
                  className="w-12 h-12 rounded-xl border-2 border-zinc-200 dark:border-zinc-700"
                  style={{ backgroundColor: newListColor }}
                />
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  Add New List
                </h3>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1 text-zinc-500">
                  List Name
                </label>
                <input
                  className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  placeholder="e.g. Shopping"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1 text-zinc-500">
                  Color
                </label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {colorPalette.map((color) => (
                    <button
                      type="button"
                      key={color}
                      className={`w-7 h-7 rounded-md border-2 transition-all duration-150 ${
                        newListColor === color
                          ? "border-indigo-500 scale-110 shadow-lg"
                          : "border-zinc-200 dark:border-zinc-700 opacity-80 hover:opacity-100"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setNewListColor(color)}
                      aria-label={color}
                    />
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold shadow-md hover:from-indigo-600 hover:to-indigo-700 transition-all mt-1 cursor-pointer text-sm tracking-tight"
              >
                Add List
              </button>
            </form>
          </div>,
          document.body
        )}
    </>
  );
}
