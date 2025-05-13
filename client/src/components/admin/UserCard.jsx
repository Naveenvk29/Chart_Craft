const UserCard = ({ user, onRoleChangeClick }) => {
  return (
    <div className="bg-white p-5  rounded shadow-2xl w-full hover:bg-gray-200 hover:scale-105 transition-all duration-300 ease-in-out ">
      <h2 className="text-lg font-semibold truncate">
        Username: {user.username}
      </h2>
      <p className="text-sm text-gray-600 truncate">
        Email-Id:-
        {user.email}
      </p>
      <p className="mt-1 text-sm">
        <span className="font-medium">Role:</span> {user.role}
      </p>
      <button
        onClick={() => onRoleChangeClick(user)}
        className="mt-3 px-4 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Change Role
      </button>
    </div>
  );
};

export default UserCard;
