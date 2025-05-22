import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const roles = ["user", "admin"];

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const RoleModal = ({
  user,
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  newRole,
  setNewRole,
}) => {
  const modalRef = useRef(null);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && user && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={handleBackdropClick}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            ref={modalRef}
            className="bg-white dark:bg-neutral-800 p-6 rounded-md shadow-xl w-full max-w-md mx-4"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h2 className="text-xl font-semibold mb-4 text-center text-neutral-800 dark:text-neutral-100">
              Change Role for{" "}
              <span className="text-blue-600">{user.username}</span>
            </h2>

            <label className="block mb-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Select New Role
            </label>
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="w-full border border-neutral-300 dark:border-neutral-600 rounded px-3 py-2 mb-4 bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-100"
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-neutral-300 text-neutral-800 hover:bg-neutral-400 dark:bg-neutral-600 dark:text-white dark:hover:bg-neutral-500 rounded"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-70"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Confirm"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RoleModal;
