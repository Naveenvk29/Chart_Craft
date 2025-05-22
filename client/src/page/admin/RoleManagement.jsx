import { useState } from "react";
import {
  useFetchAllUserQuery,
  useModifyUserRoleMutation,
} from "../../redux/api/adminApi";
import { toast } from "react-toastify";
import UserCard from "../../components/admin/UserCard";
import RoleModal from "../../components/admin/RoleModal";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GlowingEffect from "../../components/homeComponets/GlowingEffect";
const RoleManagement = () => {
  const { data: users, isLoading } = useFetchAllUserQuery();
  const [modifyUserRole] = useModifyUserRoleMutation();

  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState("user");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const openModal = (user) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };
  const handleConfirmRoleChange = async () => {
    if (!selectedUser?._id || !newRole) {
      console.error("Invalid user or role data");
      return;
    }
    try {
      await modifyUserRole({
        id: selectedUser._id,
        userData: { role: newRole },
      }).unwrap();

      toast.success(`Role updated for ${selectedUser.username}`);
      closeModal();
    } catch (err) {
      console.error("Role update failed", err);
      toast.error("Failed to update role.");
    }
  };

  const filteredUsers = users?.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-60">
        <Loader2 className="animate-spin text-blue-500 w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-screen-xl mx-auto mt-8 text-neutral-800 dark:text-neutral-200">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-neutral-900 dark:text-neutral-100">
        Role Management
      </h1>

      <input
        type="text"
        placeholder="Search by name or email..."
        className="w-full max-w-md mb-8 px-4 py-2 rounded border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredUsers?.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {filteredUsers.map((user) => (
            <motion.div
              key={user._id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <UserCard user={user} onRoleChangeClick={openModal} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
          No users found matching your search.
        </p>
      )}

      <AnimatePresence>
        {isModalOpen && (
          <RoleModal
            user={selectedUser}
            isOpen={isModalOpen}
            onClose={closeModal}
            onConfirm={handleConfirmRoleChange}
            isLoading={isUpdating}
            newRole={newRole}
            setNewRole={setNewRole}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default RoleManagement;
