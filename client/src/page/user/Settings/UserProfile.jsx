import { useState } from "react";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../../redux/api/usersApi";
import testpp from "../../../assets/pp.jpg";

const UserProfile = () => {
  const { data: userDetails, error, isLoading } = useGetProfileQuery();
  const profilePicture = userDetails?.user.profilePicture || testpp;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const handleUserDetailsUpdate = async () => {};

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-6 border-b pb-2">user Profile</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading user details.</p>}
      {userDetails && (
        <>
          <div className="flex  justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <img
                src={profilePicture}
                alt="Profile Picture"
                className="h-32 w-32 rounded-full border-2 border-gray-300 hover:scale-105 transition-transform duration-300 "
              />
              <div className="flex flex-col  space-y-1 ">
                <h2 className="text-3xl font-semibold capitalize ">
                  {userDetails.user.username}
                </h2>
                <p className="text-gray-600 font-medium">
                  {userDetails.user.email}
                </p>
                <p className="text-center font-medium bg-blue-500 text-white px-2 py-1 rounded-full">
                  {userDetails.user.role}
                </p>
              </div>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">
              Edit Profile
            </button>
          </div>
          <hr />
          <div className="mt-5 flex  justify-between items-center">
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
                {" "}
                <span className="font-semibold">Joined:</span>{" "}
                {new Date(userDetails.user.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
