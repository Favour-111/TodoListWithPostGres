import {
  FiSearch,
  FiBell,
  FiCalendar,
  FiClock,
  FiUser,
  FiMenu,
} from "react-icons/fi";
import { useEffect, useState } from "react";

export default function Topbar({
  user = {
    name: "Vincent",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  onSidebarToggle,
}) {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const dateStr = dateTime.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeStr = dateTime.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <header className="flex items-center w-[100%] justify-between px-3 sm:px-6 py-3 border-b border-zinc-100 dark:border-zinc-800 shadow-sm">
      <div className="flex items-center justify-between gap-3 flex-1 min-w-0">
        {/* Hamburger for mobile */}
        <button
          className="md:hidden mr-2 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          aria-label="Open sidebar menu"
          onClick={onSidebarToggle}
        >
          <FiMenu className="w-5 h-5" />
        </button>
        <div className="flex flex-col min-w-0">
          <span className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-1 truncate">
            Welcome back,{" "}
            <span className="font-bold text-indigo-600 dark:text-indigo-300 truncate">
              {user.name}
            </span>{" "}
            <span className="text-lg">👋</span>
          </span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 flex items-center gap-1">
            <FiCalendar className="w-4 h-4 mr-0.5" /> {dateStr}
            {/* <FiClock className="w-4 h-4 ml-3 mr-0.5" /> {timeStr} */}
          </span>
        </div>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 dark:bg-zinc-800 text-indigo-600 dark:text-indigo-300 shadow flex-shrink-0">
          <FiUser className="w-6 h-6" />
        </span>
      </div>
      {/* Profile icon at the end */}
    </header>
  );
}
