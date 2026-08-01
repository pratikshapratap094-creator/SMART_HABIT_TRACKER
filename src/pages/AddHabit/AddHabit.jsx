import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { HabitContext } from "../../context/HabitContext";
import "./AddHabit.css";

function AddHabit() {
  const [habitName, setHabitName] = useState("");
  const [target, setTarget] = useState("");
  const [unit, setUnit] = useState("");

  const { addHabit } = useContext(HabitContext);
  const navigate = useNavigate();

  const saveHabit = async () => {
    if (
      habitName.trim() === "" ||
      target.trim() === "" ||
      unit.trim() === ""
    ) {
      alert("Please fill all fields.");
      return;
    }

    const newHabit = {
      title: habitName.trim(),
      category: "General",
      target: Number(target),
      unit: unit.trim(),
    };

    try {
      await addHabit(newHabit);

      setHabitName("");
      setTarget("");
      setUnit("");

      alert("Habit Added Successfully!");

      navigate("/dashboard");
    } catch (error) {
      console.error("Add Habit Error:", error);
      alert(error.message || "Failed to add habit.");
    }
  };

  return (
    <div className="add-habit-page">
      <Sidebar />

      <div className="add-habit-content">
        <h1>Add New Habit</h1>

        <div className="habit-form">

          <label>Habit Name</label>

          <input
            type="text"
            placeholder="Enter Habit Name"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
          />

          <label>Target</label>

          <input
            type="number"
            placeholder="Enter Target"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          />

          <label>Unit</label>

          <input
            type="text"
            placeholder="Example: minutes, pages, glasses, km"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          />

          <button onClick={saveHabit}>
            Save Habit
          </button>

        </div>
      </div>
    </div>
  );
}

export default AddHabit;