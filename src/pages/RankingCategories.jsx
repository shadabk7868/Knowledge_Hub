import { useNavigate } from "react-router-dom";

export default function RankingCategories() {

  const navigate = useNavigate();

  const categories = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
  ];

  return (
    <div className="container mt-5">

      <h2 className="text-center fw-bold mb-5">
        🏆 Quiz Rankings
      </h2>

      <div className="row justify-content-center">

        {categories.map((cat, index) => (

          <div key={index} className="col-md-3 mb-4">

            <div
              className="card shadow border-0 p-4 text-center h-100"
              style={{
                cursor: "pointer",
                borderRadius: "16px",
                transition: "0.3s",
              }}
              onClick={() =>
                navigate(`/leaderboard/${cat}`)
              }
            >
              <h4 className="fw-bold">
                {cat}
              </h4>

              <p className="text-muted mt-2">
                View leaderboard
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}