import { useState } from "react";
import { useChangePasswordMutation } from "../../../redux/api/usersApi";
import EditPasswordModal from "../../../components/userModal/EditPasswordModal";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const PasswordChangeZone = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handlePasswordSave = async ({ newPassword }) => {
    try {
      await changePassword({ newPassword }).unwrap();
      toast.success("Password has been changed successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to change password");
    }
  };

  return (
    <motion.div
      className="w-full max-w-4xl mt-5 mx-auto bg- dark:bg-neutral-800 text- dark:text-white py-5 px-6 sm:px-8 shadow-md rounded-md"
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-2xl font-bold">Change Password</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Update your password to keep your account secure.
      </p>

      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {isLoading ? "Loading..." : "Change Password"}
      </button>

      <EditPasswordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handlePasswordSave}
      />
    </motion.div>
  );
};

export default PasswordChangeZone;
