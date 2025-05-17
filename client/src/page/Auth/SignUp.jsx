import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSignupMutation } from "../../redux/api/usersApi";
import { setCredentials } from "../../redux/features/authSlice";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [register, { isLoading }] = useSignupMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) navigate("/");
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("❌ Passwords do not match!");
      return;
    }
    try {
      const res = await register({ username, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      toast.error(`⚠️ ${err?.data?.message || err.error}`);
      console.log(err);
    }
  };

  return (
    <div className="bg-neutral-300 dark:bg-neutral-950 min-h-screen flex flex-col md:flex-row justify-around items-center">
      {/* Left Form Side */}
      <div className="px-10 py-4 min-w-4xl min-h-screen flex flex-col justify-center items-center space-y-2">
        <h1 className="text-center text-4xl font-bold tracking-tight text-neutral-600 dark:text-neutral-300 uppercase">
          Sign Up
        </h1>
        <p className="text-center text-sm tracking-wide font-medium text-neutral-500">
          Create a new account to get started.
        </p>

        <form onSubmit={submitHandler} className="space-y-5 w-xl mx-auto">
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-3 border border-neutral-500 rounded-md focus:ring-2 focus:ring-neutral-600 focus:outline-none text-neutral-800 dark:text-neutral-300 bg-transparent placeholder-neutral-600"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-neutral-500 rounded-md focus:ring-2 focus:ring-neutral-600 focus:outline-none text-neutral-800 dark:text-neutral-300 bg-transparent placeholder-neutral-600"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full p-3 border border-neutral-500 rounded-md focus:ring-2 focus:ring-neutral-600 focus:outline-none text-neutral-800 dark:text-neutral-300 bg-transparent placeholder-neutral-600"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-6 top-11 text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="space-y-2 relative">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              className="w-full p-3 border border-neutral-500 rounded-md focus:ring-2 focus:ring-neutral-600 focus:outline-none text-neutral-800 dark:text-neutral-300 bg-transparent placeholder-neutral-600"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-6 top-11 text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="text-center">
            <p className="text-md text-neutral-600 dark:text-neutral-300">
              Already have an account?{" "}
              <Link
                to="/login"
                className="hover:underline hover:text-green-500"
              >
                <span className="text-lg text-green-600 font-bold">
                  Sign In
                </span>
              </Link>
            </p>
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="w-full p-3 bg-gray-600 text-white rounded-xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex justify-center">
                <Loader className="animate-spin text-white" />
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
      </div>

      {/* Right Panel */}
      <div className="bg-neutral-100 dark:bg-neutral-800 min-h-screen min-w-4xl flex flex-col justify-center items-center p-10">
        <div className="bg-bg-neutral-50 text-neutral-900 dark:text-neutral-100 rounded-2xl p-10 shadow-xl w-4/5">
          <h2 className="text-2xl font-bold mb-4">Welcome to Chart Craft!</h2>
          <p className="text-md leading-relaxed">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda,
            repudiandae laborum neque eos eaque necessitatibus. Nulla obcaecati
            soluta at ad expedita. Amet rem architecto, quasi error, voluptatem
            accusamus odit temporibus fuga doloribus placeat consectetur optio.
            Maxime ea, vitae ipsa quo dolor ipsum ut harum sed hic incidunt
            labore, laboriosam facilis itaque assumenda cum reprehenderit modi?
            Hic accusamus ex a natus.
          </p>
          <div className="mt-6">
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Collaborate with your team</li>
              <li>Secure and easy authentication</li>
              <li>Access powerful tools and analytics</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
