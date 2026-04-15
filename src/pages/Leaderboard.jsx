import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Leaderboard() {
  const navigate = useNavigate();
  const { category } = useParams();

  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("leaderboard")) || []
  );

  // ✅ case-insensitive filter
  const filteredData = data
    .filter(
      (item) =>
        item.category?.toLowerCase() === category?.toLowerCase()
    )
    .sort((a, b) => b.score - a.score);

  const clearLeaderboard = () => {
    if (window.confirm("Clear scores for this category?")) {
      const newData = data.filter(
        (item) =>
          item.category?.toLowerCase() !== category?.toLowerCase()
      );
      localStorage.setItem("leaderboard", JSON.stringify(newData));
      setData(newData);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">
        {category} Leaderboard 🏆
      </h3>

      {filteredData.length === 0 ? (
        <p className="text-center text-muted">No scores yet</p>
      ) : (
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.email}</td>
                <td>{item.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="d-flex gap-2 justify-content-center mt-3">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/categories")}
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