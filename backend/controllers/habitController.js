const Habit = require("../models/Habit");

// =======================
// ADD HABIT
// =======================
const addHabit = async (req, res) => {
  try {
    const { title, category, target, unit } = req.body;

    const habit = await Habit.create({
      title,
      category,
      target,
      unit,
      user: req.user.id,
    });

    res.status(201).json({
      message: "Habit Added Successfully",
      habit,
    });
  } catch (error) {
    console.error("ADD HABIT ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =======================
// GET ALL HABITS
// =======================
// =======================
// GET ALL HABITS
// =======================
const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({
      user: req.user.id,
    });

    const today = new Date().toISOString().split("T")[0];

    const updatedHabits = habits.map((habit) => {

      const completedToday = habit.completedDates.some(
        (date) =>
          new Date(date).toISOString().split("T")[0] === today
      );

      return {
        ...habit.toObject(),
        isCompleted: completedToday,
      };
    });

    res.status(200).json(updatedHabits);

  } catch (error) {

    console.error("GET HABITS ERROR:", error);

    res.status(500).json({
      message: error.message,
    });

  }
};
// =======================
// UPDATE HABIT
// =======================
const updateHabit = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, target, unit } = req.body;

    const habit = await Habit.findOneAndUpdate(
      {
        _id: id,
        user: req.user.id,
      },
      {
        title,
        category,
        target,
        unit,
      },
      {
        new: true,
      }
    );

    if (!habit) {
      return res.status(404).json({
        message: "Habit not found",
      });
    }

    res.status(200).json({
      message: "Habit Updated Successfully",
      habit,
    });
  } catch (error) {
    console.error("UPDATE HABIT ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =======================
// DELETE HABIT
// =======================
const deleteHabit = async (req, res) => {
  try {
    const { id } = req.params;

    const habit = await Habit.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!habit) {
      return res.status(404).json({
        message: "Habit not found",
      });
    }

    res.status(200).json({
      message: "Habit Deleted Successfully",
    });
  } catch (error) {
    console.error("DELETE HABIT ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =======================
// COMPLETE / INCOMPLETE HABIT
// =======================
const completeHabit = async (req, res) => {
  try {
    const { id } = req.params;

    const habit = await Habit.findOne({
      _id: id,
      user: req.user.id,
    });

    if (!habit) {
      return res.status(404).json({
        message: "Habit not found",
      });
    }

    const today = new Date().toISOString().split("T")[0];

    const completedToday = habit.completedDates.some(
      (date) => new Date(date).toISOString().split("T")[0] === today
    );

    if (completedToday) {
      // Uncomplete habit

      habit.completedDates = habit.completedDates.filter(
        (date) =>
          new Date(date).toISOString().split("T")[0] !== today
      );

      habit.isCompleted = false;

      if (habit.streak > 0) {
        habit.streak -= 1;
      }

      await habit.save();

      return res.status(200).json({
        message: "Habit marked as incomplete",
        habit,
      });
    }

    // Complete habit

    habit.completedDates.push(new Date());

    habit.isCompleted = true;

    habit.streak += 1;

    await habit.save();

    res.status(200).json({
      message: "Habit Completed Successfully",
      habit,
    });

  } catch (error) {
    console.error("COMPLETE HABIT ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

/// =======================
// DASHBOARD STATS
// =======================
const getHabitStats = async (req, res) => {
  try {

    const habits = await Habit.find({
      user: req.user.id,
    });

    const today = new Date().toISOString().split("T")[0];

    const totalHabits = habits.length;

    const completedHabits = habits.filter((habit) =>
      habit.completedDates.some(
        (date) =>
          new Date(date).toISOString().split("T")[0] === today
      )
    ).length;

    const totalStreak = habits.reduce(
      (sum, habit) => sum + habit.streak,
      0
    );

    const longestStreak =
      habits.length > 0
        ? Math.max(...habits.map((habit) => habit.streak))
        : 0;

    res.status(200).json({
      totalHabits,
      completedHabits,
      totalStreak,
      longestStreak,
    });

  } catch (error) {

    console.error("GET HABIT STATS ERROR:", error);

    res.status(500).json({
      message: error.message,
    });

  }
};

// =======================
// EXPORTS
// =======================
module.exports = {
  addHabit,
  getHabits,
  updateHabit,
  deleteHabit,
  completeHabit,
  getHabitStats,
};