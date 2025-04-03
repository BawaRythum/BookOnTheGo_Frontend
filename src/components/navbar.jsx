import { NavLink, useNavigate } from "react-router-dom";
import "../css/nav.css";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole); 
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");  
    localStorage.removeItem("role");   
    navigate("/"); 
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-logo">🎟️ <strong>BookOnTheGo</strong></span>
      </div>

      <div className="navbar-right">
        <NavLink to="/home" className="nav-link">Home</NavLink>

        {role === "Organizer" && (
          <NavLink to="/myevents" className="nav-link">My Events</NavLink>
        )}

        <button onClick={handleLogout} className="logout-button">LogOut</button>
      </div>
    </nav>
  );
}
