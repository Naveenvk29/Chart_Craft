import { motion } from "framer-motion";

const pages = [
  { link: "#", name: "Home" },
  { link: "#features", name: "Features" },
  { link: "#about", name: "About" },
  { link: "#contact", name: "Contact" },
];

const Socials = [
  { link: "#linkedin", name: "LinkedIn" },
  { link: "#instagram", name: "Instagram" },
  { link: "#twitter", name: "X" },
];

const legals = [
  { link: "#", name: "Privacy Policy" },
  { link: "#", name: "Terms of Service" },
  { link: "#", name: "Cookie Policy" },
];

const registers = [
  { link: "/signup", name: "Sign Up" },
  { link: "/login", name: "Login" },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

const FooterSecction = () => {
  return (
    <motion.div
      className="relative w-full bg-white border-t border-neutral-100 px-8 py-20 dark:bg-neutral-950 dark:border-white/[0.1] overflow-hidden"
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true }}
    >
      <motion.div
        className="max-w-7xl mx-auto text-sm text-neutral-300 flex flex-col md:flex-row justify-between items-start md:px-8 mb-10"
        variants={fadeInUp}
      >
        <motion.div className="space-y-2" variants={fadeInUp}>
          <a
            href="#"
            className="text-lg font-semibold tracking-wider text-neutral-600 dark:text-neutral-300"
          >
            Chart Craft
          </a>
          <div className="text-sm text-neutral-500">
            © copyright Startup 2024. All rights reserved.
          </div>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 items-start justify-center mt-10 md:mt-0">
          {[
            { title: "Pages", items: pages },
            { title: "Socials", items: Socials },
            { title: "Legal", items: legals },
            { title: "Register", items: registers },
          ].map((section, idx) => (
            <motion.div
              key={idx}
              className="flex justify-center space-y-4 flex-col w-full"
              variants={fadeInUp}
            >
              <p className="font-bold text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 hover:dark:text-neutral-100">
                {section.title}
              </p>
              <ul className="space-y-2">
                {section.items.map((item, index) => (
                  <li key={index}>
                    <a
                      className="transition-colors hover:text-neutral-800 dark:hover:text-neutral-100"
                      href={item.link}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.h1
        className="text-center text-4xl mt-5 uppercase md:text-9xl lg:text-[12rem] xl:text-[13rem] font-bold bg-clip-text text-transparent inset-x-0 bg-gradient-to-b from-neutral-50 dark:from-neutral-950 to-neutral-200 dark:to-neutral-800"
        initial={{
          opacity: 0,
          y: 50,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
          delay: 0.3,
        }}
        viewport={{ once: true }}
      >
        Chart Craft
      </motion.h1>
    </motion.div>
  );
};

export default FooterSecction;
