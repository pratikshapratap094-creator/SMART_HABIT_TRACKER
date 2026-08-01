import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./ProgressDetails.css";

function ProgressDetails() {

  const navigate = useNavigate();

  return (
    <div className="progress-details-page">

      <Sidebar />

      <div className="progress-details-content">

        <button
          className="back-btn"
          onClick={() => navigate("/view-progress")}
        >
          ← Back
        </button>

        <h1>Reading Books</h1>

        <p className="target">
          Target: 20 Pages / Day
        </p>

        <div className="progress-box">

          <div className="circle">

            <h2>75%</h2>

            <p>Completed</p>

          </div>

          <div className="stats">

            <div className="stat-card">
              <h3>🔥 Current Streak</h3>
              <p>12 Days</p>
            </div>

            <div className="stat-card">
              <h3>🏆 Longest Streak</h3>
              <p>20 Days</p>
            </div>

            <div className="stat-card">
              <h3>✅ Completed Days</h3>
              <p>24 Days</p>
            </div>

          </div>

        </div>

        <div className="quote-box">
          "Small progress every day leads to big success."
        </div>

      </div>

    </div>
  );
}

export default ProgressDetails;