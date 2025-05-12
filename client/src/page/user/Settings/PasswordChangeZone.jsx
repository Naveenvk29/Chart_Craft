import { useState } from "react";
const PasswordChangeZone = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="w-full max-w-4xl mt-5 mx-auto h-full bg-white text-black py-5 px-8 shadow-md rounded-md">
      <div className="">
        <h2 className="text-2xl font-bold">Change Password</h2>
        <p className="text-sm text-gray-600">
          Update your password to keep your account secure.
        </p>
      </div>
    </div>
  );
};

export default PasswordChangeZone;
