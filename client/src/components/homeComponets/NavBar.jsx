import React, { useState, useRef, useEffect } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { Menu, Moon, Sun, X } from "lucide-react";
import cn from "../../libs/utils";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleDarkMode,
  initializeTheme,
} from "../../redux/features/themeSlice";
const NAV_ITEMS = [
  { name: "Feature", link: "/#feature" },
  { name: "About", link: "/#about" },
  { name: "Contact", link: "/#contact" },
];
const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    dispatch(initializeTheme());
  }, [dispatch]);

  const handleToggleTheme = () => {
    dispatch(toggleDarkMode());
  };

  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(null);
  const ref = useRef(null);

  const { scrollY } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (visible !== latest > 100) {
      setVisible(latest > 100);
    }
  });

  return (
    <motion.div
      ref={ref}
      initial={false}
      className=" sticky inset-x-0 top-0 z-[100] w-full "
    >
      <motion.div
        animate={{
          backdropFilter: visible ? "blur(8px)" : "none",
          width: visible ? "50%" : "100%",
          boxShadow: visible
            ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
            : "none",
          y: visible ? 20 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 30,
        }}
        style={{
          width: "800px",
        }}
        className={cn(
          "relative z-[60] mx-auto  hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent px-4 py-2 lg:flex dark:bg-transparent ",
          visible && "bg-white/50 dark:bg-neutral-950/30"
        )}
      >
        <div className="text-xl text-neutral-600 dark:text-neutral-300 font-bold ">
          <Link to="/#hero">ChartCraft</Link>
        </div>
        <div
          className="flex items-center space-x-4"
          onMouseLeave={() => setHovered(null)}
        >
          {NAV_ITEMS.map((item, idx) => (
            <a
              href={item.link}
              key={idx}
              className="relative px-4 py-2 text-sm text-neutral-600 dark:text-neutral-300"
              onMouseEnter={() => setHovered(idx)}
            >
              {hovered === idx && (
                <motion.div
                  transition={{
                    duration: 0.1,
                    ease: "easeInOut",
                  }}
                  layoutId="hovered"
                  className="absolute inset-0 rounded-full bg-neutral-300 dark:bg-neutral-700"
                />
              )}

              <span className="relative z-20">{item.name}</span>
            </a>
          ))}
        </div>
        <div className="flex items-center space-x-4 ">
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
                  onClick={handleToggleTheme}
                  className="cursor-pointer text-neutral-600 dark:text-neutral-300"
                  size={18}
                />
              ) : (
                <Moon
                  aria-label="Enable light mode"
                  onClick={handleToggleTheme}
                  className="cursor-pointer text-neutral-600 dark:text-neutral-300"
                  size={18}
                />
              )}
            </motion.div>
          </AnimatePresence>
          <motion.button
            initial={{ opacity: 1, scale: 1 }}
            animate={{
              x: visible ? 500 : 0,
              opacity: visible ? 0 : 1,
              scale: visible ? 0.95 : 1,
              width: visible ? 0 : "100%",
            }}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
            }}
            className="text-sm font-semibold px-4 py-2 text-neutral-600 dark:text-neutral-300 whitespace-nowrap rounded-3xl"
          >
            <Link to="/login">Sign In</Link>
          </motion.button>

          <button className="text-sm font-semibold px-4 py-2 text-neutral-900 bg-neutral-200  whitespace-nowrap rounded-3xl">
            <Link to="/signup">Get Started</Link>
          </button>
        </div>
      </motion.div>

      {/* mobile*/}
      <motion.div
        animate={{
          backdropFilter: visible ? "blur(8px)" : "none",
          borderColor: visible ? "rgba(0,0,0,0.5)" : "transparent",
          y: visible ? 15 : 0,
          width: visible ? "98%" : "100%",
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 30,
        }}
        className="lg:hidden mx-auto flex justify-between items-center px-4 py-2 rounded-lg"
      >
        <div className="text-neutral-600 dark:text-neutral-300 font-bold text-lg">
          Chart craft
        </div>
        <div>
          {mobileOpen ? (
            <X
              className="text-neutral-600  dark:text-neutral-300"
              onClick={() => setMobileOpen(false)}
            />
          ) : (
            <Menu
              className="text-neutral-600  dark:text-neutral-300"
              onClick={() => setMobileOpen(true)}
            />
          )}
        </div>
      </motion.div>

      {/*  */}

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            transition={{
              duration: 0.1,
              ease: "easeInOut",
            }}
            exit={{
              height: 0,
              opacity: 1,
            }}
            className="flex flex-col items-start px-6 py-4 space-y-3 bg-neutral-300/90 dark:bg-neutral-950/90 lg:hidden shadow-md mt-5 z-50 relative"
          >
            {NAV_ITEMS.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                onClick={() => setMobileOpen(false)}
                className="text-neutral-600 dark:text-neutral-300  py-2 w-full text-left"
              >
                {item.name}
              </a>
            ))}
            <button className="w-full text-neutral-600 font-bold text-sm py-2 px-4 rounded-md bg-neutral-200 ">
              <Link to="/login" onClick={() => setMobileOpen(false)}>
                Sign In
              </Link>
            </button>
            <button className="w-full text-neutral-600 font-bold text-sm py-2 px-4 rounded-md bg-neutral-200 ">
              <Link to="/signup" onClick={() => setMobileOpen(false)}>
                Get Started
              </Link>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default NavBar;
