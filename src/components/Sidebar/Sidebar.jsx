import "./Sidebar.css";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">

      <div className="logo">
        <h2>Smart Habit Tracker</h2>
      </div>

      <div className="menu">

        <NavLink to="/dashboard" className="menu-item">
          🏠 Dashboard
        </NavLink>

        <NavLink to="/add-habit" className="menu-item">
          ➕ Add Habit
        </NavLink>

        <NavLink to="/edit-habits" className="menu-item">
          ✏️ Edit Habit
        </NavLink>

        <NavLink to="/delete-habits" className="menu-item">
          🗑️ Delete Habit
        </NavLink>

        <NavLink to="/view-progress" className="menu-item">
          📊 View Progress
        </NavLink>

      </div>

      <div className="logout">

        <NavLink to="/login" className="menu-item">
          🚪 Logout
        </NavLink>

      </div>

    </div>
  );
}

export default Sidebar;