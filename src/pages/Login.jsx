import React, { useState } from "react";
import { FaGoogle, FaApple, FaEye, FaEyeSlash } from "react-icons/fa";
import "../auth.css";
import { Link } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    // Simulate login
    setTimeout(() => {
      if (email === "test@example.com" && password === "password123") {
        setSuccess(true);
        setLoading(false);
      } else {
        setError("Invalid email or password.");
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
            Welcome back! Please login.
          </span>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <input
              type="email"
              className={`peer input-base ${
                error && !email ? "border-red-500" : ""
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
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
              className="show-hide-btn border-none "
              onClick={() => setShowPassword((s) => !s)}
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {error && !password && (
              <span className="error-msg">Enter your password.</span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe((r) => !r)}
                className="accent-primary"
              />
              Remember me
            </label>
            <a href="#" className="forgot-link">
              Forgot password?
            </a>
          </div>
          {error && <div className="error-msg shake">{error}</div>}
          {success && <div className="success-msg">Login successful!</div>}
          <button
            type="submit"
            className="primary-btn cursor-pointer w-full"
            disabled={!email || !password || loading}
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
                <span>Logging in...</span>
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <div className="divider my-6">or</div>
        <div className="flex gap-3 justify-center">
          <Link
            to="/Dashboard"
            className="social-btn"
            aria-label="Login with Google"
          >
            <FaGoogle size={20} />
          </Link>
          <button className="social-btn" aria-label="Login with Apple">
            <FaApple size={20} />
          </button>
        </div>
        <div className="mt-6 text-center text-sm">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="accent-link">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
