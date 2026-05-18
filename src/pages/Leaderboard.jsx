import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { collection, getDocs, query, where} from "firebase/firestore";
import { db } from "../Firebase";
export default function Leaderboard() {
  const { category } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
  const q = query(
    collection(db, "leaderboard"),
    where("category", "==", category)
  );

  const snapshot = await getDocs(q);

  let list = [];

  snapshot.forEach((doc) => {
    list.push(doc.data());
  });

  setData(list);

} catch (error) {
  console.error(error);
}
finally {
  setLoading(false);
}
    };

    fetchLeaderboard();
  }, [category]);

  const filteredData = data
  .filter(
    (item) =>
      item.category?.toLowerCase() === category?.toLowerCase()
  )
  .reduce((acc, current) => {

    const existingUser = acc.find(
      (item) => item.email === current.email
    );

    if (!existingUser) {
      acc.push(current);
    }
    else if (current.score > existingUser.score) {

      const index = acc.findIndex(
        (item) => item.email === current.email
      );

      acc[index] = current;
    }

    return acc;

  }, [])
  .sort((a, b) => b.score - a.score);

  if (loading) {
  return (
    <div className="text-center mt-5">
      <div className="spinner-border text-primary"></div>
    </div>
  );
}

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">
        {category} Leaderboard 🏆
      </h3>

      {filteredData.length === 0 ? (
        <p className="text-center text-muted">No scores yet</p>
      ) : (
        <table className="table table-striped table-hover shadow">
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