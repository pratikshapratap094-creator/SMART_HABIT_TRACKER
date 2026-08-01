const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      default: "General",
    },

    target: {
      type: Number,
      default: 1,
    },

    // ✅ NEW FIELD
    unit: {
      type: String,
      default: "Times",
    },

    streak: {
      type: Number,
      default: 0,
    },

    completedDates: [
      {
        type: Date,
      },
    ],

    isCompleted: {
      type: Boolean,
      default: false,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Habit", habitSchema);