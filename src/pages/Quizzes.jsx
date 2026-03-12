import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";

export default function Quizzes() {
  const navigate = useNavigate();

  const [allQuizes, setAllQuizes] = useState({});
  const [categories, setCategories] = useState([]);
  const [categoryIndex, setCategoryIndex] = useState(0);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);

  // LOAD QUIZ
  useEffect(() => {
    const fetchQuizzes = async () => {
      const ref = doc(db, "appdata", "allQuizes");
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data().data || {};
        const cats = Object.keys(data);

        setAllQuizes(data);
        setCategories(cats);
      }
    };

    fetchQuizzes();
  }, []);

  if (categories.length === 0) {
    return <h3 className="text-center mt-5">No Quiz Available</h3>;
  }

  const currentCategory = categories[categoryIndex];
  const quizList = allQuizes[currentCategory];
  const question = quizList[questionIndex];

  const submitAnswer = () => {
    setShowAnswer(true);

    if (selected === question.correctOption) {
      setScore((prev) => prev + 1);
    }
  };

  
  const saveScore = (cat, finalScore) => {
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

    leaderboard.push({
      category: cat,
      score: finalScore,
      date: new Date().toLocaleString(),
    });

    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  };

  const nextQuestion = () => {
    setSelected("");
    setShowAnswer(false);

    if (questionIndex + 1 < quizList.length) {
      setQuestionIndex((prev) => prev + 1);
    } else {
      saveScore(currentCategory, score);

      if (categoryIndex + 1 < categories.length) {
        setCategoryIndex((prev) => prev + 1);
        setQuestionIndex(0);
        setScore(0);
      } else {
        navigate("/leaderboard");
      }
    }
  };

  const changeCategory = (e) => {
    const idx = categories.indexOf(e.target.value);
    setCategoryIndex(idx);
    setQuestionIndex(0);
    setScore(0);
    setSelected("");
    setShowAnswer(false);
  };

  return (
    <div className="container d-flex justify-content-center mt-5">
  <div className="card shadow-lg p-4" style={{width:"600px"}}>
      <div className="mb-4 d-flex gap-2">
        <label className="fw-bold">Select Category:</label>
        <select
          className="form-select w-auto bg-secondary text-light"
          value={currentCategory}
          onChange={changeCategory}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="card shadow p-4 bg-light">
        <h6 className="text-muted mb-3">
Question {questionIndex + 1} / {quizList.length}
</h6>
        <h5 className="fw-bold">{question.question}</h5>

        <div className="mt-3">
          {Object.keys(question.options).map((key) => (
            <div key={key} className="form-check mb-2">
              <input
                className="form-check-input"
                type="radio"
                name="option"
                value={key}
                checked={selected === key}
                disabled={showAnswer}
                onChange={() => setSelected(key)}
              />

              <label className="form-check-label">
                {question.options[key]}
              </label>
            </div>
          ))}
        </div>

        {!showAnswer ? (
          <button
            className="btn btn-primary mt-4"
            disabled={!selected}
            onClick={submitAnswer}
          >
            Submit
          </button>
        ) : (
          <div className="mt-3">
            <p className="fw-bold text-success">
              Correct Answer: {question.options[question.correctOption]}
            </p>

            <button className="btn btn-success" onClick={nextQuestion}>
              Next
            </button>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}
