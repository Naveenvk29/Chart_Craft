import { useState } from "react";
import {
  useFetchAllUserQuery,
  useModifyUserRoleMutation,
} from "../../redux/api/adminApi";
import { toast } from "react-toastify";
import UserCard from "../../components/admin/UserCard";
import RoleModal from "../../components/admin/RoleModal";

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

  const handleRoleChange = async () => {
    try {
      setIsUpdating(true);
      await modifyUserRole({
        userId: selectedUser._id,
        role: newRole,
      }).unwrap();
      toast.success("User role updated");
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update role");
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredUsers = users?.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <p className="p-4">Loading users...</p>;

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Role Management</h1>

      <input
        type="text"
        placeholder="Search by name or email..."
        className="w-full max-w-md border px-4 py-2 rounded mb-6"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20">
        {filteredUsers?.map((user) => (
          <UserCard key={user._id} user={user} onRoleChangeClick={openModal} />
        ))}
      </div>

      <RoleModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleRoleChange}
        isLoading={isUpdating}
        newRole={newRole}
        setNewRole={setNewRole}
      />
    </div>
  );
};

export default RoleManagement;
