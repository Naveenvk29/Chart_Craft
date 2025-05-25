import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="w-full px-6 py-20 bg-neutral-100 dark:bg-neutral-950 text-neutral-700 dark:text-neutral-300"
    >
      <div className="max-w-6xl mx-auto mb-12 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold tracking-tight  text-center text-neutral-600 dark:text-neutral-300"
        >
          Contact Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-4 text-lg text-neutral-600 dark:text-neutral-400"
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum labore
          tempora quo.
        </motion.p>
      </div>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
        {/* Left */}
        <div className="flex-1 space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-neutral-700 dark:text-neutral-300 "
          >
            DO YOU HAVE A PROJECT TO DISCUSS?
          </motion.h2>

          <div>
            <p className="text-lg font-semibold mb-1">Get in Touch 💬</p>
            <p className="text-neutral-500 dark:text-neutral-400">
              Feel free to reach out if you want to collaborate, hire me, or
              just chat about ideas and projects.
            </p>
          </div>

          <div>
            <p className="text-lg font-semibold mb-2">Social Media</p>
            <div className="flex gap-4 text-2xl text-neutral-500 dark:text-neutral-400">
              <a href="https://github.com/" target="_blank" rel="noreferrer">
                <FaGithub className="hover:text-white transition" />
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noreferrer">
                <FaLinkedin className="hover:text-white transition" />
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noreferrer">
                <FaTwitter className="hover:text-white transition" />
              </a>
            </div>
          </div>
        </div>

        {/* Right */}
        <motion.form
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex-1 space-y-4 w-full max-w-lg"
        >
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Name</label>
            <input
              type="text"
              className="p-3 rounded-md bg-neutral-200 dark:bg-[#1A1A1A] border border-neutral-300 dark:border-[#2A2A2A] text-black dark:text-white outline-none"
              placeholder="Your name"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              className="p-3 rounded-md bg-neutral-200 dark:bg-[#1A1A1A] border border-neutral-300 dark:border-[#2A2A2A] text-black dark:text-white outline-none"
              placeholder="Your email"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Message</label>
            <textarea
              rows={6}
              className="p-3 rounded-md bg-neutral-200 dark:bg-[#1A1A1A] border border-neutral-300 dark:border-[#2A2A2A] text-black dark:text-white outline-none"
              placeholder="Type your message..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="mt-4 flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600 text-white px-6 py-3 rounded-md font-semibold transition"
          >
            <span>📨</span> Send
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactSection;
