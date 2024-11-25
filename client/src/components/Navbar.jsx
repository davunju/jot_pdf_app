import React from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const NavBar = () => {
  return (
    <nav className="shadow-xl dark:bg-slate-800 dark:border-b dark:border-slate-600 text-slate-700 dark:text-slate-100">
      <section className="w-full mx-auto max-w-7xl flex items-center justify-between py-2 px-4">
        <section className="flex items-center gap-2">
          <img src="/assets/logo_bl.png" alt="JoT logo" className="size-12" />
          <p className="text-lg bg-clip-text bg-gradient-to-r from-red-600 to-slate-700 text-transparent font-semibold dark:text-sky-500">
            JoT PDF Tool
          </p>
        </section>
        <ul className="flex items-center justify-center gap-5 text-sm md:text-base font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-red-500 dark:text-sky-500"
                : "text-slate-700 dark:text-slate-100"
            }
          >
            <li className="cursor-pointer">HOME</li>
          </NavLink>
          <NavLink
            to="merge_files"
            className={({ isActive }) =>
              isActive
                ? "text-red-500 dark:text-sky-500"
                : "text-slate-700 dark:text-slate-100"
            }
          >
            <li className="cursor-pointer">MERGE PDF</li>
          </NavLink>
          <NavLink
            to="split_files"
            className={({ isActive }) =>
              isActive
                ? "text-red-500 dark:text-sky-500"
                : "text-slate-700 dark:text-slate-100"
            }
          >
            <li className="cursor-pointer">SPLIT PDF</li>
          </NavLink>
          <NavLink
            to="compress_files"
            className={({ isActive }) =>
              isActive
                ? "text-red-500 dark:text-sky-500"
                : "text-slate-700 dark:text-slate-100"
            }
          >
            <li className="cursor-pointer">COMPRESS PDF</li>
          </NavLink>
        </ul>
        <section className="flex items-center gap-5 font-medium">
          <ThemeToggle />
          <button>Login</button>
          <button className="bg-red-500 hover:bg-red-700 py-1 text-white rounded-lg px-3">
            Sign Up
          </button>
        </section>
      </section>
    </nav>
  );
};

export default NavBar;
