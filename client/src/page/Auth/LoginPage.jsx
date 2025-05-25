import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  useSigninMutation,
  useOauthLoginUserMutation,
} from "../../redux/api/usersApi";
import { setCredentials } from "../../redux/features/authSlice";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";
import { FaGithub, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa6";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, githubProvider } from "../../libs/firebase";
import { motion } from "framer-motion";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useSigninMutation();
  const [oauthLoginUser] = useOauthLoginUserMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) navigate("/");
  }, [userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("⚠️ Please fill in all fields");
      return;
    }

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res, rememberMe }));
      navigate("/user-profile");
    } catch (err) {
      toast.error(`⚠️ ${err?.data?.message || err.error}`);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseIdToken = await result.user.getIdToken();
      const response = await oauthLoginUser({ firebaseIdToken }).unwrap();
      dispatch(setCredentials(response));
      navigate("/user-profile");
    } catch (error) {
      console.log(error);
      toast.error("Google login failed");
    }
  };

  const handleGitHubLogin = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const firebaseIdToken = await result.user.getIdToken();
      const response = await oauthLoginUser({ firebaseIdToken }).unwrap();
      dispatch(setCredentials(response));
      navigate("/user-dashboard");
    } catch (error) {
      console.log(error);
      toast.error("GitHub login failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-neutral-100 dark:bg-neutral-950 flex flex-col md:flex-row"
    >
      {/* Left: Form */}
      <motion.div
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-1/2 flex items-center justify-center px-6 py-12"
      >
        <motion.div
          className="w-full max-w-md space-y-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.h1
            className="text-4xl font-bold text-center text-neutral-800 dark:text-neutral-100"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            Sign In
          </motion.h1>

          <motion.p
            className="text-center text-sm text-neutral-600 dark:text-neutral-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Welcome back! Please log in to continue.
          </motion.p>

          <motion.form
            onSubmit={submitHandler}
            className="space-y-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Email */}
            <motion.div whileFocus={{ scale: 1.02 }} className="space-y-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 rounded-md bg-transparent border border-neutral-500 placeholder-neutral-600 dark:placeholder-neutral-400 text-neutral-800 dark:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </motion.div>

            {/* Password */}
            <motion.div className="relative space-y-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full px-4 py-3 rounded-md bg-transparent border border-neutral-500 placeholder-neutral-600 dark:placeholder-neutral-400 text-neutral-800 dark:text-neutral-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-10 text-neutral-400 hover:text-white"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </motion.div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm text-neutral-700 dark:text-neutral-300">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-blue-500"
                />
                Remember me
              </label>
              <Link to="/send-mail" className="hover:underline">
                Forgot Password?
              </Link>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition disabled:opacity-50"
            >
              {isLoading ? (
                <Loader className="mx-auto animate-spin" />
              ) : (
                "Sign In"
              )}
            </motion.button>

            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-full bg-neutral-400 dark:bg-neutral-700"></div>
              <span className="text-neutral-500 text-sm w-full text-center">
                Or continue with
              </span>
              <div className="h-px w-full bg-neutral-400 dark:bg-neutral-700"></div>
            </div>

            <motion.div
              className="space-y-2"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15, delayChildren: 0.2 },
                },
              }}
            >
              <motion.button
                onClick={handleGitHubLogin}
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-center w-full py-3 gap-3 rounded-lg bg-neutral-800 text-white hover:bg-neutral-900 transition"
              >
                <FaGithub size={20} />
                Continue with GitHub
              </motion.button>
              <motion.button
                onClick={handleGoogleLogin}
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-center w-full py-3 gap-3 rounded-lg bg-white text-black border border-neutral-400 hover:bg-neutral-100 transition"
              >
                <FaGoogle size={20} className="text-red-500" />
                Continue with Google
              </motion.button>
            </motion.div>

            <p className="text-sm text-center text-neutral-600 dark:text-neutral-300">
              New to our platform?{" "}
              <Link
                to="/signup"
                className="text-green-600 font-semibold hover:underline"
              >
                Register
              </Link>
            </p>
          </motion.form>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="hidden md:flex w-1/2 bg-neutral-50 dark:bg-neutral-800 items-center justify-center p-10"
      >
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="max-w-md text-center space-y-6"
        >
          <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
            Unlock powerful tools and insights
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            Sign in to access your personalized dashboard, manage settings, and
            collaborate effectively.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;
