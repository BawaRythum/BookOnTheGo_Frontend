import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "./api";
import "../css/register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Validation
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

      // Store tokens if needed immediately
      if (responseData.accessToken) {
        localStorage.setItem('token', responseData.accessToken);
        localStorage.getItem('token')
      
      }

      // Navigate to OTP page with email/username if needed
      navigate('/otp-verification', { 
        state: { 
          email: email,
          // Add any other data needed for OTP verification
        } 
      });
      
    } catch (err) {
      // Handle API errors
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error ||
                          err.message || 
                          'Registration failed. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleRegister} className="auth-form">
        <h2>Register</h2>
        {error && <div className="auth-error">{error}</div>}
        
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength="6"
          required
        />
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Register'}
        </button>
        
        <p className="auth-navigate">
          Already have an account?{" "}
          <span onClick={() => navigate("/")}>Login here</span>
        </p>
      </form>
    </div>
  );
}