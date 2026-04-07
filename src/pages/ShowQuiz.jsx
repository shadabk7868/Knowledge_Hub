import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../Firebase";

export default function ShowQuiz() {
  const [quizes, setQuizes] = useState({});
  const [editData, setEditData] = useState(null);

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

    // remove if empty
    if (updated[category].length === 0) {
      delete updated[category];
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
    <h3 className="text-center mb-5 text-primary fw-bold">📚 All Quizzes</h3>

    {Object.keys(quizes).filter((category) => quizes[category]?.length > 0).map((category) => (
      <div key={category} className="mb-5">

        {/* CATEGORY HEADER */}
        <div className="text-dark p-2 px-3 rounded mb-3">
          <h5 className="m-0">{category}</h5>
        </div>

        {quizes[category].map((q, i) => {
          const optionsObj = q.options || {};
          const correctText = optionsObj[q.correctOption];

          const isEdit =
            editData &&
            editData.category === category &&
            editData.index === i;

          return (
            <div key={i} className="card shadow-sm mb-3 border-0" style={{ borderRadius: "12px" }}>
              <div className="card-body">

                {isEdit ? (
                  <>
                    {/* QUESTION */}
                    <textarea
                      className="form-control mb-3"
                      rows="2"
                      value={editData.question}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          question: e.target.value,
                        })
                      }
                    />

                    {/* OPTIONS GRID */}
                    <div className="row">
                      {["a", "b", "c", "d"].map((key) => (
                        <div className="col-md-6 mb-2" key={key}>
                          <input
                            className="form-control"
                            placeholder={`Option ${key.toUpperCase()}`}
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

                    {/* CORRECT OPTION */}
                    <select
                      className="form-select mb-3 mt-2"
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

                    {/* BUTTONS */}
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
                    {/* QUESTION */}
                    <h6 className="fw-bold mb-3">
                      {i + 1}. {q.question}
                    </h6>

                    {/* OPTIONS */}
                    <div className="row mb-2">
                      {["a", "b", "c", "d"].map((key) => (
  <div className="col-md-6 mb-1" key={key}>
    <span className="badge bg-light text-dark border me-2">
      {key.toUpperCase()}
    </span>
    {optionsObj[key]}
  </div>
))}
                    </div>

                    {/* CORRECT ANSWER */}
                    <div className="alert alert-success py-2">
                       Correct: <b>{q.correctOption?.toUpperCase()}</b> — {correctText}
                    </div>

                    {/* ACTIONS */}
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-warning w-100"
                        onClick={() =>
                          setEditData({
                            category,
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
                        onClick={() => deleteQuiz(category, i)}
                      >
                         Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    ))}
  </div>
);
}