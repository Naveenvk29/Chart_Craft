import { useDeleteProfileMutation } from "../../../redux/api/usersApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DeleteUserZone = () => {
  const [deleteProfile, { isLoading: isDeleting }] = useDeleteProfileMutation();

  const navigate = useNavigate();
  const handleUserDelete = async () => {
    console.log("Deleting user...");
  };
  return (
    <div className="w-full max-w-4xl mt-5 mx-auto h-full bg-white text-black py-5 px-8 shadow-md rounded-md">
      <h2 className="text-2xl font-bold">Delete Account</h2>
      <p className="text-sm text-gray-600">
        Are you sure you want to delete your account? This action cannot be
        undone.
      </p>
      <button
        onClick={handleUserDelete}
        disabled={isDeleting}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        {isDeleting ? "Deleting..." : "Delete Account"}
      </button>
    </div>
  );
};

export default DeleteUserZone;
