// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function AddQuiz() {
//   const navigate = useNavigate();

//   const oldQuizes = JSON.parse(localStorage.getItem("allQuizes")) || {};
//   const [formdata, setFormData] = useState(oldQuizes);

//   const [category, setCategory] = useState("");
//   const [question, setQuestion] = useState("");
//   const [options, setOptions] = useState({ a: "", b: "", c: "", d: "" });
//   const [correct, setCorrect] = useState("");

//   const submitHandler = (e) => {
//     e.preventDefault();
//     if (!category || !question || !correct) return;

//     const oldArr = formdata[category] || [];

//     setFormData({
//       ...formdata,
//       [category]: [
//         ...oldArr,
//         {
//           question,
//           options: Object.values(options),
//           correct,
//         },
//       ],
//     });

//     setQuestion("");
//     setOptions({ a: "", b: "", c: "", d: "" });
//     setCorrect("");
//   };

//   useEffect(() => {
//     localStorage.setItem("allQuizes", JSON.stringify(formdata));
//   }, [formdata]);

//   return (
//     <div className="container mt-5">
//       <form
//         onSubmit={submitHandler}
//         className="w-75 m-auto p-4 bg-secondary text-white rounded shadow"
//       >
//         <h4 className="mb-3 text-center">Add Quiz</h4>

//         {/* Category */}
//         <select
//           className="form-control mb-3"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//         >
//           <option value="">-- Select Category --</option>
//           <option value="HTML">HTML</option>
//           <option value="CSS">CSS</option>
//           <option value="JS">JS</option>
//         </select>

//         <input
//           className="form-control mb-2"
//           placeholder="Question"
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//         />

//         <input
//           className="form-control mb-2"
//           placeholder="Option A"
//           value={options.a}
//           onChange={(e) => setOptions({ ...options, a: e.target.value })}
//         />
//         <input
//           className="form-control mb-2"
//           placeholder="Option B"
//           value={options.b}
//           onChange={(e) => setOptions({ ...options, b: e.target.value })}
//         />
//         <input
//           className="form-control mb-2"
//           placeholder="Option C"
//           value={options.c}
//           onChange={(e) => setOptions({ ...options, c: e.target.value })}
//         />
//         <input
//           className="form-control mb-3"
//           placeholder="Option D"
//           value={options.d}
//           onChange={(e) => setOptions({ ...options, d: e.target.value })}
//         />

//         {/* Correct Option */}
//         <select
//           className="form-control mb-3"
//           value={correct}
//           onChange={(e) => setCorrect(e.target.value)}
//         >
//           <option value="">-- Select Correct Option --</option>
//           <option value="A">Option A</option>
//           <option value="B">Option B</option>
//           <option value="C">Option C</option>
//           <option value="D">Option D</option>
//         </select>

//         <div className="d-flex gap-2">
//           <button className="btn btn-primary flex-grow-1">
//             Add Question
//           </button>

//           <button
//             type="button"
//             className="btn btn-info flex-grow-1"
//             onClick={() => navigate("/dashboard/showquiz")}
//           >
//             View All Quiz
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
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

  // 🔥 LOAD FROM FIREBASE (object format)
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

  // 🔥 SAVE TO FIREBASE (same object format)
  useEffect(() => {
    if (Object.keys(formdata).length === 0) return;

    const saveQuizes = async () => {
      const ref = doc(db, "appdata", "allQuizes");
      await setDoc(
        ref,
        { data: formdata },
        { merge: true }   // ✅ THIS IS THE KEY
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

  // ✅ normalize category
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


// Q2. Which tag is used to create a hyperlink in HTML?

// Options:

// A) <link>

// B) <a> ✅

// C) <href>

// D) <url>
// Correct: b

// Q3. Which HTML tag is used to display an image?

// Options:

// A) <picture>

// B) <image>

// C) <img> ✅

// D) <src>
// Correct: c

// 🎨 CSS (3 Questions)
// Q1. Which CSS property is used to change text color?

// Options:

// A) font-color

// B) text-color

// C) color ✅

// D) fg-color
// Correct: c

// Q2. Which unit is relative to the root element font size?

// Options:

// A) px

// B) em

// C) rem ✅

// D) %
// Correct: c

// Q3. How do you make text bold in CSS?

// Options:

// A) font-style: bold

// B) text-weight: bold

// C) font-weight: bold ✅

// D) style: bold
// Correct: c

// 🟨 JavaScript (3 Questions)
// Q1. Which keyword is used to declare a variable?

// Options:

// A) var ✅

// B) int

// C) string

// D) float
// Correct: a

// Q2. Which method converts JSON to a JavaScript object?

// Options:

// A) JSON.convert()

// B) JSON.parse() ✅

// C) JSON.stringify()

// D) JSON.toObject()
// Correct: b

// Q3. What is the output of typeof []?

// Options:

// A) array

// B) list

// C) object ✅

// D) undefined
// Correct: c

// ⚛️ React (3 Questions)
// Q1. What is used to manage state in a functional component?

// Options:

// A) useClass

// B) setState

// C) useState ✅

// D) state()
// Correct: c

// Q2. What is JSX?

// Options:

// A) JavaScript XML ✅

// B) Java Syntax Extension

// C) JSON XML

// D) JavaScript XHTML
// Correct: a

// Q3. Which hook is used for side effects?

// Options:

// A) useState

// B) useEffect ✅

// C) useRef

// D) useMemo
// Correct: b