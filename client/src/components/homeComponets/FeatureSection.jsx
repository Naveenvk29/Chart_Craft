import React, { useState } from "react";
import {
  UploadCloud,
  MoveHorizontal,
  Axis3D,
  History,
  Brain,
  Share2,
} from "lucide-react";

import { motion, LayoutGroup } from "motion/react";
import GlowingEffect from "./GlowingEffect";

const FeaturesItems = [
  {
    title: "Upload Excel Files",
    description:
      "Upload any Excel or CSV file and let SheetViz take care of formatting and preprocessing for you.",
    icon: UploadCloud,
  },
  {
    title: "Axis Selection",
    description:
      "Select specific rows and columns to visualize. Tailor each chart to your exact data needs.",
    icon: MoveHorizontal,
  },
  {
    title: "2D & 3D Chart Generation",
    description:
      "Create both traditional 2D charts and immersive 3D visualizations to better explore your data.",
    icon: Axis3D,
  },
  {
    title: "Version History",
    description:
      "Go back in time. Access your previous visualizations and compare them easily.",
    icon: History,
  },
  {
    title: "AI Insights",
    description:
      "Get smart recommendations based on patterns found in your data using our AI assistant.",
    icon: Brain,
  },
  {
    title: "Export & Share",
    description:
      "Download charts or share them directly with your team or clients in one click.",
    icon: Share2,
  },
];

const FeatureSection = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <motion.div
      id="feature"
      className="mt-10 w-full max-w-6xl mx-auto py-5 px-6 md:px-8"
    >
      <h2 className="text-4xl font-extrabold tracking-tight mb-3 text-center text-neutral-600 dark:text-neutral-300">
        Features
      </h2>

      <LayoutGroup>
        <motion.div
          className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 my-10 md:my-20 relative"
          onMouseLeave={() => setHovered(null)}
        >
          {FeaturesItems.map((feature, idx) => (
            <motion.div
              key={idx}
              className="relative group"
              onMouseEnter={() => setHovered(idx)}
            >
              {hovered === idx && (
                <motion.div
                  layoutId="hovered"
                  className="absolute inset-0 rounded-xl bg-neutral-200 dark:bg-neutral-800 py-20 z-0"
                />
              )}

              <div className="p-2">
                <div className="relative z-10 bg-neutral-100 text-neutral-900 rounded-xl px-5 py-6 border border-neutral-300 dark:border-neutral-900 dark:bg-neutral-800 dark:text-neutral-300 shadow-xl transition-transform duration-300 ">
                  <GlowingEffect
                    blur={10}
                    proximity={100}
                    spread={50}
                    glow={true}
                    variant="default"
                    movementDuration={1}
                    borderWidth={10}
                    disabled={false}
                  />
                  <div className="w-12 h-12 flex items-center justify-center mb-4 bg-neutral-300 text-neutral-900 rounded-lg">
                    <feature.icon className="w-6 h-6 " />
                  </div>
                  <h3 className="text-lg  font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </LayoutGroup>
    </motion.div>
  );
};

export default FeatureSection;
