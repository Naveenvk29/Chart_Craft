import { motion } from "framer-motion";

const UserCard = ({ user, onRoleChangeClick }) => {
  return (
    <motion.div
      className="bg-white dark:bg-neutral-600 p-5 rounded shadow-2xl w-full cursor-pointer hover:bg-neutral-100 hover:dark:bg-neutral-700 "
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={() => onRoleChangeClick(user)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === "Enter" && onRoleChangeClick(user)}
    >
      <h2 className="text-lg font-semibold truncate dark:text-neutral-300">
        Username:{" "}
        <span className="dark:text-neutral-100 font-semibold ">
          {user.username}
        </span>
      </h2>
      <p className="text-sm truncate dark:text-neutral-300">
        Email-Id:-{" "}
        <span className="dark:text-neutral-100 font-semibold ">
          {user.email}
        </span>
      </p>
      <p className="mt-1 text-sm">
        <span className="dark:text-neutral-100 font-semibold ">Role:</span>{" "}
        {user.role}
      </p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRoleChangeClick(user);
        }}
        className="mt-3 px-4 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Change Role
      </button>
    </motion.div>
  );
};

export default UserCard;
