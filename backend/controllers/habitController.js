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

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayString = today.toISOString().split("T")[0];

    const completedToday = habit.completedDates.some(
      (date) =>
        new Date(date).toISOString().split("T")[0] === todayString
    );

    if (completedToday) {
      habit.completedDates = habit.completedDates.filter(
        (date) =>
          new Date(date).toISOString().split("T")[0] !== todayString
      );

      habit.isCompleted = false;

     habit.streak = Math.max(0, habit.streak - 1);
      await habit.save();

      return res.status(200).json({
        message: "Habit marked as incomplete",
        habit,
      });
    }

    // Complete habit
    habit.completedDates.push(today);

    habit.completedDates.sort(
      (a, b) => new Date(a) - new Date(b)
    );

    let previousDate = null;

    if (habit.completedDates.length > 1) {
      previousDate = new Date(
        habit.completedDates[habit.completedDates.length - 2]
      );
      previousDate.setHours(0, 0, 0, 0);
    }

    if (previousDate) {
      const diffInDays =
        (today - previousDate) / (1000 * 60 * 60 * 24);

      if (diffInDays === 1) {
        habit.streak += 1;
      } else {
        habit.streak = 1;
      }
    } else {
      habit.streak = 1;
    }

    habit.isCompleted = true;

    if (habit.streak > habit.longestStreak) {
      habit.longestStreak = habit.streak;
    }

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

// =======================
// DASHBOARD STATS
// =======================
// =======================
// DASHBOARD STATS
// =======================
const getHabitStats = async (req, res) => {
  try {
    const habits = await Habit.find({
      user: req.user.id,
    });

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const totalHabits = habits.length;

    // Habits completed at least once this month
    const completedHabits = habits.filter((habit) =>
      habit.completedDates.some((date) => {
        const completedDate = new Date(date);

        return (
          completedDate.getMonth() === currentMonth &&
          completedDate.getFullYear() === currentYear
        );
      })
    ).length;

    const totalStreak = habits.reduce(
      (sum, habit) => sum + habit.streak,
      0
    );

    const longestStreak =
      habits.length > 0
        ? Math.max(
            ...habits.map(
              (habit) => habit.longestStreak || 0
            )
          )
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
module.exports = {
  addHabit,
  getHabits,
  updateHabit,
  deleteHabit,
  completeHabit,
  getHabitStats,
};