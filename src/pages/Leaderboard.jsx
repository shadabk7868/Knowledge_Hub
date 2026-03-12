import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Leaderboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("leaderboard")) || []
  );

  const clearLeaderboard = () => {
    if (window.confirm("Are you sure you want to clear all scores?")) {
      localStorage.removeItem("leaderboard");
      setData([]);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">Leaderboard</h3>

      {data.length === 0 ? (
        <p className="text-center text-muted">No scores yet</p>
      ) : (
        <table className="table table-striped table-hover shado">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Category</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{d.category}</td>
                <td>{d.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="d-flex gap-2 justify-content-center mt-3">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/quizzes")}
        >
          Play Again
        </button>

        <button
          className="btn btn-danger"
          onClick={clearLeaderboard}
        >
          Clear Scores
        </button>
      </div>
    </div>
  );
}
