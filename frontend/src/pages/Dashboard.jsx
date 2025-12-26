import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

import {
  FiChevronRight,
  FiCalendar,
  FiCheckCircle,
  FiList,
  FiClock,
} from "react-icons/fi";

const tasks = [
  {
    id: 1,
    title: "Research content ideas",
    completed: false,
    subtasks: 0,
    list: null,
    tags: [],
    due: null,
  },
  {
    id: 2,
    title: "Create a database of guest authors",
    completed: false,
    subtasks: 0,
    list: null,
    tags: [],
    due: null,
  },
  {
    id: 3,
    title: "Renew driver's license",
    completed: false,
    subtasks: 1,
    list: "Personal",
    tags: ["Personal"],
    due: "22-03-22",
  },
  {
    id: 4,
    title: "Consult accountant",
    completed: false,
    subtasks: 3,
    list: "List",
    tags: [],
    due: null,
  },
  {
    id: 5,
    title: "Print business card",
    completed: false,
    subtasks: 0,
    list: null,
    tags: [],
    due: null,
  },
];

function TaskList({
  onSelect,
  selectedId,
  tasks,
  onToggle,
  selectedIds = [],
  onSelectTask = () => {},
  onDeleteSelected = () => {},
}) {
  // Pagination state
  const [page, setPage] = useState(1);
  const tasksPerPage = 10;
  const totalPages = Math.max(1, Math.ceil(tasks.length / tasksPerPage));
  // Filter pills state
  const [filter, setFilter] = useState("ongoing");
  const filteredTasks =
    filter === "all"
      ? tasks
      : filter === "completed"
      ? tasks.filter((t) => t.completed)
      : tasks.filter((t) => !t.completed);
  const paginatedTasks = filteredTasks.slice(
    (page - 1) * tasksPerPage,
    page * tasksPerPage
  );
  return (
    <section className="flex-1 w-full max-w-full bg-white dark:bg-zinc-900 rounded-2xl p-5 sm:p-6 shadow-none sm:shadow-sm flex flex-col transition-all overflow-x-hidden">
      {/* Filter Pills */}

      <div className="flex flex-wrap items-center gap-2 mb-4 w-full">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-indigo-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          Today's Tasks
        </h3>

        <span className="px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700 text-xs font-semibold">
          {filteredTasks.length}
        </span>
      </div>
      <div className="flex flex-wrap gap-2 mb-3 w-full">
        <button
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-[11px] cursor-pointer font-semibold border transition-all ${
            filter === "all"
              ? "bg-indigo-100 text-indigo-700 border-indigo-300"
              : "bg-zinc-100 text-zinc-500 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700"
          }`}
          onClick={() => {
            setFilter("all");
            setPage(1);
          }}
        >
          <FiList className="w-4 h-4" /> All
        </button>
        <button
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-[11px] cursor-pointer font-semibold border transition-all ${
            filter === "ongoing"
              ? "bg-yellow-100 text-yellow-700 border-yellow-300"
              : "bg-zinc-100 text-zinc-500 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700"
          }`}
          onClick={() => {
            setFilter("ongoing");
            setPage(1);
          }}
        >
          <FiClock className="w-4 h-4" /> Ongoing
        </button>
        <button
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-[11px] cursor-pointer  font-semibold border transition-all ${
            filter === "completed"
              ? "bg-green-100 text-green-700 border-green-300"
              : "bg-zinc-100 text-zinc-500 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700"
          }`}
          onClick={() => {
            setFilter("completed");
            setPage(1);
          }}
        >
          <FiCheckCircle className="w-4 h-4" /> Completed
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-2 mb-2 w-full">
        <button
          className="flex items-center gap-2 px-4 py-2 border-0 border-b border-zinc-200 dark:border-zinc-800 rounded-none text-indigo-600 hover:bg-indigo-50 dark:hover:bg-zinc-800 transition-all text-xs font-semibold cursor-pointer"
          onClick={() =>
            typeof window !== "undefined" &&
            window.openAddTask &&
            window.openAddTask()
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add New Task
        </button>
        <button
          className={`flex items-center gap-2 px-3 py-2 border-0 border-b border-zinc-200 dark:border-zinc-800 rounded-none text-xs font-semibold cursor-pointer transition-all ${
            selectedIds.length === tasks.length && tasks.length > 0
              ? "text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900"
              : "text-green-600 hover:bg-green-50 dark:hover:bg-green-900"
          }`}
          onClick={() => {
            if (selectedIds.length === tasks.length && tasks.length > 0) {
              // Deselect all
              tasks.forEach((t) => onSelectTask(t.id));
            } else {
              // Select all
              tasks.forEach((t) => {
                if (!selectedIds.includes(t.id)) onSelectTask(t.id);
              });
            }
          }}
        >
          {selectedIds.length === tasks.length && tasks.length > 0 ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Deselect All
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Select All
            </>
          )}
        </button>
        {selectedIds.length > 0 ? (
          <button
            className="flex items-center gap-2 px-4 py-2 border-0 border-b border-zinc-200 dark:border-zinc-800 rounded-none text-red-600 hover:bg-red-50 dark:hover:bg-zinc-800 transition-all text-xs font-semibold cursor-pointer animate-fade-in"
            onClick={onDeleteSelected}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Delete Selected
          </button>
        ) : (
          <span className="flex items-center gap-1 text-zinc-400 text-xs ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Select tasks to delete
          </span>
        )}
      </div>
      {paginatedTasks.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center py-12">
          <div className="flex flex-col items-center">
            {filter === "completed" ? (
              <FiCheckCircle className="w-12 h-12 text-green-300 mb-2" />
            ) : filter === "ongoing" ? (
              <FiClock className="w-12 h-12 text-yellow-300 mb-2" />
            ) : (
              <FiList className="w-12 h-12 text-indigo-300 mb-2" />
            )}
            <div className="text-lg font-semibold text-zinc-500 mb-1">
              {filter === "completed"
                ? "No completed tasks yet"
                : filter === "ongoing"
                ? "No ongoing tasks yet"
                : "No tasks found"}
            </div>
            <div className="text-sm text-zinc-400">Try adding a new task!</div>
          </div>
        </div>
      ) : (
        <ul className="flex-1 flex flex-col divide-y divide-zinc-100 dark:divide-zinc-800 gap-0.5 w-full max-w-full">
          {paginatedTasks.map((task) => (
            <li key={task.id}>
              <div
                onClick={() => onSelect(task.id)}
                className={`w-full flex flex-wrap items-center gap-2 px-2 sm:px-3 py-3 transition-all text-left text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 ${
                  selectedId === task.id ? "bg-zinc-100 dark:bg-zinc-800" : ""
                } cursor-pointer`}
              >
                {/* Multi-select checkbox (delete) */}
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    className="accent-indigo-500 w-4 h-4 cursor-pointer border border-zinc-300"
                    checked={selectedIds.includes(task.id)}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectTask(task.id);
                    }}
                    onChange={() => {}}
                    title="Select for batch delete"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 text-indigo-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12H9"
                    />
                  </svg>
                </div>
                {/* Complete checkbox (green) */}
                <div className="flex items-center gap-1 ml-2">
                  <input
                    type="checkbox"
                    className="accent-green-500 w-4 h-4 cursor-pointer border border-green-400"
                    checked={task.completed}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => {
                      e.stopPropagation();
                      if (!task.completed) onToggle(task.id);
                    }}
                    title="Mark as completed"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div className="flex-1 flex flex-col min-w-0 break-words">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 w-full">
                    <span className="truncate text-sm font-medium">
                      {task.title}
                    </span>
                    {task.due && (
                      <span className="flex items-center gap-1 text-xs text-zinc-400 mt-1 sm:mt-0 sm:ml-2">
                        <FiCalendar className="inline-block w-4 h-4" />
                        {task.due}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    {/* Tag display with blink for Urgent */}
                    {task.list && (
                      <div className="flex items-center gap-1 mt-1">
                        {(() => {
                          // Find color from Sidebar lists
                          const sidebarLists = [
                            { name: "Personal", color: "#f87171" },
                            { name: "Work", color: "#60a5fa" },
                            { name: "List 1", color: "#fbbf24" },
                          ];
                          const found = sidebarLists.find(
                            (l) => l.name === task.list
                          );
                          const color = found ? found.color : "#e5e7eb";
                          return (
                            <span className="flex items-center gap-1">
                              <span
                                className="w-3 h-3 rounded border border-zinc-200 mr-1"
                                style={{ backgroundColor: color }}
                              />
                              <span
                                className="text-xs font-semibold"
                                style={{ color }}
                              >
                                {task.list}
                              </span>
                            </span>
                          );
                        })()}
                      </div>
                    )}
                    {task.tags && task.tags.length > 0 && (
                      <div className="flex items-center gap-2 mt-1">
                        {task.tags.map((tag, idx) => {
                          let color = "#e5e7eb";
                          if (tag === "Urgent") color = "#ef4444";
                          if (tag === "High Priority") color = "#f59e42";
                          if (tag === "Medium Priority") color = "#fde047";
                          return (
                            <span
                              key={tag + idx}
                              className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold" ${
                                tag === "Urgent" ? "animate-blink" : ""
                              }`}
                              style={{
                                backgroundColor: color,
                                color: tag === "Urgent" ? "#fff" : "#222",
                              }}
                            >
                              {tag}
                            </span>
                          );
                        })}
                        {/* Blinking animation style */}
                        <style>{`@keyframes blink { 50% { opacity: 0; } } .animate-blink { animation: blink 1s linear infinite; }`}</style>
                      </div>
                    )}
                  </div>
                </div>
                {task.subtasks > 0 && (
                  <span className="flex items-center gap-1 text-xs bg-zinc-100 dark:bg-zinc-700 px-2 py-0.5 rounded-md text-zinc-500">
                    {task.subtasks} Subtasks
                  </span>
                )}
                <FiChevronRight className="text-zinc-400 ml-2 w-5 h-5" />
              </div>
            </li>
          ))}
        </ul>
      )}
      {/* Tag Legend under task list */}
      <div className="flex flex-col items-start gap-2 mt-6 w-full max-w-full">
        <span className="text-xs font-bold text-zinc-500 mb-1">
          Tag Legend:
        </span>
        <div className="flex gap-3">
          <span
            className="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold"
            style={{
              backgroundColor: "#ef4444",
              color: "#fff",
              animation: "blink 2s linear infinite",
            }}
          >
            Urgent
          </span>
          <span
            className="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold"
            style={{ backgroundColor: "#f59e42", color: "#222" }}
          >
            High Priority
          </span>
          <span
            className="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold"
            style={{ backgroundColor: "#fde047", color: "#222" }}
          >
            Medium Priority
          </span>
        </div>
        <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2 mt-4 w-full max-w-full">
        <button
          className="px-1 flex items-center py-1 gap-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 text-xs font-medium disabled:opacity-50 cursor-pointer"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          <GrFormPrevious /> Prev
        </button>
        <span className="text-xs text-zinc-500">
          Page {page} of {totalPages}
        </span>
        <button
          className="px-1 py-1 flex items-center gap-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 text-xs font-medium disabled:opacity-50 cursor-pointer"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next <GrFormNext />
        </button>
      </div>
    </section>
  );
}

import { Fragment } from "react";
function TaskDetails({ task, open, onClose }) {
  // Demo lists array (replace with prop or state as needed)
  const demoLists = [
    { id: 1, name: "Personal", color: "#f87171" },
    { id: 2, name: "Work", color: "#60a5fa" },
    { id: 3, name: "List 1", color: "#fbbf24" },
  ];
  const lists = demoLists;
  // Custom dropdown state for list
  const [listDropdownOpen, setListDropdownOpen] = useState(false);
  useEffect(() => {
    function handleClick(e) {
      if (!e.target.closest(".custom-list-dropdown"))
        setListDropdownOpen(false);
    }
    if (listDropdownOpen) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [listDropdownOpen]);
  if (!task) {
    return (
      <aside className="hidden lg:flex flex-col w-85 bg-white dark:bg-zinc-900 rounded-2xl ml-2 p-4 shadow-sm transition-all">
        <h3 className="text-lg font-semibold mb-4">Task Details</h3>
        <div className="flex-1 flex items-center justify-center text-zinc-400">
          Select a task to view details.
        </div>
      </aside>
    );
  }
  // List info and edit/delete logic
  const [editList, setEditList] = useState(false);
  const [listName, setListName] = useState(task.list || "");
  const [listColor, setListColor] = useState("#fbbf24");
  // Find all tasks in this list
  const allTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  const listTasks = allTasks.filter((t) => t.list === task.list);
  const handleListSave = () => {
    // Save logic for list name/color (update all tasks with new list name/color)
    // ...implement as needed
    setEditList(false);
  };
  const handleListDelete = () => {
    // Delete all tasks in this list (or just the list property)
    // ...implement as needed
    setEditList(false);
  };
  // If no task is selected, show a placeholder
  if (!task) {
    return (
      <aside className="hidden lg:flex flex-col w-85 bg-white dark:bg-zinc-900 rounded-2xl ml-2 p-4 shadow-sm items-center justify-center text-zinc-400 text-center">
        <svg
          className="w-16 h-16 mb-4 text-zinc-200"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
        </svg>
        <span className="text-lg font-semibold">
          Select a task to view details
        </span>
      </aside>
    );
  }

  // Editable state for all fields, update when task changes
  const [editTask, setEditTask] = useState({
    title: task.title,
    description: task.description || "",
    list: task.list || "",
    due: task.due || "",
    tags: task.tags && Array.isArray(task.tags) ? task.tags.join(", ") : "",
    subtasks: Array.isArray(task.subtasks) ? task.subtasks : [],
  });
  const [subtaskInput, setSubtaskInput] = useState("");
  useEffect(() => {
    setEditTask({
      title: task.title,
      description: task.description || "",
      list: task.list || "",
      due: task.due || "",
      tags: task.tags && Array.isArray(task.tags) ? task.tags.join(", ") : "",
      subtasks: Array.isArray(task.subtasks) ? task.subtasks : [],
    });
    setSubtaskInput("");
  }, [task]);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setEditTask((prev) => ({ ...prev, [name]: value }));
  };
  const handleAddSubtask = () => {
    if (subtaskInput.trim()) {
      setEditTask((prev) => ({
        ...prev,
        subtasks: [...prev.subtasks, subtaskInput],
      }));
      setSubtaskInput("");
    }
  };
  const handleRemoveSubtask = (idx) => {
    setEditTask((prev) => ({
      ...prev,
      subtasks: prev.subtasks.filter((_, i) => i !== idx),
    }));
  };
  // Save update handler
  const handleSaveUpdate = () => {
    if (typeof window.updateTask === "function") {
      window.updateTask(task.id, {
        ...editTask,
        tags: editTask.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      });
    }
  };
  return (
    <Fragment>
      <aside className="hidden lg:flex flex-col w-85 bg-white dark:bg-zinc-900 rounded-2xl ml-2 p-8 shadow-lg transition-all border border-zinc-100 dark:border-zinc-800">
        <div className="mb-6 flex items-center gap-4">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-yellow-300 bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-400 text-yellow-700">
            <LuListTodo size={21} />
          </span>
          <textarea
            name="title"
            className="flex-1 px-3 py-2 rounded-md border border-transparent bg-transparent text-zinc-900 dark:text-white font-bold text-xl mb-0 focus:ring-1 focus:ring-yellow-400 transition-all outline-none break-words whitespace-pre-wrap"
            value={editTask.title}
            onChange={handleFieldChange}
            placeholder="Title"
            style={{
              fontSize: "1.1rem",
              minWidth: 0,
              wordBreak: "break-word",
              whiteSpace: "pre-wrap",
              overflowWrap: "break-word",
              display: "block",
              resize: "none", // optional: prevent resizing
            }}
          />
        </div>

        <div className="mb-4 flex items-start gap-3">
          <span className="mt-1 text-zinc-400">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </span>
          <textarea
            name="description"
            className="flex-1 px-3 py-2 rounded-md border border-transparent bg-transparent text-zinc-900 dark:text-white font-normal text-sm min-h-15 mb-0 focus:ring-1 focus:ring-yellow-400 transition-all outline-none"
            value={editTask.description}
            onChange={handleFieldChange}
            placeholder="Description"
            style={{ fontSize: "0.85rem", minWidth: 0 }}
          />
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 relative custom-list-dropdown">
            <span className="text-zinc-400">
              <MdOutlineChecklist />
            </span>
            <div className="flex-1 relative">
              <button
                type="button"
                className="w-full flex items-center justify-between px-3 py-2 rounded-md border border-transparent bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-medium text-sm focus:ring-1 focus:ring-yellow-400 transition-all outline-none cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700"
                onClick={() => setListDropdownOpen((open) => !open)}
              >
                <span className="flex items-center gap-2">
                  {(() => {
                    const selectedList = lists.find(
                      (l) => l.name === editTask.list
                    );
                    if (selectedList) {
                      return (
                        <span className="flex items-center gap-1">
                          <span
                            className="w-4 h-4 rounded border border-zinc-200 mr-1"
                            style={{ backgroundColor: selectedList.color }}
                          />
                          <span
                            className="text-sm"
                            style={{ color: selectedList.color }}
                          >
                            {selectedList.name}
                          </span>
                        </span>
                      );
                    }
                    return <span className="text-zinc-400">Select list</span>;
                  })()}
                </span>
                <svg
                  className="w-4 h-4 ml-2 text-zinc-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {listDropdownOpen && (
                <div className="absolute z-10 mt-2 w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg max-h-56 overflow-y-auto animate-fade-in">
                  {lists.length === 0 ? (
                    <div className="px-4 py-2 text-zinc-400 text-sm">
                      No lists found
                    </div>
                  ) : (
                    lists.map((l, idx) => (
                      <div
                        key={l.id || idx}
                        className={`flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-yellow-50 dark:hover:bg-zinc-800 ${
                          editTask.list === l.name
                            ? "bg-yellow-100 dark:bg-zinc-800 font-semibold"
                            : ""
                        }`}
                        onClick={() => {
                          setEditTask((prev) => ({ ...prev, list: l.name }));
                          setListDropdownOpen(false);
                        }}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded border border-zinc-200 mr-1"
                          style={{ backgroundColor: l.color }}
                        />
                        <span
                          className="truncate text-[12px]"
                          style={{ color: l.color }}
                        >
                          {l.name}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-zinc-400">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 4h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2z"
                />
              </svg>
            </span>
            <input
              name="due"
              type="date"
              className="flex-1 px-3 py-2 rounded-md border border-transparent bg-transparent text-zinc-900 dark:text-white font-medium text-sm mb-0 focus:ring-1 focus:ring-yellow-400 transition-all outline-none"
              value={editTask.due}
              onChange={handleFieldChange}
              style={{ fontSize: "0.85rem", minWidth: 0 }}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-zinc-400">
              <LiaHashtagSolid />
            </span>

            {/* Tag legend bar for selected tags */}
            <div className="flex flex-col gap-1 w-full">
              {Array.isArray(task.tags) && task.tags.length > 0 ? (
                task.tags.map((tag, idx) => {
                  let color = "#e5e7eb";
                  if (tag === "Urgent") color = "#ef4444";
                  if (tag === "High Priority") color = "#f59e42";
                  if (tag === "Medium Priority") color = "#fde047";
                  return (
                    <div key={tag + idx} className="flex items-center w-full">
                      <span
                        className="inline-block w-2 h-5 rounded-l mr-2"
                        style={{
                          backgroundColor: color,
                          animation:
                            tag === "Urgent"
                              ? "blink 1s linear infinite"
                              : undefined,
                        }}
                      ></span>
                      <span className="flex-1 text-xs font-semibold text-zinc-700 dark:text-zinc-100">
                        {tag}
                      </span>
                    </div>
                  );
                })
              ) : (
                <span className="text-xs text-zinc-400">No tag selected</span>
              )}
              <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <span className="block text-base font-semibold text-zinc-500 mb-1 flex items-center gap-2">
            <TbSubtask />
            <span className="text-sm">Subtasks</span>
          </span>
          <div className="flex flex-col gap-2">
            {editTask.subtasks.map((sub, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input
                  value={sub}
                  readOnly
                  className="flex-1 px-3 py-2 rounded-md border border-transparent bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white text-sm outline-none"
                  style={{ fontSize: "0.85rem", minWidth: 0 }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveSubtask(idx)}
                  className="text-red-400 hover:text-red-600 p-1 rounded-full bg-red-50 dark:bg-zinc-800 flex items-center justify-center cursor-pointer"
                  title="Remove Subtask"
                >
                  <HiOutlineTrash />
                </button>
              </div>
            ))}
            <div className="flex gap-2 mt-2">
              <input
                value={subtaskInput}
                onChange={(e) => setSubtaskInput(e.target.value)}
                className="flex-1 px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white text-sm outline-none"
                placeholder="Add subtask"
                style={{ fontSize: "0.85rem", minWidth: 0 }}
              />
              <button
                type="button"
                onClick={handleAddSubtask}
                className="px-3 py-2 rounded-lg bg-indigo-50 dark:bg-zinc-800 text-xs font-semibold text-indigo-600 hover:bg-indigo-100 dark:hover:bg-zinc-700 flex items-center gap-2 w-fit cursor-pointer"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add
              </button>
            </div>
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleSaveUpdate}
            className="flex-1 py-2  cursor-pointer rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-sm hover:from-yellow-500 hover:to-yellow-600 transition-all flex items-center gap-1 justify-center text-sm"
          >
            <LuSaveAll />
            Save Update
          </button>
          <button
            onClick={handleListDelete}
            className="flex-1 py-2 cursor-pointer rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white shadow-sm hover:from-red-600 hover:to-red-700 transition-all flex items-center gap-1 justify-center text-sm"
          >
            <BsTrash />
            Delete
          </button>
        </div>
        {/* Tag Legend in right menu bar */}
        <div className="flex flex-col mt-6 items-start gap-2 mb-6 mt-2 w-full">
          <span className="text-xs font-bold text-zinc-500 mb-1">
            Tag Legend:
          </span>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center w-full">
              <span className="inline-block w-2 h-5 rounded-l bg-[#ef4444] mr-2 animate-blink"></span>
              <span className="flex-1 text-xs font-semibold text-zinc-700 dark:text-zinc-100">
                Urgent
              </span>
            </div>
            <div className="flex items-center w-full">
              <span className="inline-block w-2 h-5 rounded-l bg-[#f59e42] mr-2"></span>
              <span className="flex-1 text-xs font-semibold text-zinc-700 dark:text-zinc-100">
                High Priority
              </span>
            </div>
            <div className="flex items-center w-full">
              <span className="inline-block w-2 h-5 rounded-l bg-[#fde047] mr-2"></span>
              <span className="flex-1 text-xs font-semibold text-zinc-700 dark:text-zinc-100">
                Medium Priority
              </span>
            </div>
          </div>
          <style>{`@keyframes blink { 50% { opacity: 0; } } .animate-blink { animation: blink 1s linear infinite; }`}</style>
        </div>
      </aside>
      {/* Modal for mobile */}
      {open && (
        <div className="fixed inset-0 p-2 z-50 flex items-center justify-center bg-black/30 lg:hidden">
          <div className="w-full max-w-sm bg-white dark:bg-zinc-900 rounded-2xl p-4 shadow-xl relative mx-2 overflow-y-auto max-h-[90vh]">
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-zinc-400 hover:text-zinc-600 text-xl font-bold"
            >
              &times;
            </button>
            <div className="mb-6 flex items-center gap-4">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-yellow-300 bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-400 text-yellow-700">
                <LuListTodo size={21} />
              </span>
              <textarea
                name="title"
                className="flex-1 px-3 py-2 rounded-md border border-transparent bg-transparent text-zinc-900 dark:text-white font-bold text-xl mb-0 focus:ring-1 focus:ring-yellow-400 transition-all outline-none break-words whitespace-pre-wrap"
                value={editTask.title}
                onChange={handleFieldChange}
                placeholder="Title"
                style={{
                  fontSize: "1.1rem",
                  minWidth: 0,
                  wordBreak: "break-word",
                  whiteSpace: "pre-wrap",
                  overflowWrap: "break-word",
                  display: "block",
                  resize: "none",
                }}
              />
            </div>
            <div className="mb-4 flex items-start gap-3">
              <span className="mt-1 text-zinc-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </span>
              <textarea
                name="description"
                className="flex-1 px-3 py-2 rounded-md border border-transparent bg-transparent text-zinc-900 dark:text-white font-normal text-sm min-h-15 mb-0 focus:ring-1 focus:ring-yellow-400 transition-all outline-none"
                value={editTask.description}
                onChange={handleFieldChange}
                placeholder="Description"
                style={{ fontSize: "0.85rem", minWidth: 0 }}
              />
            </div>
            <div className="mb-4 flex flex-col gap-2">
              <div className="flex items-center gap-2 relative custom-list-dropdown">
                <span className="text-zinc-400">
                  <MdOutlineChecklist />
                </span>
                <div className="flex-1 relative">
                  <button
                    type="button"
                    className="w-full flex items-center justify-between px-3 py-2 rounded-md border border-transparent bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white font-medium text-sm focus:ring-1 focus:ring-yellow-400 transition-all outline-none cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700"
                    onClick={() => setListDropdownOpen((open) => !open)}
                  >
                    <span className="flex items-center gap-2">
                      {(() => {
                        const selectedList = lists.find(
                          (l) => l.name === editTask.list
                        );
                        if (selectedList) {
                          return (
                            <span className="flex items-center gap-1">
                              <span
                                className="w-4 h-4 rounded border border-zinc-200 mr-1"
                                style={{ backgroundColor: selectedList.color }}
                              />
                              <span
                                className="text-sm"
                                style={{ color: selectedList.color }}
                              >
                                {selectedList.name}
                              </span>
                            </span>
                          );
                        }
                        return (
                          <span className="text-zinc-400">Select list</span>
                        );
                      })()}
                    </span>
                    <svg
                      className="w-4 h-4 ml-2 text-zinc-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {listDropdownOpen && (
                    <div className="absolute z-10 mt-2 w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg max-h-56 overflow-y-auto animate-fade-in">
                      {lists.length === 0 ? (
                        <div className="px-4 py-2 text-zinc-400 text-sm">
                          No lists found
                        </div>
                      ) : (
                        lists.map((l, idx) => (
                          <div
                            key={l.id || idx}
                            className={`flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-yellow-50 dark:hover:bg-zinc-800 ${
                              editTask.list === l.name
                                ? "bg-yellow-100 dark:bg-zinc-800 font-semibold"
                                : ""
                            }`}
                            onClick={() => {
                              setEditTask((prev) => ({
                                ...prev,
                                list: l.name,
                              }));
                              setListDropdownOpen(false);
                            }}
                          >
                            <span
                              className="w-3.5 h-3.5 rounded border border-zinc-200 mr-1"
                              style={{ backgroundColor: l.color }}
                            />
                            <span
                              className="truncate text-[12px]"
                              style={{ color: l.color }}
                            >
                              {l.name}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-zinc-400">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V3m8 4V3m-9 4h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2z"
                    />
                  </svg>
                </span>
                <input
                  name="due"
                  type="date"
                  className="flex-1 px-3 py-2 rounded-md border border-transparent bg-transparent text-zinc-900 dark:text-white font-medium text-sm mb-0 focus:ring-1 focus:ring-yellow-400 transition-all outline-none"
                  value={editTask.due}
                  onChange={handleFieldChange}
                  style={{ fontSize: "0.85rem", minWidth: 0 }}
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-zinc-400">
                  <LiaHashtagSolid />
                </span>
                <div className="flex flex-col gap-1 w-full">
                  {Array.isArray(task.tags) && task.tags.length > 0 ? (
                    task.tags.map((tag, idx) => {
                      let color = "#e5e7eb";
                      if (tag === "Urgent") color = "#ef4444";
                      if (tag === "High Priority") color = "#f59e42";
                      if (tag === "Medium Priority") color = "#fde047";
                      return (
                        <div
                          key={tag + idx}
                          className="flex items-center w-full"
                        >
                          <span
                            className="inline-block w-2 h-5 rounded-l mr-2"
                            style={{
                              backgroundColor: color,
                              animation:
                                tag === "Urgent"
                                  ? "blink 1s linear infinite"
                                  : undefined,
                            }}
                          ></span>
                          <span className="flex-1 text-xs font-semibold text-zinc-700 dark:text-zinc-100">
                            {tag}
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    <span className="text-xs text-zinc-400">
                      No tag selected
                    </span>
                  )}
                  <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <span className="block text-base font-semibold text-zinc-500 mb-1 flex items-center gap-2">
                <TbSubtask />
                <span className="text-sm">Subtasks</span>
              </span>
              <div className="flex flex-col gap-2">
                {editTask.subtasks.map((sub, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <input
                      value={sub}
                      readOnly
                      className="flex-1 px-3 py-2 rounded-md border border-transparent bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white text-sm outline-none"
                      style={{ fontSize: "0.85rem", minWidth: 0 }}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveSubtask(idx)}
                      className="text-red-400 hover:text-red-600 p-1 rounded-full bg-red-50 dark:bg-zinc-800 flex items-center justify-center cursor-pointer"
                      title="Remove Subtask"
                    >
                      <HiOutlineTrash />
                    </button>
                  </div>
                ))}
                <div className="flex gap-2 mt-2">
                  <input
                    value={subtaskInput}
                    onChange={(e) => setSubtaskInput(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white text-sm outline-none"
                    placeholder="Add subtask"
                    style={{ fontSize: "0.85rem", minWidth: 0 }}
                  />
                  <button
                    type="button"
                    onClick={handleAddSubtask}
                    className="px-3 py-2 rounded-lg bg-indigo-50 dark:bg-zinc-800 text-xs font-semibold text-indigo-600 hover:bg-indigo-100 dark:hover:bg-zinc-700 flex items-center gap-2 w-fit cursor-pointer"
                  >
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Add
                  </button>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleSaveUpdate}
                className="flex-1 py-2  cursor-pointer rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-sm hover:from-yellow-500 hover:to-yellow-600 transition-all flex items-center gap-1 justify-center text-sm"
              >
                <LuSaveAll />
                Save Update
              </button>
              <button
                onClick={handleListDelete}
                className="flex-1 py-2 cursor-pointer rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white shadow-sm hover:from-red-600 hover:to-red-700 transition-all flex items-center gap-1 justify-center text-sm"
              >
                <BsTrash />
                Delete
              </button>
            </div>
            {/* Tag Legend in right menu bar */}
            <div className="flex flex-col mt-6 items-start gap-2 mb-6 mt-2 w-full">
              <span className="text-xs font-bold text-zinc-500 mb-1">
                Tag Legend:
              </span>
              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center w-full">
                  <span className="inline-block w-2 h-5 rounded-l bg-[#ef4444] mr-2 animate-blink"></span>
                  <span className="flex-1 text-xs font-semibold text-zinc-700 dark:text-zinc-100">
                    Urgent
                  </span>
                </div>
                <div className="flex items-center w-full">
                  <span className="inline-block w-2 h-5 rounded-l bg-[#f59e42] mr-2"></span>
                  <span className="flex-1 text-xs font-semibold text-zinc-700 dark:text-zinc-100">
                    High Priority
                  </span>
                </div>
                <div className="flex items-center w-full">
                  <span className="inline-block w-2 h-5 rounded-l bg-[#fde047] mr-2"></span>
                  <span className="flex-1 text-xs font-semibold text-zinc-700 dark:text-zinc-100">
                    Medium Priority
                  </span>
                </div>
              </div>
              <style>{`@keyframes blink { 50% { opacity: 0; } } .animate-blink { animation: blink 1s linear infinite; }`}</style>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
import { useState, useEffect } from "react";
import { Delete } from "react-feather";
import { BsTrash } from "react-icons/bs";
import { LuListTodo, LuSaveAll, LuTrash2 } from "react-icons/lu";
import { LiaHashtagSolid, LiaSave } from "react-icons/lia";
import { CiBoxList } from "react-icons/ci";
import { MdOutlineChecklist } from "react-icons/md";
import { HiOutlineTrash } from "react-icons/hi";
import { TbSubtask } from "react-icons/tb";
import { GrFormNext, GrFormPrevious, GrTask } from "react-icons/gr";
import toast, { Toaster } from "react-hot-toast";

export default function Dashboard() {
  const [taskList, setTaskList] = useState(tasks);
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(tasks[0].id);
  const [showModal, setShowModal] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    list: "",
    due: "",
    tags: [],
    subtasks: [""],
  });
  // Responsive sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => {
    // Close sidebar on desktop resize
    const handleResize = () => {
      if (window.innerWidth > 768) setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [selectedTaskIds, setSelectedTaskIds] = useState([]);
  const [showListDropdown, setShowListDropdown] = useState(false);
  const selectedTask = taskList.find((t) => t.id === selectedTaskId);
  // On small screens, open modal when a task is selected
  const handleSelect = (id) => {
    setSelectedTaskId(id);
    if (window.innerWidth < 1024) setShowModal(true);
  };
  const handleClose = () => setShowModal(false);
  // Confirmation and success modals for marking as completed
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const handleToggle = (id) => {
    setTaskList((list) =>
      list.map((t) => (t.id === id ? { ...t, completed: true } : t))
    );
    toast.success("Task marked as completed successfully!");
  };
  // Multi-select logic
  const handleSelectTask = (id) => {
    setSelectedTaskIds((ids) =>
      ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id]
    );
  };
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const handleDeleteSelected = () => {
    setShowDeleteConfirm(true);
  };
  const confirmDeleteSelected = () => {
    setTaskList((list) => list.filter((t) => !selectedTaskIds.includes(t.id)));
    setSelectedTaskIds([]);
    setShowDeleteConfirm(false);
  };
  const cancelDeleteSelected = () => setShowDeleteConfirm(false);
  // Add Task Modal logic
  window.openAddTask = () => setShowAddTask(true);
  const closeAddTask = () => setShowAddTask(false);
  const handleNewTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubtaskChange = (idx, value) => {
    setNewTask((prev) => ({
      ...prev,
      subtasks: prev.subtasks.map((s, i) => (i === idx ? value : s)),
    }));
  };
  const addSubtask = () =>
    setNewTask((prev) => ({ ...prev, subtasks: [...prev.subtasks, ""] }));
  const removeSubtask = (idx) =>
    setNewTask((prev) => ({
      ...prev,
      subtasks: prev.subtasks.filter((_, i) => i !== idx),
    }));
  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.list === "") {
      toast.error("select a list before submitting");
    } else {
      setTaskList((prev) => [
        ...prev,
        {
          id: Date.now(),
          title: newTask.title,
          completed: false,
          subtasks: newTask.subtasks.filter(Boolean).length,
          list: newTask.list || null,
          tags: newTask.tags,
          due: newTask.due || null,
        },
      ]);
      setShowAddTask(false);
      setNewTask({
        title: "",
        description: "",
        list: "",
        due: "",
        tags: [],
        subtasks: [""],
      });
    }
  };
  return (
    <div className="min-h-screen flex w-[100%] bg-white dark:bg-zinc-900 transition-colors duration-300">
      {/* Sidebar for desktop, overlay for mobile */}
      <aside className="hidden md:flex h-full">
        <Sidebar />
      </aside>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar overlay"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Escape") setSidebarOpen(false);
            }}
          />
          <aside
            className="fixed top-0 left-0 z-50 h-full bg-white dark:bg-zinc-900 transition-transform duration-300 md:hidden md:shadow-xl"
            style={{
              transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
            }}
          >
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </aside>
        </>
      )}
      <main className="flex-1 flex flex-col">
        <Topbar onSidebarToggle={() => setSidebarOpen((s) => !s)} />
        <div className="flex-1 flex flex-row gap-2 md:gap-4 py-2 md:py-4 px-1 md:px-4">
          <TaskList
            onSelect={handleSelect}
            selectedId={selectedTaskId}
            tasks={taskList}
            onToggle={handleToggle}
            selectedIds={selectedTaskIds}
            onSelectTask={handleSelectTask}
            onDeleteSelected={handleDeleteSelected}
          />
          <TaskDetails
            task={selectedTask}
            open={showModal}
            onClose={handleClose}
          />
        </div>
        {/* Success Modal replaced by toast notification */}
        {/* Add New Task Modal */}
        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-2xl max-w-xs w-full flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-red-500 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <h3 className="text-lg font-bold mb-2 text-red-600 flex items-center gap-2">
                Confirm Delete
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-4 text-center">
                Are you sure you want to delete{" "}
                <span className="font-semibold">{selectedTaskIds.length}</span>{" "}
                selected task{selectedTaskIds.length > 1 ? "s" : ""}? This
                action cannot be undone.
              </p>
              <div className="flex gap-2 w-full mt-2">
                <button
                  onClick={cancelDeleteSelected}
                  className="flex-1 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteSelected}
                  className="flex-1 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white font-bold shadow-md hover:from-red-600 hover:to-red-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
        {showAddTask && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 sm:p-4">
            <div
              className="w-full max-w-lg bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl relative border border-zinc-100 dark:border-zinc-800 flex flex-col"
              style={{ maxHeight: "90vh" }}
            >
              <form
                onSubmit={handleAddTask}
                className="flex-1 flex flex-col gap-8 outline-none ring-0 overflow-y-auto relative p-4 sm:p-8"
                style={{
                  minHeight: 0,
                  maxHeight: "90vh",
                  scrollbarWidth: "none",
                }}
              >
                <button
                  type="button"
                  onClick={closeAddTask}
                  className="absolute top-4 right-4 text-zinc-400 hover:text-red-500 text-2xl font-bold cursor-pointer transition-colors"
                  aria-label="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <div className="mb-0">
                  <h2 className="text-[16px] font-bold text-blue-900 dark:text-white flex items-center gap-3 tracking-tight mb-2">
                    <GrTask />
                    Add New Task
                  </h2>
                  <ol className="list-decimal list-inside text-xs text-amber-500 opacity-60 space-y-1 ">
                    <li>Fill in all required fields below.</li>
                    <li>Use clear, concise information for each section.</li>
                    <li>
                      Click <b>Add Task</b> to save your entry.
                    </li>
                  </ol>
                </div>
                {/* Section: Task Details */}
                <div className="space-y-6">
                  <div>
                    <div className="flex flex-col gap-4">
                      <div>
                        <label className="block text-xs font-semibold mb-1 text-zinc-500 tracking-wide flex items-center gap-1">
                          <svg
                            className="w-4 h-4 text-indigo-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                          </svg>
                          Title
                        </label>
                        <input
                          name="title"
                          value={newTask.title}
                          onChange={handleNewTaskChange}
                          required
                          className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder:text-xs placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-indigo-400 text-base shadow-sm"
                          placeholder="e.g. Software Engineer, Data Analyst"
                          aria-describedby="title-help"
                        />
                        <p
                          id="title-help"
                          className="text-xs text-zinc-400 mt-1"
                        >
                          Enter the main title for your task or goal.
                        </p>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold mb-1 text-zinc-500 tracking-wide flex items-center gap-1">
                          <svg
                            className="w-4 h-4 text-amber-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 6h16M4 12h16M4 18h7"
                            />
                          </svg>
                          Description
                        </label>
                        <textarea
                          name="description"
                          value={newTask.description}
                          onChange={handleNewTaskChange}
                          className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white min-h-15 placeholder:text-xs placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-amber-400 text-base shadow-sm resize-none"
                          placeholder="Describe the task, project, or goal in detail."
                          aria-describedby="desc-help"
                        />
                        <p
                          id="desc-help"
                          className="text-xs text-zinc-400 mt-1"
                        >
                          Provide a brief summary or context for this task.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Section: Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-zinc-500 tracking-wide flex items-center gap-1">
                        <svg
                          className="w-4 h-4 text-blue-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        Due Date
                      </label>
                      <input
                        name="due"
                        type="date"
                        value={newTask.due}
                        onChange={handleNewTaskChange}
                        className="w-[100%] text-sm px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder:text-xs placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-blue-400 cursor-pointer shadow-sm"
                        aria-describedby="due-help"
                      />
                      <p id="due-help" className="text-xs text-zinc-400 mt-1">
                        Select a deadline for this task (optional).
                      </p>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-zinc-500 tracking-wide flex items-center gap-1">
                        <svg
                          className="w-4 h-4 text-pink-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                        List
                      </label>
                      <button
                        type="button"
                        className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-pink-400 cursor-pointer shadow-sm"
                        onClick={() => setShowListDropdown((v) => !v)}
                        aria-haspopup="listbox"
                        aria-expanded={showListDropdown}
                      >
                        <span className="flex items-center gap-2">
                          {(() => {
                            const sidebarLists = [
                              { name: "Personal", color: "#f87171" },
                              { name: "Work", color: "#60a5fa" },
                              { name: "List 1", color: "#fbbf24" },
                            ];
                            const found = sidebarLists.find(
                              (l) => l.name === newTask.list
                            );
                            return found ? (
                              <span className="flex items-center gap-1">
                                <span
                                  className="w-4 h-4 rounded border border-zinc-200 mr-1"
                                  style={{ backgroundColor: found.color }}
                                />
                                <span className="text-sm font-medium">
                                  {found.name}
                                </span>
                              </span>
                            ) : (
                              <span className="text-sm text-zinc-400">
                                Select List
                              </span>
                            );
                          })()}
                        </span>
                        <svg
                          className="w-4 h-4 ml-2 text-zinc-400"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      {showListDropdown && (
                        <div className="absolute z-20 mt-2 sm:w-[40%] w-[50%] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-lg max-h-56 overflow-y-auto animate-fade-in">
                          {[
                            { name: "Personal", color: "#f87171" },
                            { name: "Work", color: "#60a5fa" },
                            { name: "List 1", color: "#fbbf24" },
                          ].map((list) => (
                            <div
                              key={list.name}
                              className={`flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-pink-50 dark:hover:bg-zinc-800 ${
                                newTask.list === list.name
                                  ? "bg-pink-100 dark:bg-zinc-800 font-semibold"
                                  : ""
                              }`}
                              onClick={() => {
                                setNewTask((prev) => ({
                                  ...prev,
                                  list: list.name,
                                }));
                                setShowListDropdown(false);
                              }}
                            >
                              <span
                                className="w-4 h-4 rounded border border-zinc-200 mr-1"
                                style={{ backgroundColor: list.color }}
                              />
                              <span className="truncate text-[13px]">
                                {list.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                      <p className="text-xs text-zinc-400 mt-1">
                        Choose a category for this task.
                      </p>
                    </div>
                  </div>
                  {/* Section: Tag & Subtasks */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-zinc-500 tracking-wide flex items-center gap-1">
                        <svg
                          className="w-4 h-4 text-red-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <circle cx="12" cy="12" r="10" />
                        </svg>
                        Tag
                      </label>
                      <button
                        type="button"
                        className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-red-400 cursor-pointer shadow-sm"
                        onClick={() => setShowTagDropdown((v) => !v)}
                        aria-haspopup="listbox"
                        aria-expanded={showTagDropdown}
                      >
                        <span className="flex items-center gap-2">
                          {(() => {
                            const tagOptions = [
                              { name: "Urgent", color: "#ef4444" },
                              { name: "High Priority", color: "#f59e42" },
                              { name: "Medium Priority", color: "#fde047" },
                            ];
                            const found = tagOptions.find((t) =>
                              newTask.tags.includes(t.name)
                            );
                            return found ? (
                              <span className="flex items-center gap-1">
                                <span
                                  className="w-4 h-4 rounded border border-zinc-200 mr-1"
                                  style={{ backgroundColor: found.color }}
                                />
                                <span className="text-sm font-medium">
                                  {found.name}
                                </span>
                              </span>
                            ) : (
                              <span className="text-sm text-zinc-400">
                                Select Tag
                              </span>
                            );
                          })()}
                        </span>
                        <svg
                          className="w-4 h-4 ml-2 text-zinc-400"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      {showTagDropdown && (
                        <div className="absolute z-20 mt-2 sm:w-[40%] w-[50%]  bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-lg max-h-56 overflow-y-auto animate-fade-in">
                          {[
                            { name: "Urgent", color: "#ef4444" },
                            { name: "High Priority", color: "#f59e42" },
                            { name: "Medium Priority", color: "#fde047" },
                          ].map((tag) => (
                            <div
                              key={tag.name}
                              className={`flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-red-50 dark:hover:bg-zinc-800 ${
                                newTask.tags.includes(tag.name)
                                  ? "bg-red-100 dark:bg-zinc-800 font-semibold"
                                  : ""
                              }`}
                              onClick={() => {
                                setNewTask((prev) => ({
                                  ...prev,
                                  tags: [tag.name],
                                }));
                                setShowTagDropdown(false);
                              }}
                            >
                              <span
                                className="w-4 h-4 rounded border border-zinc-200 mr-1"
                                style={{ backgroundColor: tag.color }}
                              />
                              <span className="truncate text-[13px]">
                                {tag.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                      <style>{`@keyframes blinker { 50% { opacity: 0; } }`}</style>
                      <p className="text-xs text-zinc-400 mt-1">
                        Assign a priority or label to this task.
                      </p>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1 text-zinc-500 tracking-wide flex items-center gap-1">
                        <svg
                          className="w-4 h-4 text-green-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        Subtasks
                      </label>
                      <div className="flex flex-col gap-2">
                        {newTask.subtasks.map((sub, idx) => (
                          <div key={idx} className="flex gap-2 items-center">
                            <input
                              value={sub}
                              onChange={(e) =>
                                handleSubtaskChange(idx, e.target.value)
                              }
                              className="w-[100%] flex-1 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder:text-xs placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-green-400 text-base shadow-sm"
                              placeholder={`Subtask ${idx + 1}`}
                            />
                            <button
                              type="button"
                              onClick={() => removeSubtask(idx)}
                              className="text-red-400 hover:text-red-600 p-1 rounded-full bg-red-50 dark:bg-zinc-800 flex items-center justify-center cursor-pointer transition-colors"
                              title="Remove Subtask"
                            >
                              <LuTrash2 />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={addSubtask}
                          className="mt-1 px-4 py-2 rounded-lg bg-green-50 dark:bg-zinc-800 text-xs font-semibold text-green-600 hover:bg-green-100 dark:hover:bg-zinc-700 flex items-center gap-2 w-fit cursor-pointer transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                          Add Subtask
                        </button>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1">
                        Break down the task into smaller steps (optional).
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-sm py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-bold shadow-md hover:from-indigo-600 hover:to-indigo-700 transition-all mt-2 cursor-pointer flex items-center gap-2 justify-center"
                >
                  <LuSaveAll />
                  Add Task
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
