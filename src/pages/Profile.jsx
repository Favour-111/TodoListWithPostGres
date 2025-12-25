import React from "react";
import { FiUser, FiMail, FiEdit2 } from "react-icons/fi";

export default function Profile() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-6 px-2 sm:px-6 flex flex-col items-center font-[Inter,sans-serif]">
      <header className="w-full max-w-xl flex flex-col gap-4 mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
          Profile
        </h1>
      </header>
      <main className="w-full max-w-xl flex flex-col gap-6">
        <section className="bg-white dark:bg-zinc-900 shadow-md dark:shadow-zinc-900/30 rounded-2xl p-6 flex flex-col items-center group transition-all">
          <div className="relative mb-4">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-indigo-100 dark:border-zinc-800 shadow"
            />
            <button className="absolute bottom-2 right-2 bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-full shadow transition-all">
              <FiEdit2 className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-col items-center gap-1 mb-4">
            <span className="text-lg font-semibold text-zinc-900 dark:text-white">
              John Doe
            </span>
            <span className="text-sm text-zinc-500 dark:text-zinc-300 flex items-center gap-1">
              <FiMail className="w-4 h-4" /> johndoe@email.com
            </span>
          </div>
          <div className="w-full flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-zinc-500 dark:text-zinc-300">Username</span>
              <span className="font-medium text-zinc-900 dark:text-white">
                johndoe
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-500 dark:text-zinc-300">Phone</span>
              <span className="font-medium text-zinc-900 dark:text-white">
                +1 234 567 8901
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-500 dark:text-zinc-300">Location</span>
              <span className="font-medium text-zinc-900 dark:text-white">
                San Francisco, USA
              </span>
            </div>
          </div>
        </section>
        <section className="bg-white dark:bg-zinc-900 shadow-md dark:shadow-zinc-900/30 rounded-2xl p-6 flex flex-col gap-4 group transition-all">
          <div className="flex items-center gap-2 mb-2 text-base font-semibold text-zinc-700 dark:text-zinc-200">
            <FiUser className="w-5 h-5 text-indigo-500" /> About
          </div>
          <div className="text-sm text-zinc-500 dark:text-zinc-300">
            Product designer passionate about building delightful user
            experiences. Loves hiking, photography, and coffee.
          </div>
        </section>
      </main>
      <style>{`
        .group:hover { box-shadow: 0 4px 24px 0 rgba(99,102,241,0.08); }
        .group:active { box-shadow: 0 2px 8px 0 rgba(99,102,241,0.12); }
        .group:focus-within { box-shadow: 0 0 0 2px #6366f1; }
      `}</style>
    </div>
  );
}
