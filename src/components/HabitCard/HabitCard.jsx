import { useContext } from "react";
import "./HabitCard.css";
import getHabitIcon from "../../utils/getHabitIcon";
import { HabitContext } from "../../context/HabitContext";

function HabitCard({
  id,
  title,
  target,
  unit,
  isCompleted,
}) {

  const { toggleHabit } = useContext(HabitContext);

  const handleComplete = async () => {
    try {
      await toggleHabit(id);
    } catch (error) {
      console.log(error);
      alert("Unable to complete habit.");
    }
  };

  return (

    <div className="habit-card">

      <div className="habit-left">

        <div className="habit-icon">
          {getHabitIcon(title)}
        </div>

        <div className="habit-info">

          <h3>{title}</h3>

          <p>
            🎯 Target: {target} {unit}
          </p>

        </div>

      </div>

      {/* Completion Checkbox */}

      <input
        className="habit-checkbox"
        type="checkbox"
        checked={isCompleted}
        onChange={handleComplete}
      />

    </div>

  );
}

export default HabitCard;