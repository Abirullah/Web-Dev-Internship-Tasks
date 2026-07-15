import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  registerUser,
  loginUser,
  clearAuthError,
  selectAuthError,
} from "../store/authSlice";

export default function AuthScreen() {
  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [localError, setLocalError] = useState("");

  const switchMode = (next) => {
    setMode(next);
    setLocalError("");
    dispatch(clearAuthError());
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError("");
    dispatch(clearAuthError());

    if (mode === "register") {
      if (!form.username.trim() || !form.email.trim() || !form.password) {
        setLocalError("Fill in every field to create an account.");
        return;
      }
      if (form.password.length < 4) {
        setLocalError("Password should be at least 4 characters.");
        return;
      }
      dispatch(registerUser(form));
    } else {
      if (!form.email.trim() || !form.password) {
        setLocalError("Enter your email and password.");
        return;
      }
      dispatch(loginUser({ email: form.email, password: form.password }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16 relative overflow-hidden">
      {/* Ambient watermark pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #0F6B5C 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative w-full max-w-sm bg-white rounded-3xl shadow-[0_20px_60px_rgba(15,26,23,0.10)] border border-[#E7E2D4] px-8 py-9"
      >
        <div className="mb-7 text-center">
          <div className="mx-auto mb-3 w-11 h-11 rounded-2xl bg-[#0F6B5C] flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 13l4 4L19 7"
                stroke="white"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-[#1B1B1D] tracking-tight">
            LocalTasker
          </h1>
          <p className="text-[13px] text-[#8A8578] mt-1">
            Your tasks, kept right here on this device.
          </p>
        </div>

        {/* Tab switch */}
        <div className="relative grid grid-cols-2 mb-6 bg-[#F1EEE4] rounded-full p-1">
          <button
            type="button"
            onClick={() => switchMode("login")}
            className={`relative py-2 text-[13px] font-medium rounded-full transition-colors ${
              mode === "login" ? "text-[#0F6B5C]" : "text-[#8A8578]"
            }`}
          >
            {mode === "login" && (
              <motion.span
                layoutId="auth-tab-pill"
                className="absolute inset-0 bg-white rounded-full shadow-sm -z-10"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            Log in
          </button>
          <button
            type="button"
            onClick={() => switchMode("register")}
            className={`relative py-2 text-[13px] font-medium rounded-full transition-colors ${
              mode === "register" ? "text-[#0F6B5C]" : "text-[#8A8578]"
            }`}
          >
            {mode === "register" && (
              <motion.span
                layoutId="auth-tab-pill"
                className="absolute inset-0 bg-white rounded-full shadow-sm -z-10"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            Create account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <AnimatePresence mode="popLayout">
            {mode === "register" && (
              <motion.div
                key="username"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <input
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E7E2D4] bg-[#FCFBF8] text-[14px] text-[#1B1B1D] placeholder:text-[#B3AE9F] focus:outline-none focus:ring-2 focus:ring-[#0F6B5C]/30 focus:border-[#0F6B5C]"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-2.5 rounded-xl border border-[#E7E2D4] bg-[#FCFBF8] text-[14px] text-[#1B1B1D] placeholder:text-[#B3AE9F] focus:outline-none focus:ring-2 focus:ring-[#0F6B5C]/30 focus:border-[#0F6B5C]"
          />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2.5 rounded-xl border border-[#E7E2D4] bg-[#FCFBF8] text-[14px] text-[#1B1B1D] placeholder:text-[#B3AE9F] focus:outline-none focus:ring-2 focus:ring-[#0F6B5C]/30 focus:border-[#0F6B5C]"
          />

          <AnimatePresence>
            {(localError || error) && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-[12.5px] text-[#C0392B] px-1"
              >
                {localError || error}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full py-2.5 rounded-xl bg-[#0F6B5C] text-white text-[14px] font-medium mt-1 hover:bg-[#0C5A4D] transition-colors"
          >
            {mode === "login" ? "Log in" : "Create account"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}