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
import {
  FaGithub,
  FaGoogle,
  FaEye,
  FaEyeSlash,
  FaApple,
} from "react-icons/fa6";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, githubProvider } from "../../libs/firebase";

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
    if (userInfo) {
      navigate("/");
    }
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
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 flex flex-col md:flex-row ">
      {/* Left: Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-4xl font-bold text-center text-neutral-800 dark:text-neutral-100">
            Sign In
          </h1>
          <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
            Welcome back! Please log in to continue.
          </p>

          <form onSubmit={submitHandler} className="space-y-5">
            {/* Email */}
            <div className="space-y-1">
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
            </div>

            {/* Password */}
            <div className="relative space-y-1">
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
            </div>

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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition disabled:opacity-50"
            >
              {isLoading ? (
                <Loader className="mx-auto animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-full bg-neutral-400 dark:bg-neutral-700"></div>
              <span className="text-neutral-500 text-sm w-full text-center">
                Or continue with
              </span>
              <div className="h-px w-full bg-neutral-400 dark:bg-neutral-700"></div>
            </div>

            {/* OAuth Buttons */}
            <div className="space-y-2">
              <button
                onClick={handleGitHubLogin}
                className="flex items-center justify-center w-full py-3 gap-3 rounded-lg bg-neutral-800 text-white hover:bg-neutral-900 transition"
              >
                <FaGithub size={20} />
                Continue with GitHub
              </button>
              <button
                onClick={handleGoogleLogin}
                className="flex items-center justify-center w-full py-3 gap-3 rounded-lg bg-white text-black border border-neutral-400 hover:bg-neutral-100 transition"
              >
                <FaGoogle size={20} className="text-red-500" />
                Continue with Google
              </button>
            </div>

            <p className="text-sm text-center text-neutral-600 dark:text-neutral-300">
              New to our platform?{" "}
              <Link
                to="/signup"
                className="text-green-600 font-semibold hover:underline"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right: Visual Side */}
      <div className="hidden md:flex w-1/2 bg-neutral-50 dark:bg-neutral-800 items-center justify-center p-10">
        <div className="max-w-md text-center space-y-6">
          <img
            src="https://illustrations.popsy.co/white/dashboard-monitor.svg"
            alt="Login Illustration"
            className="w-full h-auto"
          />
          <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-100">
            Unlock powerful tools and insights
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            Sign in to access your personalized dashboard, manage settings, and
            collaborate effectively.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
