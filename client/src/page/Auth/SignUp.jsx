import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSignupMutation } from "../../redux/api/usersApi";
import { setCredentials } from "../../redux/features/authSlice";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import GlowingEffect from "../../components/homeComponets/GlowingEffect";

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

  const handleSubmit = async (e) => {
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
      toast.error(`⚠️ ${err?.data?.message || "Something went wrong"}`);
    }
  };

  return (
    <div className="bg-neutral-200 dark:bg-neutral-950 min-h-screen flex flex-col md:flex-row items-center justify-center gap-50 px-4 py-10">
      {/* Left Form Section */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg"
      >
        <h1 className="text-4xl font-bold text-center uppercase tracking-tight text-neutral-700 dark:text-neutral-200 mb-2">
          Sign Up
        </h1>
        <p className="text-center text-sm text-neutral-500 mb-6">
          Create a new account to get started.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Username
            </label>
            <input
              type="text"
              autoComplete="username"
              className="w-full p-3 border border-neutral-400 rounded-md bg-transparent dark:text-white"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Email Address
            </label>
            <input
              type="email"
              autoComplete="email"
              className="w-full p-3 border border-neutral-400 rounded-md bg-transparent dark:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter email"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              className="w-full p-3 border border-neutral-400 rounded-md bg-transparent dark:text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter password"
            />
            <button
              type="button"
              aria-label="Toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[45px] text-neutral-600 dark:text-neutral-300"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              className="w-full p-3 border border-neutral-400 rounded-md bg-transparent dark:text-white"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm password"
            />
            <button
              type="button"
              aria-label="Toggle confirm password visibility"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-[45px] text-neutral-600 dark:text-neutral-300"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="text-center text-sm text-neutral-600 dark:text-neutral-300">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-green-600 hover:underline"
            >
              Sign In
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full p-3 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition disabled:opacity-50"
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
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative w-full max-w-lg"
      >
        <GlowingEffect
          blur={10}
          proximity={80}
          spread={40}
          glow={true}
          movementDuration={1.4}
          borderWidth={6}
          disabled={false}
        />
        <div className="bg-white dark:bg-neutral-800 p-8 rounded-3xl shadow-xl text-center">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
            Welcome to Chart Craft!
          </h2>
          <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed mb-4">
            Chart Craft helps you transform data into beautiful visualizations —
            fast, easy, and code-free. Whether you're a student or pro, we’ve
            got you covered.
          </p>
          <ul className="text-left list-disc list-inside text-neutral-600 dark:text-neutral-400 text-sm space-y-1">
            <li>Collaborate with your team</li>
            <li>Secure and fast authentication</li>
            <li>Access powerful analytics tools</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
