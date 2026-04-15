import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";

export default function Quizzes() {
  const navigate = useNavigate();
  const { category } = useParams();

  const [allQuizes, setAllQuizes] = useState({});
  const [loading, setLoading] = useState(true);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const ref = doc(db, "appdata", "allQuizes");
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data().data || {};
        setAllQuizes(data);
      }

      setLoading(false);
    };

    fetchQuizzes();
  }, []);

  useEffect(() => {
    setQuestionIndex(0);
    setSelected("");
    setShowAnswer(false);
    setScore(0);
    setQuizFinished(false);
  }, [category]);

  const quizList = allQuizes[category] || [];
  const question = quizList[questionIndex];

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
        <p className="mt-2">Loading Quiz...</p>
      </div>
    );
  }

  if (!quizList.length) {
    return <h3 className="text-center mt-5">No Quiz Found 😢</h3>;
  }

  const submitAnswer = () => {
    setShowAnswer(true);

    if (selected === question.correctOption) {
      setScore((prev) => prev + 1);
    }
  };

  const saveScore = (finalScore) => {
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  const currentUser = JSON.parse(localStorage.getItem("user"));

  if (!currentUser || !currentUser.email) {
    alert("User not logged in");
    return;
  }

  // remove old score (same user + category)
  const filtered = leaderboard.filter(
    (item) =>
      !(item.email === currentUser.email && item.category === category)
  );

  filtered.push({
    email: currentUser.email,
    category,
    score: finalScore,
    date: new Date().toLocaleString(),
  });

  localStorage.setItem("leaderboard", JSON.stringify(filtered));
};

  const nextQuestion = () => {
    setSelected("");
    setShowAnswer(false);

    if (questionIndex + 1 < quizList.length) {
      setQuestionIndex((prev) => prev + 1);
    } else {
      saveScore(score);
      setQuizFinished(true);
    }
  };

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="card shadow p-4" style={{ width: "600px" }}>

        <h4 className="fw-bold mb-3 text-center">
          {category} Quiz
        </h4>

        {quizFinished ? (
          <div className="text-center">
            <h3 className="fw-bold">Quiz Completed 🎉</h3>
            <p className="mt-3">
              Your Score: <b>{score} / {quizList.length}</b>
            </p>

            <button
              className="btn btn-primary mt-3"
              onClick={() => navigate(`/leaderboard/${category}`)}
            >
              View Leaderboard
            </button>
          </div>
        ) : (
          <div>

            <h6 className="text-muted mb-3">
              Question {questionIndex + 1} / {quizList.length}
            </h6>

            <h5 className="fw-bold">{question.question}</h5>

            {/* OPTIONS */}
            <div className="mt-3">
              {["a", "b", "c", "d"].map((key) => (
                <div key={key} className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="option"
                    value={key}
                    checked={selected === key}
                    disabled={showAnswer }
                    onChange={() => setSelected(key)}
                  />

                  <label className="form-check-label">
                    {question.options[key]}
                  </label>

                  {/* SIMPLE TEXT FEEDBACK */}
                  {showAnswer && key === selected && selected !== question.correctOption && (
                    <div className="text-danger small">Wrong answer</div>
                  )}

                  {showAnswer && key === question.correctOption && (
                    <div className="text-success small">Correct answer</div>
                  )}
                </div>
              ))}
            </div>

            {/* BUTTONS */}
            {!showAnswer ? (
              <button
                className="btn btn-primary mt-4"
                disabled={!selected}
                onClick={submitAnswer}
              >
                Submit
              </button>
            ) : (
              <button className="btn btn-success mt-3" onClick={nextQuestion}>
                Next
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}