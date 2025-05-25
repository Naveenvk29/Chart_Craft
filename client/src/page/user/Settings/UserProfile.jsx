import { useState } from "react";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../../redux/api/usersApi";
import testpp from "../../../assets/pp.jpg";
import EditProfileModal from "../../../components/userModal/EditProfileModal";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import EditProfiePicModal from "../../../components/userModal/EditProfiePicModal";
import { updateUserInfo } from "../../../redux/features/authSlice";
import { useDispatch } from "react-redux";

const UserProfile = () => {
  const { data: userDetails, error, isLoading, refetch } = useGetProfileQuery();
  const profilePicture = userDetails?.user.profilePic?.url || testpp;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
  const [isPicModalOpen, setIsPicModalOpen] = useState(false);

  const dispatch = useDispatch();

  const handlePicUpload = async (file) => {
    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      const updatedUser = await updateProfile(formData).unwrap();
      refetch();
      // 🔄 Update the Redux store with the new profilePic
      dispatch(updateUserInfo(updatedUser.user));

      toast.success("Profile picture updated");
      setIsPicModalOpen(false);
    } catch (err) {
      console.log(err);
      toast.error("Failed to upload profile picture");
    }
  };
  const handleSave = async (updatedData) => {
    try {
      await updateProfile(updatedData).unwrap();
      toast.success("Profile updated successfully");
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto bg-neutral-50 dark:bg-neutral-800 text-black dark:text-white p-6 rounded-md shadow-md"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold mb-6 border-b pb-2">User Profile</h1>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading user details.</p>}

      {userDetails && (
        <>
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-6">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="relative">
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="h-28 w-28 rounded-full border-2 border-gray-300 hover:scale-105 transition-transform duration-300 cursor-pointer"
                  onClick={() => setIsPicModalOpen(true)}
                />
                <EditProfiePicModal
                  user={userDetails.user}
                  isOpen={isPicModalOpen}
                  onClose={() => setIsPicModalOpen(false)}
                  onUpload={handlePicUpload}
                />
              </div>
              <div className="text-center md:text-left space-y-1">
                <h2 className="text-2xl font-semibold">
                  {userDetails.user.username}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 font-medium">
                  {userDetails.user.email}
                </p>
                <p className="text-sm font-medium bg-blue-500 text-white px-2 py-1 rounded-full inline-block">
                  {userDetails.user.role}
                </p>
              </div>
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
              onClick={() => setIsModalOpen(true)}
            >
              {isUpdating ? "Loading..." : "Edit Profile"}
            </button>
          </div>

          <EditProfileModal
            user={userDetails.user}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSave}
          />

          <hr className="my-4" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div>
                <span className="font-semibold">Name:</span>{" "}
                {userDetails.user.username}
              </div>
              <div>
                <span className="font-semibold">Email:</span>{" "}
                {userDetails.user.email}
              </div>
            </div>
            <div>
              <div>
                <span className="font-semibold">Role:</span>{" "}
                {userDetails.user.role}
              </div>
              <div>
                <span className="font-semibold">Joined:</span>{" "}
                {new Date(userDetails.user.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default UserProfile;
