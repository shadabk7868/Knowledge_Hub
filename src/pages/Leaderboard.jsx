import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";
export default function Leaderboard() {
  const { category } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const snapshot = await getDocs(collection(db, "leaderboard"));

        let list = [];
        snapshot.forEach((doc) => {
          list.push(doc.data());
        });

        setData(list);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLeaderboard();
  }, []);

  const filteredData = data
    .filter(
      (item) =>
        item.category?.toLowerCase() === category?.toLowerCase()
    )
    .sort((a, b) => b.score - a.score);

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

      <div className="text-center mt-3">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/categories")}
        >
          Play Again
        </button>
      </div>
    </div>
  );
}