import { createContext, useState } from "react";

export const HabitContext = createContext();

function HabitProvider({ children }) {
  const [habits, setHabits] = useState([]);

  // ADD HABIT
  const addHabit = async (habitData) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://smart-habit-tracker-nbqd.onrender.com/api/habits",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(habitData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add habit");
      }

      setHabits((prevHabits) => [
        ...prevHabits,
        data.habit,
      ]);

      return data.habit;
    } catch (error) {
      console.log("Add Habit Error:", error);
      throw error;
    }
  };

  // UPDATE HABIT
  const updateHabit = async (id, updatedData) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://smart-habit-tracker-nbqd.onrender.com/api/habits/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update habit");
      }

      setHabits((prevHabits) =>
        prevHabits.map((habit) =>
          habit._id === id ? data.habit : habit
        )
      );

      return data.habit;
    } catch (error) {
      console.log("Update Habit Error:", error);
      throw error;
    }
  };

  // DELETE HABIT
  const deleteHabit = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://smart-habit-tracker-nbqd.onrender.com/api/habits/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete habit");
      }

      setHabits((prevHabits) =>
        prevHabits.filter((habit) => habit._id !== id)
      );

      return data;
    } catch (error) {
      console.log("Delete Habit Error:", error);
      throw error;
    }
  };

  // COMPLETE HABIT
  const toggleHabit = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `https://smart-habit-tracker-nbqd.onrender.com/api/habits/${id}/complete`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to complete habit");
      }

      setHabits((prevHabits) =>
        prevHabits.map((habit) =>
          habit._id === id ? data.habit : habit
        )
      );

      return data.habit;
    } catch (error) {
      console.log("Complete Habit Error:", error);
      throw error;
    }
  };

  return (
    <HabitContext.Provider
      value={{
        habits,
        setHabits,
        addHabit,
        updateHabit,
        deleteHabit,
        toggleHabit,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
}

export default HabitProvider;