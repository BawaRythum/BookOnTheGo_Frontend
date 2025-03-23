import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/register.css"; // or "./Register.css" if you copied it

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    setError(null);

    if (!username.trim()) {
      setError("Username is required");
      return;
    }

    if (!email.includes("@")) {
      setError("Invalid email format");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    const registerData = {
      username,
      email,
      password,
      timestamp: new Date().toISOString(),
    };

    console.log("Register Data:", registerData);
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleRegister} className="auth-form">
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="auth-error">{error}</p>}
        <button type="submit">Register</button>
        <p>
          Already have an account?{" "}
          <span onClick={() => navigate("/")}>Login</span>
        </p>
      </form>
    </div>
  );
}