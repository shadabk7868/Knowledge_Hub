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

 
  useEffect(() => {
    if (Object.keys(formdata).length === 0) return;

    const saveQuizes = async () => {
      const ref = doc(db, "appdata", "allQuizes");
      await setDoc(
        ref,
        { data: formdata },
        { merge: true } 
      );
    };

    saveQuizes();
  }, [formdata]);

const submitHandler = (e) => {
  e.preventDefault();

  if (!category || !question) {
    alert("Category and Question required");
    return;
  }


  const normalizedCategory = category.trim().toUpperCase();

  const oldArr = formdata[normalizedCategory] || [];

  setFormData({
    ...formdata,
    [normalizedCategory]: [
      ...oldArr,
      {
        question,
        options: { ...options },
        correctOption,
      },
    ],
  });

  setCategory("");
  setQuestion("");
  setOptions({ a: "", b: "", c: "", d: "" });
  setCorrectOption("");
};

  return (
    <div className="container mt-5 d-flex justify-content-center">
  <div className="card shadow p-4" style={{width:"700px"}}>
      <form
        onSubmit={submitHandler}
        className="w-75 m-auto p-4 bg-secondary text-white rounded shadow"
      >
        <h4 className="mb-3 text-center">Add Quiz</h4>

        <input
          className="form-control mb-2"
          placeholder="Category (e.g., HTML, CSS, JS, React)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Option A"
          value={options.a}
          onChange={(e) => setOptions({ ...options, a: e.target.value })}
        />
        <input
          className="form-control mb-2"
          placeholder="Option B"
          value={options.b}
          onChange={(e) => setOptions({ ...options, b: e.target.value })}
        />
        <input
          className="form-control mb-2"
          placeholder="Option C"
          value={options.c}
          onChange={(e) => setOptions({ ...options, c: e.target.value })}
        />
        <input
          className="form-control mb-2"
          placeholder="Option D"
          value={options.d}
          onChange={(e) => setOptions({ ...options, d: e.target.value })}
        />

        <select
          className="form-control mb-3"
          value={correctOption}
          onChange={(e) => setCorrectOption(e.target.value)}
        >
          <option value="" disabled>
            Select Correct Option
          </option>
          <option value="a">Option A</option>
          <option value="b">Option B</option>
          <option value="c">Option C</option>
          <option value="d">Option D</option>
        </select>

        <div className="d-flex gap-2 justify-content-between">
          <button className="btn btn-primary flex-grow-1">
            Add Question
          </button>
          <button
            type="button"
            className="btn btn-warning flex-grow-1"
            onClick={() => navigate("/dashboard/showquiz")}
          >
            View All Quiz
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}
