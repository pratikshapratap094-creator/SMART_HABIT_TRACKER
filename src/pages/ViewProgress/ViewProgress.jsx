import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { HabitContext } from "../../context/HabitContext";
import getHabitIcon from "../../utils/getHabitIcon";
import "./ViewProgress.css";

function ViewProgress() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { habits } = useContext(HabitContext);

  const habit = habits.find(
    (habit) => habit._id === id
  );

  if (!habit) {
    return (
      <div className="progress-page">
        <Sidebar />

        <div className="progress-content">
          <h2>Habit Not Found</h2>

          <button
            className="back-btn"
            onClick={() => navigate("/view-progress")}
          >
            ← Back
          </button>
        </div>
      </div>
    );
  }

  // Current date
const today = new Date();

// Current month (0-11)
const currentMonth = today.getMonth();

// Current year
const currentYear = today.getFullYear();

// Total days in current month
const totalDaysInMonth = new Date(
  currentYear,
  currentMonth + 1,
  0
).getDate();

// Count completed days in current month
const completedDaysThisMonth = habit.completedDates.filter((date) => {
  const completedDate = new Date(date);

  return (
    completedDate.getMonth() === currentMonth &&
    completedDate.getFullYear() === currentYear
  );
}).length;

// Calculate progress percentage
const progress = Math.round(
  (completedDaysThisMonth / totalDaysInMonth) * 100
);

// Status
const status =
  completedDaysThisMonth > 0 ? "Completed" : "Pending";

  return (
    <div className="progress-page">
      <Sidebar />

      <div className="progress-content">
        <button
          className="back-btn"
          onClick={() => navigate("/view-progress")}
        >
          ← Back
        </button>

        <div className="habit-header">
          <div className="habit-icon">
            {getHabitIcon(habit.title)}
          </div>

          <div>
            <h2>{habit.title}</h2>

            <p>
              🎯 Target: {habit.target} {habit.unit}
            </p>
          </div>
        </div>

        <h3 className="month-title">
          Monthly Progress
        </h3>

        <div className="circle-wrapper">
          <div
            className="circle-progress"
            style={{
              background: `conic-gradient(
                #F66C7A ${progress * 3.6}deg,
                #FFD6D6 0deg
              )`,
            }}
          >
            <div className="circle-inner">
              <h1>{progress}%</h1>

              <span>{status}</span>
            </div>
          </div>
        </div>

        <div className="stats">
          <div className="stat-box">
            <h2>{habit.streak}</h2>

            <p>Current Streak</p>
          </div>

          <div className="stat-box">
            <h2>{habit.streak}</h2>

            <p>Longest Streak</p>
          </div>

          <div className="stat-box">
           <h2>{completedDaysThisMonth}</h2>
            <p>Completed Days</p>
          </div>
        </div>

        <div className="motivation">
          <span className="star">⭐</span>

          <div>
            <h4>Consistency is the key to success.</h4>

            <p>Every small step counts. Keep going! 💪</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProgress;