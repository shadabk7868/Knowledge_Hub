import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>

      {/* HERO SECTION */}
      <div
  className="text-white text-center py-5"
  style={{
    background: "linear-gradient(135deg, #445bc2, #521a8a)"
  }}
>
        <div className="container">
          <h1 className="display-4 fw-bold">Quiz Master</h1>
          <p className="lead mt-3">
            Challenge yourself with interactive quizzes & track your performance 🚀
          </p>

          <Link to="/categories" className="btn btn-light btn-lg mt-3 px-5 py-3 fw-bold">
            Start Quiz
          </Link>
        </div>
      </div>

      {/* FEATURES */}
      <div className="container bg-white bg-opacity-10 backdrop-blur rounded-4 py-4">
        <div className="row text-center">

          <div className="col-md-4 mb-4">
            <div className="card border-0 shadow-lg h-100 p-3">
              <div className="card-body">
                <h4 className="fw-bold">📚 Multiple Categories</h4>
                <p className="text-muted mt-2">
                  Explore quizzes on HTML, JavaScript, React & more.
                  
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card border-0 shadow-lg h-100 p-3">
              <div className="card-body">
                <h4 className="fw-bold">⚡ Instant Score</h4>
                <p className="text-muted mt-2">
                  Get real-time results & track your progress.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card border-0 shadow-lg h-100 p-3">
              <div className="card-body">
                <h4 className="fw-bold">🏆 Leaderboard</h4>
                <p className="text-muted mt-2">
                  Compete with others & climb the leaderboard.
                </p>

                <Link to="/leaderboard" className="btn btn-outline-primary mt-3">
                  View Leaderboard
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="bg-light py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">How It Works</h2>

          <div className="row">

            <div className="col-md-4 mb-4">
              <div className="p-3">
                <h5 className="fw-bold">1️⃣ Select Category</h5>
                <p className="text-muted">
                  Pick your favorite topic to start.
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="p-3">
                <h5 className="fw-bold">2️⃣ Answer Questions</h5>
                <p className="text-muted">
                  Attempt all questions carefully.
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="p-3">
                <h5 className="fw-bold">3️⃣ Get Score</h5>
                <p className="text-muted">
                  Check your results instantly.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}