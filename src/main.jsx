import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import HabitProvider from "./context/HabitContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <HabitProvider>

      <BrowserRouter>

        <App />

      </BrowserRouter>

    </HabitProvider>

  </React.StrictMode>
);