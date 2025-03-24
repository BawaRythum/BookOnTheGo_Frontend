import { NavLink } from "react-router-dom";
import "../css/nav.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">BookOnTheGo</div>
      <div className="navbar-links">
        <NavLink to="/home" className="nav-link">Home</NavLink>
        <NavLink to="/myevents" className="nav-link">My Events</NavLink>
      </div>
    </nav>
  );
}