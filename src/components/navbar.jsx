import { NavLink, useNavigate } from "react-router-dom";
import "../css/nav.css";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-logo">🎟️ <strong>BookOnTheGo</strong></span>
      </div>

      <div className="navbar-right">
        <NavLink to="/home" className="nav-link">Home</NavLink>
        <NavLink to="/myevents" className="nav-link">My Events</NavLink>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
    </nav>
  );
}
