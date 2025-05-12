import DeleteUserZone from "./DeleteUserZone";
import PasswordChangeZone from "./PasswordChangeZone";
import UserProfile from "./UserProfile";

const Settings = () => {
  return (
    <div className=" w-full min-h-full bg-white text-black py-10 px-4">
      <h2 className="text-2xl font-bold mb-6 pb-2 ">Settings</h2>
      <UserProfile />
      <PasswordChangeZone />
      <DeleteUserZone />
    </div>
  );
};

export default Settings;
