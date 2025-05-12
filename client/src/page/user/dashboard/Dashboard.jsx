import { useSelector } from "react-redux";

const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="w-full  mx-auto h-full bg-white text-black  px-8 shadow-md rounded-md">
      <h1 className="text-3xl font-bold pt-10">
        Welcome {userInfo.user?.username}
      </h1>
    </div>
  );
};

export default Dashboard;
