import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

import {
  doc,
  getDoc,
  addDoc,
  collection,
  getDocs,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

import { db } from "../Firebase";

export default function Quizzes() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { category } = useParams();


  const [allQuizes, setAllQuizes] = useState({});
  const [loading, setLoading] = useState(true);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const [timeLeft, setTimeLeft] = useState(15);
  const timerRef = useRef(null);

  // FETCH QUIZZES
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const ref = doc(db, "appdata", "allQuizes");
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data().data || {};
          setAllQuizes(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
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

  useEffect(() => {

    if (quizFinished || showAnswer) return;

    timerRef.current = setInterval(() => {

      setTimeLeft((prev) => {

        if (prev <= 1) {

          clearInterval(timerRef.current);

          setShowAnswer(true);

          return 0;
        }

        return prev - 1;
      });

    }, 1000);

    return () => clearInterval(timerRef.current);

  }, [questionIndex, showAnswer, quizFinished]);

  useEffect(() => {

    if (showAnswer && timeLeft === 0) {

      const timeout = setTimeout(() => {
        nextQuestion();
      }, 2000);

      return () => clearTimeout(timeout);
    }

  }, [showAnswer, timeLeft]);

  const quizList = allQuizes[category] || [];
  const question = quizList[questionIndex];

  // LOADING
  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
        <p className="mt-2">Loading Quiz...</p>
      </div>
    );
  }

  // NO QUIZ
  if (!quizList.length) {
    return <h3 className="text-center mt-5">No Quiz Found 😢</h3>;
  }

  // SUBMIT ANSWER
  const submitAnswer = () => {
    setShowAnswer(true);

    let updatedScore = score;

    if (selected === question.correctOption) {
      updatedScore = score + 1;
      setScore(updatedScore);
    }
  };

  // SAVE / UPDATE SCORE
  const saveScore = async (finalScore) => {
    try {

      if (!currentUser || !currentUser.email) {
        alert("User not logged in");
        return;
      }

      const q = query(
        collection(db, "leaderboard"),
        where("category", "==", category)
      );

      const snapshot = await getDocs(q);

      let oldDocId = null;

      snapshot.forEach((item) => {
        const data = item.data();

        // same user ka purana score find
        if (
          data.email === currentUser.email &&
          data.category === category
        ) {
          oldDocId = item.id;
        }
      });

      // UPDATE OLD SCORE
      if (oldDocId) {
        await updateDoc(doc(db, "leaderboard", oldDocId), {
          email: currentUser.email,
          category,
          score: finalScore,
          createdAt: new Date(),
        });

        console.log("Score updated");
      }

      // ADD NEW SCORE
      else {
        await addDoc(collection(db, "leaderboard"), {
          email: currentUser.email,
          category,
          score: finalScore,
          createdAt: new Date(),
        });

        console.log("Score added");
      }
    } catch (error) {
      console.error(error);
      alert("Error saving score");
    }
  };

  // NEXT QUESTION
  const nextQuestion = async () => {
    setSelected("");
    setShowAnswer(false);
    setTimeLeft(15);

    if (questionIndex + 1 < quizList.length) {
      setQuestionIndex((prev) => prev + 1);
    } else {
      await saveScore(score);

      setQuizFinished(true);
    }
  };

  return (
    <div className="container d-flex justify-content-center mt-5 mb-5">
      <div
        className="card shadow-lg p-4 border-0"
        style={{
          width: "600px",
          borderRadius: "18px",
        }}
      >
        <h4 className="fw-bold mb-3 text-center">
          {category} Quiz
        </h4>

        {quizFinished ? (
          <div className="text-center">
            <h3 className="fw-bold">Quiz Completed 🎉</h3>

            <p className="mt-3 fs-5">
              Your Score:
              <b>
                {" "}
                {score} / {quizList.length}
              </b>
            </p>

            <button
              className="btn btn-primary mt-3 px-4"
              onClick={() => navigate(`/leaderboard/${category}`)}
            >
              View Leaderboard
            </button>
          </div>
        ) : (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">

              <h6 className="text-muted m-0">
                Question {questionIndex + 1} / {quizList.length}
              </h6>

              <div
                className={`fw-bold px-3 py-1 rounded ${timeLeft <= 5 ? "bg-danger text-white" : "bg-warning"
                  }`}
              >
                ⏳ {timeLeft}s
              </div>

            </div>

            <h5 className="fw-bold mb-4">
              {question.question}
            </h5>

            {/* OPTIONS */}
            <div className="mt-3">
              {["a", "b", "c", "d"].map((key) => (
                <div
                  key={key}
                  className="form-check mb-3 p-3 rounded option-box"
                  style={{
                    cursor: showAnswer ? "default" : "pointer",
                    backgroundColor:
                      showAnswer &&
                        key === question.correctOption
                        ? "#a9dec6"
                        : showAnswer &&
                          key === selected &&
                          selected !== question.correctOption
                          ? "#f7d3d6"
                          : "#f8f9fa",
                  }}
                  onClick={() => {
                    if (!showAnswer) {
                      setSelected(key);
                    }
                  }}
                >
                  <input
                    className="form-check-input"
                    type="radio"
                    name="option"
                    value={key}
                    checked={selected === key}
                    disabled={showAnswer}
                    onChange={() => setSelected(key)}
                  />

                  <label className="form-check-label ms-2">
                    {question.options[key]}
                  </label>

                  {/* WRONG */}
                  {showAnswer &&
                    key === selected &&
                    selected !== question.correctOption && (
                      <div className="text-danger small mt-1">
                        Wrong answer
                      </div>
                    )}

                  {/* CORRECT */}
                  {showAnswer &&
                    key === question.correctOption && (
                      <div className="text-success small mt-1">
                        Correct answer
                        {showAnswer && timeLeft === 0 && (
                          <div className="text-danger fw-bold mt-2">
                            ⏰ Time's Up!
                          </div>
                        )}
                      </div>
                    )}
                </div>
              ))}
            </div>

            {/* BUTTONS */}
            {!showAnswer ? (
              <button
                className="btn btn-primary mt-4 px-4"
                disabled={!selected}
                onClick={() => {
                  clearInterval(timerRef.current);
                  submitAnswer();
                }}
              >
                Submit
              </button>
            ) : (
              <button
                className="btn btn-success mt-4 px-4"
                onClick={nextQuestion}
              >
                {questionIndex + 1 === quizList.length
                  ? "Finish Quiz"
                  : "Next"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}