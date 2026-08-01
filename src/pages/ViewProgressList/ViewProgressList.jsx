import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { HabitContext } from "../../context/HabitContext";
import "./ViewProgressList.css";

function ViewProgressList() {
  const navigate = useNavigate();
  const { habits } = useContext(HabitContext);

  return (
    <div className="progress-page">
      <Sidebar />

      <div className="progress-content">
        <h1>View Progress</h1>

        <p>Select a habit to view progress.</p>

        <div className="progress-list">
          {habits.length === 0 ? (
            <h3>No Habits Found.</h3>
          ) : (
            habits.map((habit) => (
              <div
                className="progress-card"
                key={habit._id}
              >
                <div>
                  <h3>{habit.title}</h3>

                  <p>
                    🎯 Target: {habit.target} {habit.unit}
                  </p>
                </div>

                <button
                  onClick={() =>
                    navigate(`/view-progress/${habit._id}`)
                  }
                >
                  ➜
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewProgressList;