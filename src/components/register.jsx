import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "./api";
import { subscribeToUpdates } from "./notificationApi"; // Add this import
import "../css/register.css";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserTag,
  FaTicketAlt,
} from "react-icons/fa";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("Attendee");
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

    const trimmedUsername = username.trim();
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    const hasNumber = /\d/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (
      !usernameRegex.test(trimmedUsername) ||
      trimmedUsername.length < 4 ||
      !hasNumber.test(trimmedUsername)
    ) {
      setError(
        "Username must be alphanumeric, at least 4 characters, and include at least one number."
      );
      setIsLoading(false);
      return;
    }

    if (!email.includes("@")) {
      setError("Invalid email format");
      setIsLoading(false);
      return;
    }

    if (
      password.length < 6 ||
      !hasNumber.test(password) ||
      !hasSpecialChar.test(password)
    ) {
      setError(
        "Password must be at least 6 characters and include a number and a special character"
      );
      setIsLoading(false);
      return;
    }

    try {
      const registerData = {
        username,
        email,
        password,
        role: accountType,  
      };

      const response = await registerUser(registerData);
      const responseData = response.data;

      if (responseData.accessToken) {
        localStorage.setItem("token", responseData.accessToken);
        localStorage.setItem("role", responseData.role);  // Save role here
      }

      // ✅ Subscribe the user to event updates
      try {
        await subscribeToUpdates(email);
      } catch (subErr) {
        console.warn("Subscription to updates failed (will not block user):", subErr.message);
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
        <h2>Create your account</h2>
        <p className="subtext">
          Join BookOnTheGo to discover and manage events with ease
        </p>

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

        <div className="account-type">
          <p>Account Type</p>
          <div className="radio-options-inline">
            <label
              className={`radio-inline-card ${
                accountType === "Attendee" ? "selected" : ""
              }`}
            >
              <input
                type="radio"
                name="accountType"
                value="Attendee"
                checked={accountType === "Attendee"}
                onChange={() => setAccountType("Attendee")}
              />
              <div className="radio-label-content">
                <FaTicketAlt className="radio-icon" />
                <span>Attendee</span>
              </div>
            </label>

            <label
              className={`radio-inline-card ${
                accountType === "Organizer" ? "selected" : ""
              }`}
            >
              <input
                type="radio"
                name="accountType"
                value="Organizer"
                checked={accountType === "Organizer"}
                onChange={() => setAccountType("Organizer")}
              />
              <div className="radio-label-content">
                <FaUserTag className="radio-icon" />
                <span>Event Organizer</span>
              </div>
            </label>
          </div>
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