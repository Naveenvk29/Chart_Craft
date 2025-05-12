import { useState } from "react";

const EditProfileModal = ({
  user,
  isOpen,
  onClose,
  onSaveProfile,
  onChangePassword,
}) => {
  const [activeTab, setActiveTab] = useState("profile");

  // Profile fields
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");

  // Password fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    onSaveProfile({ username, email });
    onClose();
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    onChangePassword({ currentPassword, newPassword });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-full max-w-md shadow-lg">
        <div className="flex justify-between mb-4">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-2 font-semibold ${
              activeTab === "profile"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
          >
            Edit Profile
          </button>
          <button
            onClick={() => setActiveTab("password")}
            className={`px-4 py-2 font-semibold ${
              activeTab === "password"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
          >
            Change Password
          </button>
        </div>

        {activeTab === "profile" && (
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Username</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full border px-3 py-2 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </form>
        )}

        {activeTab === "password" && (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">
                Current Password
              </label>
              <input
                type="password"
                className="w-full border px-3 py-2 rounded"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">New Password</label>
              <input
                type="password"
                className="w-full border px-3 py-2 rounded"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">
                Confirm New Password
              </label>
              <input
                type="password"
                className="w-full border px-3 py-2 rounded"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Change Password
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditProfileModal;
