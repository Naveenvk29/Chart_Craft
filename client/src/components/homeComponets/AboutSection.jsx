import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="max-w-6xl mx-auto px-4 py-20 text-center text-neutral-600 dark:text-neutral-300"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold tracking-tight mb-4 text-center "
      >
        About Chart Craft
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-base md:text-lg text-neutral-500 leading-relaxed max-w-3xl mx-auto"
      >
        We built Chart Craft to help you turn Excel data into beautiful,
        interactive visualizations with ease. Whether you're a student,
        professional, or business analyst, our tool simplifies the process of
        transforming raw data into insightful visuals—no coding required.
      </motion.p>

      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-12 max-w-md mx-auto bg-neutral-500 rounded-lg p-6"
      >
        <h3 className="text-xl font-semibold mb-2">Developer</h3>
        <p className="text-gray-300 mb-4">
          Hi, I’m <strong>Naveen Vinod Kumar</strong>, a full-stack developer
          passionate about building intuitive and powerful web apps.
        </p>

        <div className="flex justify-center gap-6 text-2xl text-gray-400">
          <a
            href="https://github.com/janedoe"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hover:text-white transition"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/janedoe"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="hover:text-white transition"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://twitter.com/janedoe"
            target="_blank"
            rel="noreferrer"
            aria-label="Twitter"
            className="hover:text-white transition"
          >
            <FaTwitter />
          </a>
        </div>
      </motion.div> */}
    </section>
  );
};

export default AboutSection;
