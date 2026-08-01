import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { HabitContext } from "../../context/HabitContext";
import "./DeleteHabit.css";

function DeleteHabit() {

  const navigate = useNavigate();
  const { id } = useParams();

  const { habits, deleteHabit } = useContext(HabitContext);

  const habit = habits.find(
    (habit) => habit._id === id
  );

  if (!habit) {
    return (
      <div className="delete-page">

        <Sidebar />

        <div className="delete-content">

          <h2>Habit Not Found</h2>

        </div>

      </div>
    );
  }

  const handleDelete = async () => {

    try {

      await deleteHabit(habit._id);

      alert("Habit Deleted Successfully!");

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      alert("Failed to delete habit.");

    }

  };

  return (

    <div className="delete-page">

      <Sidebar />

      <div className="delete-content">

        <div className="delete-card">

          <div className="delete-icon">
            🗑️
          </div>

          <h1>Delete Habit</h1>

          <p className="delete-subtitle">
            Are you sure you want to delete this habit?
          </p>

          <div className="habit-details">

            <label>Habit Name</label>

            <input
              type="text"
              value={habit.title}
              readOnly
            />

            <label>Target</label>

            <input
              type="text"
              value={`${habit.target} ${habit.unit}`}
              readOnly
            />

          </div>

          <div className="button-group">

            <button
              className="cancel-btn"
              onClick={() => navigate("/delete-habits")}
            >
              Cancel
            </button>

            <button
              className="delete-btn"
              onClick={handleDelete}
            >
              Delete Habit
            </button>

          </div>

        </div>

      </div>

    </div>

  );
}

export default DeleteHabit;