import { useState } from "react";
import {
  useFetchAllUserQuery,
  useModifyUserDetailsbyadminMutation,
  useRemoveAnyUserMutation,
} from "../../redux/api/adminApi";
import { toast } from "react-toastify";
import ConfirmModal from "../../components/userModal/ConfirmModal";

const UserManagement = () => {
  const { data: users, isLoading } = useFetchAllUserQuery();
  const [modifyUserDetailsbyadmin] = useModifyUserDetailsbyadminMutation();
  const [removeAnyUser] = useRemoveAnyUserMutation();

  const [editUserId, setEditUserId] = useState(null);
  const [editData, setEditData] = useState({
    username: "",
    email: "",
    role: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleEdit = (user) => {
    setEditUserId(user._id);
    setEditData({
      username: user.username,
      email: user.email,
      role: user.role,
    });
  };

  const handleSave = async () => {
    try {
      await modifyUserDetailsbyadmin({ id: editUserId, userData: editData });
      setEditUserId(null);
      toast.success("User updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user");
    }
  };

  const handleDelete = async () => {
    try {
      await removeAnyUser(selectedUserId);
      setIsModalOpen(false);
      toast.success("User deleted");
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  };

  if (isLoading) return <p>Loading users...</p>;

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-bold mb-4">User Management</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border text-sm sm:text-base">
          <thead className="font-bold">
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2 hidden sm:table-cell">Email</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="font-medium">
            {users?.map((user) => (
              <tr key={user._id} className="text-center">
                <td className="border px-4 py-2">
                  {editUserId === user._id ? (
                    <input
                      value={editData.username}
                      onChange={(e) =>
                        setEditData({ ...editData, username: e.target.value })
                      }
                      className="border px-2 py-1 w-full"
                    />
                  ) : (
                    user.username
                  )}
                </td>

                <td className="border px-4 py-2 hidden sm:table-cell">
                  {editUserId === user._id ? (
                    <input
                      value={editData.email}
                      onChange={(e) =>
                        setEditData({ ...editData, email: e.target.value })
                      }
                      className="border px-2 py-1 w-full"
                    />
                  ) : (
                    user.email
                  )}
                </td>

                <td className="border px-4 py-2">{user.role}</td>
                <td className="border px-4 py-2 space-x-1 flex flex-col sm:flex-row justify-center items-center gap-1">
                  {editUserId === user._id ? (
                    <button
                      onClick={handleSave}
                      className="text-blue-500 hover:underline"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-green-600 hover:underline"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setIsModalOpen(true);
                      setSelectedUserId(user._id);
                    }}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        title="Confirm Account Deletion"
        message="Are you sure you want to permanently delete this user? This action cannot be undone."
        confirmText="Yes, Change"
        cancelText="Cancel"
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default UserManagement;
