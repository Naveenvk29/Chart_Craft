import { useState } from "react";
import { useForgetPasswordMutation } from "../../redux/api/usersApi";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sendReset, { isLoading }] = useForgetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendReset({ email }).unwrap();
      toast.success("📧 Reset link sent! Check your email.");
      setEmail(""); // clear field on success
    } catch (err) {
      toast.error(err?.data?.message || "Error sending reset email");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gradient-to-br from-neutral-100 to-neutral-300 dark:from-neutral-900 dark:to-neutral-950 px-4">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="shadow-xl p-8 rounded-xl w-full max-w-md bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-neutral-900 dark:text-neutral-100">
          Forgot Password
        </h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border border-neutral-400 dark:border-neutral-600 rounded-md mb-4 bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400"
        />
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 text-white py-2 rounded-md font-semibold"
        >
          {isLoading ? "Sending..." : "Send Reset Link"}
        </motion.button>
      </motion.form>
    </div>
  );
};

export default ForgotPassword;
