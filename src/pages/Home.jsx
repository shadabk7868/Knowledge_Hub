import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container mt-5 pb-5">

      {/* HERO SECTION */}
      <div className="text-center mb-5">
        <h1 className="fw-bold text-dark">Welcome to Quiz Master</h1>
        <p className="text-muted fs-5">
          Test your knowledge with multiple categories and challenge yourself.
        </p>

        <Link to="/quizzes" className="btn btn-primary btn-lg mt-2">
          Start Quiz
        </Link>
      </div>

      {/* FEATURES */}
      <div className="row text-center mb-5">

        <div className="col-md-4 mb-4">
          <div className="card shadow h-100">
            <div className="card-body">
              <h4 className="card-title">Multiple Categories</h4>
              <p className="card-text">
                Choose from different quiz categories like Html, JavaScript,
                React and more.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow h-100">
            <div className="card-body">
              <h4 className="card-title">Instant Score</h4>
              <p className="card-text">
                Get your score immediately after finishing the quiz
                and track your performance.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card shadow h-100">
            <div className="card-body">
              <h4 className="card-title">Leaderboard</h4>
              <p className="card-text">
                Compete with other users and check the leaderboard
                to see top scores.
              </p>

              <Link to="/leaderboard" className="btn btn-outline-primary mt-2">
                View Leaderboard
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* HOW IT WORKS */}
      <div className="card shadow p-4 bg-light">
        <h3 className="text-center mb-4">How It Works</h3>

        <div className="row text-center">

          <div className="col-md-4">
            <h5 className="fw-bold">1. Select Category</h5>
            <p className="text-muted">
              Choose your favorite quiz category.
            </p>
          </div>

          <div className="col-md-4">
            <h5 className="fw-bold">2. Answer Questions</h5>
            <p className="text-muted">
              Attempt all questions and test your knowledge.
            </p>
          </div>

          <div className="col-md-4">
            <h5 className="fw-bold">3. Check Score</h5>
            <p className="text-muted">
              View your score and compare with others.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
