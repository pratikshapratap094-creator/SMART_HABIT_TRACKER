import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { HabitContext } from "../../context/HabitContext";
import "./EditHabit.css";

function EditHabit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { habits, updateHabit } = useContext(HabitContext);

  const habit = habits.find((habit) => habit._id === id);

  if (!habit) {
    return (
      <div className="edit-page">
        <Sidebar />
        <div className="edit-content">
          <h2>Habit Not Found</h2>
        </div>
      </div>
    );
  }

  const [habitName, setHabitName] = useState(habit.title);
  const [target, setTarget] = useState(habit.target);
  const [unit, setUnit] = useState(habit.unit || "");

  const saveChanges = async () => {
    if (
      habitName.trim() === "" ||
      target === "" ||
      unit.trim() === ""
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      await updateHabit(id, {
        title: habitName,
        category: habit.category,
        target: Number(target),
        unit: unit.trim(),
      });

      alert("Habit Updated Successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert("Unable to update habit.");
    }
  };

  return (
    <div className="edit-page">
      <Sidebar />

      <div className="edit-content">

        <button
          className="back-btn"
          onClick={() => navigate("/edit-habits")}
        >
          ← Back
        </button>

        <h1>Edit Habit</h1>

        <div className="edit-card">

          <label>Habit Name</label>

          <input
            type="text"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
          />

          <label>Target</label>

          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          />

          <label>Unit</label>

          <input
            type="text"
            placeholder="Example: Pages, Minutes, KM, Glasses"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          />

          <button
            className="save-btn"
            onClick={saveChanges}
          >
            Save Changes
          </button>

        </div>

      </div>
    </div>
  );
}

export default EditHabit;