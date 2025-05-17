import { motion } from "motion/react";
import cn from "../../libs/utils";
import bg from "../../assets/dashboard.webp";
import { useRef } from "react";
import GlowingEffect from "./GlowingEffect";
import { Link } from "react-router-dom";
const Hero = () => {
  const ref = useRef(null);

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative  z-20 mx-auto max-w-7xl text-center font-semibold  text-neutral-300",
        "text-4xl md:text-7xl "
      )}
    >
      <motion.h2
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        className={cn(
          "inline-block bg-clip-text text-transparent my-5 tracking-tight max-w-4xl",
          "bg-[radial-gradient(61.17%_178.53%_at_38.83%_-13.54%,#FFFFFF_0%,#D4D4D4_20%,#888787_50%,#3B3B3B_80%,#1A1A1A_100%)] dark:bg-[radial-gradient(61.17%_178.53%_at_38.83%_-13.54%,#3B3B3B_0%,#888787_12.61%,#FFFFFF_50%,#888787_80%,#3B3B3B_100%)]"
        )}
      >
        Your All-in-One Excel Visualization Tool.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="relative z-20 mx-auto mt-4 max-w-xl px-4 text-center text-base/6 text-gray-500 sm:text-base  "
      >
        Say goodbye to boring data! Chart Craft helps you create beautiful,
        interactive visualizations from your Excel files—fast, simple, and
        smart.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mb-8 mt-6 sm:mb-10 sm:mt-8 flex w-full flex-col items-center justify-center gap-4 px-4 sm:px-8 sm:flex-row md:mb-20"
      >
        <button
          className={cn(
            "px-4 py-2 text-sm font-bold relative cursor-pointer transition duration-200",
            "hover:-translate-y-0.5 border border-solid rounded-full w-76 sm:w-40 h-12 flex items-center justify-center text-white",
            "bg-[linear-gradient(0deg,#151515,#151515),linear-gradient(180deg,rgba(21,21,21,0)_66.3%,rgba(255,255,255,0.5)_100%),linear-gradient(183.22deg,rgba(255,255,255,0.5)_2.62%,rgba(21,21,21,0)_52.03%)]",
            "shadow-[inset_0px_6px_8px_0px_#FAFAFA40,inset_0px_-6px_8px_0px_#FAFAFA40,0px_0px_4px_rgba(34,42,53,0.08)]"
          )}
        >
          <Link to="/signup">Get Started</Link>
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="relative mx-auto w-full max-w-7xl p-2 backdrop-blur-lg md:p-4"
      >
        <GlowingEffect
          blur={10}
          proximity={100}
          spread={30}
          glow={true}
          variant="default"
          movementDuration={1.5}
          borderWidth={5}
          disabled={false}
        />
        <div className="rounded-lg relative overflow-hidden">
          <img
            className="w-full h-auto rounded-lg "
            src="https://cryptgen-template-aceternity.vercel.app/_next/image?url=%2Fdashboard.webp&w=1920&q=75"
            alt="Dashboard"
          />
          <div
            className="absolute inset-0 "
            style={{
              background:
                "linear-gradient(179.87deg, rgba(0, 0, 0, 0) 0.11%, rgba(0, 0, 0, 0.8) 69.48%, #000000 92.79%)",
            }}
          ></div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
