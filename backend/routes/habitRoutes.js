const express = require("express");

const {
  addHabit,
  getHabits,
  updateHabit,
  deleteHabit,
  completeHabit,
  getHabitStats,
} = require("../controllers/habitController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Add Habit
router.post("/", authMiddleware, addHabit);

// Get All Habits
router.get("/", authMiddleware, getHabits);

// Update Habit
router.put("/:id", authMiddleware, updateHabit);

// Delete Habit
router.delete("/:id", authMiddleware, deleteHabit);

// Complete Habit
router.put("/:id/complete", authMiddleware, completeHabit);

// Dashboard Stats
router.get("/stats", authMiddleware, getHabitStats);

module.exports = router;