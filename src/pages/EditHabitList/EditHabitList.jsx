import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { HabitContext } from "../../context/HabitContext";
import getHabitIcon from "../../utils/getHabitIcon";
import "./EditHabitList.css";

function EditHabitList() {

  const navigate = useNavigate();

  const { habits } = useContext(HabitContext);

  return (

    <div className="edit-list-page">

      <Sidebar />

      <div className="edit-list-content">

        <h1>Edit Habit</h1>

        <p>Select a habit to edit.</p>

        <div className="habit-list">

          {habits.length === 0 ? (

            <h3>No Habits Found.</h3>

          ) : (

            habits.map((habit) => (

              <div
                className="habit-card"
                key={habit._id}
              >

                <div className="habit-left">

                  <div className="habit-icon">

                    {getHabitIcon(habit.title)}

                  </div>

                  <div>

                    <h3>{habit.title}</h3>

                    <p>
                      🎯 Target: {habit.target} {habit.unit}
                    </p>

                  </div>

                </div>

                <button
                  className="arrow-btn"
                  onClick={() => navigate(`/edit-habit/${habit._id}`)}
                >
                  ❯
                </button>

              </div>

            ))

          )}

        </div>

      </div>

    </div>

  );
}

export default EditHabitList;