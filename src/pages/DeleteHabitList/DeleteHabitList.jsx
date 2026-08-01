import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { HabitContext } from "../../context/HabitContext";
import "./DeleteHabitList.css";

function DeleteHabitList() {

  const { habits } = useContext(HabitContext);

  const navigate = useNavigate();

  return (
    <div className="delete-list-page">

      <Sidebar />

      <div className="delete-list-content">

        <h1>Delete Habit</h1>

        <p>Select a habit you want to delete.</p>

        <div className="delete-list">

          {habits.length === 0 ? (

            <h3>No habits available.</h3>

          ) : (

            habits.map((habit) => (

              <div
                className="delete-card"
                key={habit._id}
              >

                <div>

                  <h3>{habit.title}</h3>

                  <span>
                    Target : {habit.target} {habit.unit}
                  </span>

                </div>

                <button
                  className="delete-btn"
                  onClick={() =>
                    navigate(`/delete-habit/${habit._id}`)
                  }
                >
                  Delete
                </button>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
}

export default DeleteHabitList;