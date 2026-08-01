import { Routes, Route } from "react-router-dom";

import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";

import Dashboard from "../pages/Dashboard/Dashboard";

import AddHabit from "../pages/AddHabit/AddHabit";

import EditHabitList from "../pages/EditHabitList/EditHabitList";
import EditHabit from "../pages/EditHabit/EditHabit";

import DeleteHabitList from "../pages/DeleteHabitList/DeleteHabitList";
import DeleteHabit from "../pages/DeleteHabit/DeleteHabit";

import ViewProgressList from "../pages/ViewProgressList/ViewProgressList";
import ViewProgress from "../pages/ViewProgress/ViewProgress";

function AppRoutes() {
  return (
    <Routes>

      {/* Register & Login */}
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Add Habit */}
      <Route path="/add-habit" element={<AddHabit />} />

      {/* Edit Habit */}
      <Route path="/edit-habits" element={<EditHabitList />} />
      <Route path="/edit-habit/:id" element={<EditHabit />} />

      {/* Delete Habit */}
      <Route path="/delete-habits" element={<DeleteHabitList />} />
      <Route path="/delete-habit/:id" element={<DeleteHabit />} />

      <Route path="/view-progress" element={<ViewProgressList />} />
<Route path="/view-progress/:id" element={<ViewProgress />} />

      {/* Fallback */}
      <Route path="*" element={<Dashboard />} />

    </Routes>
  );
}

export default AppRoutes;