import { useContext } from "react";
import { HabitContext } from "../../context/HabitContext";
import "./Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const { setHabits } = useContext(HabitContext);

  const handleLogout = () => {

  setHabits([]);

  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("username");

  navigate("/login");
};

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

        <button
          className="menu-item logout-btn"
          onClick={handleLogout}
        >
          🚪 Logout
        </button>

      </div>

    </div>
  );
}

export default Sidebar;