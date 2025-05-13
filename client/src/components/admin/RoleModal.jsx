import { motion, AnimatePresence } from "framer-motion";

const roles = ["user", "admin"];

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
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
  return (
    <AnimatePresence>
      {isOpen && user && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 bg-opacity-40"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="bg-white p-6 rounded shadow-md w-full max-w-md"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-4">
              Change Role for {user.username}
            </h2>

            <label className="block mb-2 text-sm font-medium">
              Select New Role
            </label>
            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-4"
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
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
