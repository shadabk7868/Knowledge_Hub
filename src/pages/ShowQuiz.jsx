import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../Firebase";

export default function ShowQuiz() {
  const [quizes, setQuizes] = useState({});
  const [editData, setEditData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // LOAD QUIZES
  useEffect(() => {
    const fetchQuizes = async () => {
      const ref = doc(db, "appdata", "allQuizes");
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setQuizes(snap.data().data || {});
      }
    };

    fetchQuizes();
  }, []);

  // DELETE QUIZ
  const deleteQuiz = async (category, index) => {
    const updated = { ...quizes };

    updated[category].splice(index, 1);

    if (updated[category].length === 0) {
      delete updated[category];
      setSelectedCategory(null);
    }

    const ref = doc(db, "appdata", "allQuizes");
    await setDoc(ref, { data: updated });

    setQuizes(updated);
  };

  // UPDATE QUIZ
  const updateQuiz = async () => {
    const { category, index, question, options, correctOption } = editData;

    const updated = { ...quizes };

    updated[category][index] = {
      question,
      options,
      correctOption,
    };

    const ref = doc(db, "appdata", "allQuizes");
    await setDoc(ref, { data: updated });

    setQuizes(updated);
    setEditData(null);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "950px" }}>
      <h3 className="text-center mb-5 text-primary fw-bold">
        📚 All Quizzes
      </h3>

      {/* ✅ CATEGORY VIEW */}
      {!selectedCategory && (
        <div className="row justify-content-center">
          {Object.keys(quizes).length === 0 && (
            <p className="text-center text-muted">No Quiz Available</p>
          )}

          {Object.keys(quizes).map((category) => (
            <div key={category} className="col-md-3 mb-3">
              <div
                className="card shadow text-center p-4"
                style={{
                  cursor: "pointer",
                  borderRadius: "12px",
                  transition: "0.3s",
                }}
                onClick={() => setSelectedCategory(category)}
              >
                <h5 className="fw-bold">{category}</h5>
                <p className="text-muted">
                  {quizes[category].length} Questions
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedCategory && (
        <>
          <button
            className="btn btn-secondary mb-3"
            onClick={() => setSelectedCategory(null)}
          >
            ← Back to Categories
          </button>

          {quizes[selectedCategory].map((q, i) => {
            const optionsObj = q.options || {};
            const correctText = optionsObj[q.correctOption];

            const isEdit =
              editData &&
              editData.category === selectedCategory &&
              editData.index === i;

            return (
              <div
                key={i}
                className="card shadow-sm mb-3 border-0 p-3"
                style={{ borderRadius: "12px" }}
              >
                {isEdit ? (
                  <>
                    {/* EDIT MODE */}
                    <textarea
                      className="form-control mb-3"
                      value={editData.question}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          question: e.target.value,
                        })
                      }
                    />

                    <div className="row">
                      {["a", "b", "c", "d"].map((key) => (
                        <div key={key} className="col-md-6 mb-2">
                          <input
                            className="form-control"
                            value={editData.options[key]}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                options: {
                                  ...editData.options,
                                  [key]: e.target.value,
                                },
                              })
                            }
                          />
                        </div>
                      ))}
                    </div>

                    <select
                      className="form-select mb-3"
                      value={editData.correctOption}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          correctOption: e.target.value,
                        })
                      }
                    >
                      <option value="a">Option A</option>
                      <option value="b">Option B</option>
                      <option value="c">Option C</option>
                      <option value="d">Option D</option>
                    </select>

                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-success w-100"
                        onClick={updateQuiz}
                      >
                        Update
                      </button>

                      <button
                        className="btn btn-outline-secondary w-100"
                        onClick={() => setEditData(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* VIEW MODE */}
                    <h6 className="fw-bold mb-2">
                      {i + 1}. {q.question}
                    </h6>

                    {["a", "b", "c", "d"].map((key) => (
                      <div key={key} className="mb-1">
                        <b>{key.toUpperCase()}:</b> {optionsObj[key]}
                      </div>
                    ))}

                    <div className="alert alert-success mt-2 py-2">
                      Correct:{" "}
                      <b>{q.correctOption.toUpperCase()}</b> — {correctText}
                    </div>

                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-warning w-100"
                        onClick={() =>
                          setEditData({
                            category: selectedCategory,
                            index: i,
                            question: q.question,
                            options: q.options,
                            correctOption: q.correctOption,
                          })
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger w-100"
                        onClick={() =>
                          deleteQuiz(selectedCategory, i)
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}