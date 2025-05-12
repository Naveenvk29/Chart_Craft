import { useState } from "react";
import {
  useDeleteProfileMutation,
  useLogoutMutation,
} from "../../../redux/api/usersApi";
import { logout } from "../../../redux/features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ConfirmModal from "../../../components/userModal/ConfirmModal"; // 👈 import it

const DeleteUserZone = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteProfile, { isLoading: isDeleting }] = useDeleteProfileMutation();
  const [logoutApi] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUserDelete = async () => {
    try {
      await deleteProfile().unwrap();
      await logoutApi().unwrap();
      dispatch(logout());
      toast.success("Account deleted successfully");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete account");
    }
  };

  return (
    <div className="w-full max-w-4xl mt-5 mx-auto h-full bg-white text-black py-5 px-8 shadow-md rounded-md">
      <h2 className="text-2xl font-bold">Delete Account</h2>
      <p className="text-sm text-gray-600">
        Are you sure you want to delete your account? This action cannot be
        undone.
      </p>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
      >
        Delete Account
      </button>

      {/* ✅ Reusable Modal Component */}
      <ConfirmModal
        isOpen={isModalOpen}
        title="Confirm Account Deletion"
        message="Are you sure you want to permanently delete your account? This action cannot be undone."
        confirmText="Yes, Delete"
        cancelText="Cancel"
        isLoading={isDeleting}
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleUserDelete}
      />
    </div>
  );
};

export default DeleteUserZone;
