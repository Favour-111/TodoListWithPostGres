import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../auth.css";
const passwordStrength = (pwd) => {
  if (!pwd) return 0;
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return score;
};

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const strength = passwordStrength(password);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    // Simulate signup
    setTimeout(() => {
      if (
        !name ||
        !email ||
        !password ||
        password !== confirm ||
        strength < 2
      ) {
        setError("Please fill all fields correctly.");
        setLoading(false);
      } else {
        setSuccess(true);
        setLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="auth-bg min-h-screen flex items-center justify-center px-4">
      <div className="auth-card w-full max-w-md p-8 rounded-2xl shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg">
        <div className="flex flex-col items-center mb-6">
          <img
            src="https://static.vecteezy.com/system/resources/previews/009/591/562/non_2x/check-mark-icon-free-png.png"
            alt="Logo"
            width={70}
          />
          <h1 className="font-bold text-2xl mb-1 tracking-tight font-poppins text-gray-900 dark:text-white">
            Taskora
          </h1>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Create your account
          </span>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <input
              type="text"
              className={`peer input-base ${
                error && !name ? "border-red-500" : ""
              }`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
              aria-label="Full name"
            />
            <label className="floating-label">Full name</label>
            {error && !name && (
              <span className="error-msg">Enter your name.</span>
            )}
          </div>
          <div className="relative">
            <input
              type="email"
              className={`peer input-base ${
                error && !email ? "border-red-500" : ""
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email address"
            />
            <label className="floating-label">Email address</label>
            {error && !email && (
              <span className="error-msg">Enter a valid email.</span>
            )}
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className={`peer input-base ${
                error && !password ? "border-red-500" : ""
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-label="Password"
            />
            <label className="floating-label">Password</label>
            <button
              type="button"
              className="show-hide-btn"
              onClick={() => setShowPassword((s) => !s)}
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            <div className="strength-bar mt-2">
              <div className={`bar bar-${strength}`}></div>
            </div>
            {error && !password && (
              <span className="error-msg">Enter a password.</span>
            )}
            {password && strength < 2 && (
              <span className="error-msg">
                Password must be at least 8 characters and strong.
              </span>
            )}
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className={`peer input-base ${
                error && password !== confirm ? "border-red-500" : ""
              }`}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              aria-label="Confirm password"
            />
            <label className="floating-label">Confirm password</label>
            {error && password !== confirm && (
              <span className="error-msg">Passwords do not match.</span>
            )}
          </div>
          {error && <div className="error-msg shake">{error}</div>}
          {success && <div className="success-msg">Sign up successful!</div>}
          <button
            type="submit"
            className="primary-btn w-full"
            disabled={
              !name ||
              !email ||
              !password ||
              password !== confirm ||
              strength < 2 ||
              loading
            }
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Signing up...</span>
              </span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        <div className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <a href="/" className="accent-link">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
