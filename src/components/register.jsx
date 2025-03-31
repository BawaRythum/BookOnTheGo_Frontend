import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "./api";
import "../css/register.css";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    if (!username.trim()) {
      setError("Username is required");
      setIsLoading(false);
      return;
    }

    if (!email.includes("@")) {
      setError("Invalid email format");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    try {
      const registerData = { username, email, password };
      const response = await registerUser(registerData);
      const responseData = response.data;

      if (responseData.accessToken) {
        localStorage.setItem("token", responseData.accessToken);
      }

      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => {
        navigate("/otp-verification", { state: { email } });
      }, 1500);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Registration failed. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleRegister} className="auth-form">
        <h1 className="logo">🎟️ BookOnTheGo</h1>
        <h2>Join & Discover Events</h2>
        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">{success}</div>}

        <div className="input-group">
          <FaUser className="input-icon" />
          <input
            type="text"
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <FaEnvelope className="input-icon" />
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <FaLock className="input-icon" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength="6"
            required
          />
          <span className="toggle-password" onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Registering..." : "Create Account"}
        </button>

        <p className="auth-navigate">
          Already a member?{" "}
          <span onClick={() => navigate("/")}>Log in here</span>
        </p>
      </form>
    </div>
  );
}