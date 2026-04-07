import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../Firebase";

export default function AddQuiz() {
  const navigate = useNavigate();

  const [category, setCategory] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState({ a: "", b: "", c: "", d: "" });
  const [correctOption, setCorrectOption] = useState("");

  const [formdata, setFormData] = useState({});

  useEffect(() => {
    const fetchQuizes = async () => {
      const ref = doc(db, "appdata", "allQuizes");
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setFormData(snap.data().data || {});
      }
    };

    fetchQuizes();
  }, []);


const submitHandler = async (e) => {
  e.preventDefault();

  if (!category || !question) {
    alert("Category and Question required");
    return;
  }

  const normalizedCategory = category.trim().toUpperCase();

  const oldArr = formdata[normalizedCategory] || [];

  // 👉 updated data create
  const updatedData = {
    ...formdata,
    [normalizedCategory]: [
      ...oldArr,
      {
        question,
        options: { ...options },
        correctOption,
      },
    ],
  };

  try {
    const ref = doc(db, "appdata", "allQuizes");
    await setDoc(ref, { data: updatedData });

   
    setFormData(updatedData);

    alert("Question added successfully ");

  } catch (error) {
    console.error(error);
    alert("Error saving quiz ");
  }

  setCategory("");
  setQuestion("");
  setOptions({ a: "", b: "", c: "", d: "" });
  setCorrectOption("");
};

  return (
  <div className="container mt-5 d-flex justify-content-center">
    <div className="card shadow-lg p-4" style={{ width: "650px", borderRadius: "15px" }}>
      
      <h3 className="text-center mb-4 text-primary">Add Quiz Question</h3>

      <form onSubmit={submitHandler}>

        {/* Category */}
        <div className="mb-3">
          <label className="form-label fw-bold">Category</label>
          <input
            className="form-control"
            placeholder="HTML, CSS, JS, React"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        {/* Question */}
        <div className="mb-3">
          <label className="form-label fw-bold">Question</label>
          <textarea
            className="form-control"
            rows="2"
            placeholder="Enter your question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        {/* Options */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Option A</label>
            <input
              className="form-control"
              value={options.a}
              onChange={(e) => setOptions({ ...options, a: e.target.value })}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Option B</label>
            <input
              className="form-control"
              value={options.b}
              onChange={(e) => setOptions({ ...options, b: e.target.value })}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Option C</label>
            <input
              className="form-control"
              value={options.c}
              onChange={(e) => setOptions({ ...options, c: e.target.value })}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Option D</label>
            <input
              className="form-control"
              value={options.d}
              onChange={(e) => setOptions({ ...options, d: e.target.value })}
            />
          </div>
        </div>

        {/* Correct Option */}
        <div className="mb-4">
          <label className="form-label fw-bold">Correct Answer</label>
          <select
            className="form-select"
            value={correctOption}
            onChange={(e) => setCorrectOption(e.target.value)}
          >
            <option value="">Select Correct Option</option>
            <option value="a">Option A</option>
            <option value="b">Option B</option>
            <option value="c">Option C</option>
            <option value="d">Option D</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="d-flex gap-3">
          <button className="btn btn-primary w-100">
             Add Question
          </button>

          <button
            type="button"
            className="btn btn-outline-dark w-100"
            onClick={() => navigate("/dashboard/showquiz")}
          >
             View Quiz
          </button>
        </div>

      </form>
    </div>
  </div>
);
}
