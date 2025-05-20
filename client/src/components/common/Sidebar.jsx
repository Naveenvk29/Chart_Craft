import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, animate } from "motion/react";
import { Menu, X, LogOut, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = ({
  title = "Your App",
  avatarUrl,
  userName,
  links = [],
  children,
  logout,
}) => {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(null);

  const toggletheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };
  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setDarkMode(prefersDark);
    if (prefersDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <div className="md:flex w-full h-screen bg-white dark:bg-neutral-950">
      <motion.div
        animate={{
          width: animate ? (open ? "300px" : "60px") : "300px",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="hidden md:flex flex-col h-full p-3 bg-neutral-100 dark:bg-neutral-950 transition-all"
      >
        <div className="flex flex-col  h-full space-y-20">
          <div className="flex justify-between">
            <Link
              to="/"
              className="flex items-center space-x-2 text-sm text-black dark:text-white"
            >
              {!open && (
                <h2 className="text-md font-bold animate-pulse duration-300 ease-initial">
                  Craft
                </h2>
              )}

              {open && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, bounceDamping: 10 }}
                  className="font-medium"
                >
                  {title}
                </motion.span>
              )}
            </Link>
            {open && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={darkMode ? "moon" : "sun"}
                  initial={{
                    rotate: 90,
                    opacity: 0,
                  }}
                  animate={{
                    rotate: 0,
                    opacity: 1,
                  }}
                  exit={{
                    rotate: 90,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                >
                  {darkMode ? (
                    <Sun
                      aria-label="Enable dark mode"
                      onClick={toggletheme}
                      className="cursor-pointer text-neutral-600 dark:text-neutral-300"
                      size={20}
                    />
                  ) : (
                    <Moon
                      aria-label="Enable light mode"
                      onClick={toggletheme}
                      className="cursor-pointer text-neutral-600 dark:text-neutral-300"
                      size={20}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          <div className="flex flex-col space-y-4">
            {links.map((link, idx) => (
              <Link
                to={link.path}
                key={idx}
                className="flex items-center gap-5 py-2 group/sidebar"
              >
                {link.icon}
                {open && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.3,
                      ease: "easeInOut",
                    }}
                    animate={{
                      display: animate
                        ? open
                          ? "inline-block"
                          : "none"
                        : "inline-block",
                      opacity: animate ? (open ? 1 : 0) : 1,
                    }}
                    className="text-[1rem] text-neutral-700 dark:text-neutral-200 group-hover:translate-x-1 transition"
                  >
                    {link.label}
                  </motion.span>
                )}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between ">
          <Link to="#" className="flex items-center gap-2 py-2">
            <img
              src={avatarUrl}
              alt="Avatar"
              className="h-7 w-7 rounded-full"
            />
            {open && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 2,
                  delay: 0.3,
                }}
                className="text-md text-neutral-700 dark:text-neutral-200"
              >
                {userName}
              </motion.span>
            )}
          </Link>
          {open && (
            <LogOut
              onClick={logout}
              className="dark:text-neutral-300 text-neutral-800"
            />
          )}
        </div>
      </motion.div>

      <div className=" md:hidden flex justify-between  bg-neutral-50 dark:bg-neutral-800 px-5 py-3">
        <h1 className="text-lg font-bold tracking-tight text-neutral-800 dark:text-neutral-200">
          {title}
        </h1>
        <Menu
          className="text-neutral-800 dark:bg-neutral-300 font-bold"
          onClick={() => setOpen(true)}
        />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 h-full w-full bg-white dark:bg-neutral-900 p-10 flex flex-col justify-between md:hidden"
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div
              className="absolute right-10 top-10 text-neutral-800 dark:text-neutral-300"
              onClick={() => setOpen(false)}
            >
              <X />
            </div>
            <Link
              to="#"
              className="flex items-center space-x-2 py-1 text-sm text-black dark:text-white"
            >
              <div className="h-5 w-6 rounded-tl-lg rounded-br-lg bg-black dark:bg-white" />
              <span className="font-medium">{title}</span>
            </Link>

            <div className="mt-8 flex flex-col gap-4">
              {links.map((link, idx) => (
                <Link
                  to={link.path}
                  key={idx}
                  className="flex items-center gap-3 text-neutral-800 dark:text-neutral-200"
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <Link to="#" className="flex items-center gap-2 py-2 mt-4">
                <img
                  src={avatarUrl}
                  alt="Avatar"
                  className="w-7 h-7 rounded-full"
                />
                <span className="text-lg text-neutral-700 dark:text-neutral-300">
                  {userName}
                </span>
              </Link>

              <LogOut
                onClick={logout}
                className="text-neutral-700 dark:text-neutral-200 "
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className=" flex flex-1">
        <div className="flex rounded-tl-2xl flex-1 flex-col gap-2 border border-neutral-200 bg-white  dark:border-neutral-700 dark:bg-neutral-900 overflow-auto mt-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
