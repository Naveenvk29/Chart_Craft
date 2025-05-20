import { motion } from "framer-motion";
import DeleteUserZone from "./DeleteUserZone";
import PasswordChangeZone from "./PasswordChangeZone";
import UserProfile from "./UserProfile";

const Settings = () => {
  return (
    <motion.div
      className="min-h-full py-10 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-3xl font-bold  pb-2 max-w-7xl mx-auto text-neutral-700 dark:text-neutral-300">
        Settings
      </h2>
      <p className="text-sm font-bold mb-6 pb-2 max-w-7xl mx-auto text-neutral-500">
        Personalize your experience and manage your account.
      </p>
      <UserProfile />
      <PasswordChangeZone />
      <DeleteUserZone />
    </motion.div>
  );
};

export default Settings;
