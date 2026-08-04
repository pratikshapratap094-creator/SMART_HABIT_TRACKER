import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HabitCard from "../../components/HabitCard/HabitCard";
import Sidebar from "../../components/Sidebar/Sidebar";
import { HabitContext } from "../../context/HabitContext";
import "./Dashboard.css";

function Dashboard() {
  const { habits, setHabits } = useContext(HabitContext);

  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const [stats, setStats] = useState({
    totalHabits: 0,
    completedHabits: 0,
    totalStreak: 0,
    longestStreak: 0,
  });

  // GET HABITS + STATS
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        const storedUsername = localStorage.getItem("username");

if (storedUsername) {
  setUsername(storedUsername);
}

        if (!token) {
          navigate("/login");
          return;
        }

        // Get all habits
        const habitsResponse = await  fetch("https://smart-habit-tracker-nbqd.onrender.com/api/auth/login", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (habitsResponse.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        const habitsData = await habitsResponse.json();

        if (habitsResponse.ok) {
          setHabits(habitsData);
        }

        // Get dashboard statistics
        const statsResponse = await fetch(
          "https://smart-habit-tracker-nbqd.onrender.com/api/habits/stats",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const statsData = await statsResponse.json();

        if (statsResponse.ok) {
          setStats(statsData);
        }
      } catch (error) {
        console.log("Dashboard Error:", error);
      }
    };

    fetchDashboardData();
  }, [navigate, setHabits]);

  const totalHabits = stats.totalHabits || habits.length;

  const completedHabits =
    stats.completedHabits ||
    habits.filter((habit) => habit.isCompleted === true).length;

  const pendingHabits = totalHabits - completedHabits;

  const progress =
    totalHabits === 0
      ? 0
      : Math.round((completedHabits / totalHabits) * 100);

  // Dynamic Date
  const today = new Date();

  const currentDate = today.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const currentDay = today.toLocaleDateString("en-IN", {
    weekday: "long",
  });

  return (
    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-content">

        {/* Header */}

        <div className="dashboard-header">

          <div>

           <h1>
  Good Morning, <span>{username}! 👋</span>
</h1>

            <p>
              Keep going! Small steps every day.
            </p>

          </div>

          <div className="header-right">

            <div className="notification">
              🔔
            </div>

            <div className="date-card">

              <h3>{currentDate}</h3>

              <p>{currentDay}</p>

            </div>

          </div>

        </div>

        {/* Summary Cards */}

        <div className="summary-cards">

          <div className="summary-card">

            <div className="summary-icon total">
              📋
            </div>

            <div className="summary-info">

              <h3>{totalHabits}</h3>

              <p>Total Habits</p>

            </div>

          </div>

          <div className="summary-card">

            <div className="summary-icon completed">
              ✅
            </div>

            <div className="summary-info">

              <h3>{completedHabits}</h3>

              <p>Completed</p>

            </div>

          </div>

          <div className="summary-card">

            <div className="summary-icon streak">
              ⏳
            </div>

            <div className="summary-info">

              <h3>{pendingHabits}</h3>

              <p>Pending Habits</p>

            </div>

          </div>

          <div className="summary-card">

            <div className="summary-icon progress">
              📈
            </div>

            <div className="summary-info">

              <h3>{progress}%</h3>

              <p>Completion Rate</p>

            </div>

          </div>

        </div>

        {/* Habit Cards */}

        <div className="habit-list">

          {habits.map((habit) => (

           <HabitCard
  key={habit._id}
  id={habit._id}
  title={habit.title}
  target={habit.target}
  unit={habit.unit}
  isCompleted={habit.isCompleted}
/>

          ))}

        </div>

        {/* Motivation Card */}

        <div className="motivation-card">

          <div className="motivation-text">

            <h2>🌱 Motivation of the Day</h2>

            <p>
              "Success is the sum of small efforts, repeated day in and day out."
            </p>

          </div>

          <div className="motivation-image">

            📚☕🌿

          </div>

        </div>

        {/* Add Button */}

        <button
          className="add-btn"
          onClick={() => navigate("/add-habit")}
        >
          ＋ Add New Habit
        </button>

      </div>

    </div>
  );
}

export default Dashboard;