// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function AdminPanel() {
//   const [questions, setQuestions] = useState([]);
//   const [form, setForm] = useState({ questionText: '', options: ['', '', '', ''], correctAnswer: '' });
//   const [editId, setEditId] = useState(null);

//   const fetchQuestions = () => {
//     axios.get('http://localhost:5000/api/admin/questions').then(res => setQuestions(res.data));
//   };

//   useEffect(() => { fetchQuestions(); }, []);

//   const handleChange = (e, idx = null) => {
//     if (idx !== null) {
//       const updated = [...form.options];
//       updated[idx] = e.target.value;
//       setForm({ ...form, options: updated });
//     } else {
//       setForm({ ...form, [e.target.name]: e.target.value });
//     }
//   };

//   const addOrUpdateQuestion = () => {
//     if (editId) {
//       axios.put(`http://localhost:5000/api/admin/question/${editId}`, form).then(() => {
//         setForm({ questionText: '', options: ['', '', '', ''], correctAnswer: '' });
//         setEditId(null);
//         fetchQuestions();
//       });
//     } else {
//       axios.post('http://localhost:5000/api/admin/add-question', form).then(() => {
//         setForm({ questionText: '', options: ['', '', '', ''], correctAnswer: '' });
//         fetchQuestions();
//       });
//     }
//   };

//   const editQuestion = (q) => {
//     setForm({ questionText: q.questionText, options: q.options, correctAnswer: q.correctAnswer });
//     setEditId(q._id);
//   };

//   const deleteQuestion = (id) => {
//     axios.delete(`http://localhost:5000/api/admin/question/${id}`).then(fetchQuestions);
//   };

//   return (
//     <div>
//       <h2>Admin Panel</h2>
//       <div>
//         <input name="questionText" placeholder="Question" value={form.questionText} onChange={handleChange} /><br/>
//         {form.options.map((opt, i) => (
//           <input key={i} placeholder={`Option ${i + 1}`} value={opt} onChange={e => handleChange(e, i)} />
//         ))}
//         <input name="correctAnswer" placeholder="Correct Answer" value={form.correctAnswer} onChange={handleChange} /><br/>
//         <button onClick={addOrUpdateQuestion}>{editId ? 'Update Question' : 'Add Question'}</button>
//       </div>
//       <h3>All Questions</h3>
//       {questions.map(q => (
//         <div key={q._id} style={{ border: '1px solid gray', margin: '5px', padding: '5px' }}>
//           <strong>{q.questionText}</strong><br/>
//           {q.options.map((opt, i) => <div key={i}>{opt}</div>)}
//           <em>Answer: {q.correctAnswer}</em><br/>
//           <button onClick={() => editQuestion(q)}>Edit</button>
//           <button onClick={() => deleteQuestion(q._id)}>Delete</button>
//         </div>
//       ))}
//     </div>
//   );
// }

///...........................................................................................................................

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../style/AdminPanel.css';
// import AllQuestions from './AllQuestions';
// import { Link, Route, Router, Routes } from 'react-router-dom';

// export default function AdminPanel() {
//   const [questions, setQuestions] = useState([]);
//   const [form, setForm] = useState({ questionText: '', options: ['', '', '', ''], correctAnswer: '' });
//   const [editId, setEditId] = useState(null);

//   const fetchQuestions = () => {
//     axios.get('http://localhost:5000/api/admin/questions').then(res => setQuestions(res.data));
//   };

//   useEffect(() => { fetchQuestions(); }, []);

//   const handleChange = (e, idx = null) => {
//     if (idx !== null) {
//       const updated = [...form.options];
//       updated[idx] = e.target.value;
//       setForm({ ...form, options: updated });
//     } else {
//       setForm({ ...form, [e.target.name]: e.target.value });
//     }
//   };

//   const addOrUpdateQuestion = () => {
//     if (editId) {
//       axios.put(`http://localhost:5000/api/admin/question/${editId}`, form).then(() => {
//         setForm({ questionText: '', options: ['', '', '', ''], correctAnswer: '' });
//         setEditId(null);
//         fetchQuestions();
//       });
//     } else {
//       axios.post('http://localhost:5000/api/admin/add-question', form).then(() => {
//         setForm({ questionText: '', options: ['', '', '', ''], correctAnswer: '' });
//         fetchQuestions();
//       });
//     }
//   };

//   const editQuestion = (q) => {
//     setForm({ questionText: q.questionText, options: q.options, correctAnswer: q.correctAnswer });
//     setEditId(q._id);
//   };

//   const deleteQuestion = (id) => {
//     axios.delete(`http://localhost:5000/api/admin/question/${id}`).then(fetchQuestions);
//   };

//   return (

//     <div className="admin-container">

//       <h2 className="admin-title">Admin Panel</h2>
//       <div className="admin-form">
//         <input
//           name="questionText"
//           className="admin-input"
//           placeholder="Question"
//           value={form.questionText}
//           onChange={handleChange}
//         />
//         {form.options.map((opt, i) => (
//           <input
//             key={i}
//             className="admin-input"
//             placeholder={`Option ${i + 1}`}
//             value={opt}
//             onChange={e => handleChange(e, i)}
//           />
//         ))}
//         <input
//           name="correctAnswer"
//           className="admin-input"
//           placeholder="Correct Answer"
//           value={form.correctAnswer}
//           onChange={handleChange}
//         />
//         <button className="admin-button" onClick={addOrUpdateQuestion}>
//           {editId ? 'Update Question' : 'Add Question'}
//         </button>
//       </div>

//       <h3 className="admin-subtitle">AllQuestions</h3>
//       {/* <Link to={'/allquestions'}>All Question</Link> */}
//       <div className="question-list">
//         {questions.map(q => (
//           <div key={q._id} className="question-box">
//             <strong>{q.questionText}</strong>
//             <div className="options-list">
//               {q.options.map((opt, i) => <div key={i} className="option-item">{opt}</div>)}
//             </div>
//             <em>Answer: {q.correctAnswer}</em>
//             <div className="admin-actions">
//               <button onClick={() => editQuestion(q)}>Edit</button>
//               <button onClick={() => deleteQuestion(q._id)}>Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>

//     </div>

//   );
// }

//.................................................................................................................................

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../style/AdminPanel.css';
// import { useNavigate } from 'react-router-dom';

// export default function AdminPanel() {
//   const [questions, setQuestions] = useState([]);
//   const [form, setForm] = useState({ questionText: '', options: ['', '', '', ''], correctAnswer: '' });
//   const [editId, setEditId] = useState(null);
//   const navigate = useNavigate();

//   const fetchQuestions = () => {
//     axios.get('http://localhost:5000/api/admin/questions').then(res => setQuestions(res.data));
//   };

//   useEffect(() => { fetchQuestions(); }, []);

//   const handleChange = (e, idx = null) => {
//     if (idx !== null) {
//       const updated = [...form.options];
//       updated[idx] = e.target.value;
//       setForm({ ...form, options: updated });
//     } else {
//       setForm({ ...form, [e.target.name]: e.target.value });
//     }
//   };

//   const addOrUpdateQuestion = () => {
//     if (editId) {
//       axios.put(`http://localhost:5000/api/admin/question/${editId}`, form).then(() => {
//         setForm({ questionText: '', options: ['', '', '', ''], correctAnswer: '' });
//         setEditId(null);
//         fetchQuestions();
//       });
//     } else {
//       axios.post('http://localhost:5000/api/admin/add-question', form).then(() => {
//         setForm({ questionText: '', options: ['', '', '', ''], correctAnswer: '' });
//         fetchQuestions();
//       });
//     }
//   };

//   const editQuestion = (q) => {
//     setForm({ questionText: q.questionText, options: q.options, correctAnswer: q.correctAnswer });
//     setEditId(q._id);
//   };

//   const deleteQuestion = (id) => {
//     axios.delete(`http://localhost:5000/api/admin/question/${id}`).then(fetchQuestions);
//   };

//   return (
//     <div className="admin-container">
//       <h2 className="admin-title">Admin Panel</h2>

//       <div className="admin-form">
//         <input
//           name="questionText"
//           className="admin-input"
//           placeholder="Question"
//           value={form.questionText}
//           onChange={handleChange}
//         />
//         {form.options.map((opt, i) => (
//           <input
//             key={i}
//             className="admin-input"
//             placeholder={`Option ${i + 1}`}
//             value={opt}
//             onChange={e => handleChange(e, i)}
//           />
//         ))}
//         <input
//           name="correctAnswer"
//           className="admin-input"
//           placeholder="Correct Answer"
//           value={form.correctAnswer}
//           onChange={handleChange}
//         />
//         <button className="admin-button" onClick={addOrUpdateQuestion}>
//           {editId ? 'Update Question' : 'Add Question'}
//         </button>
//       </div>

//       <h3 className="admin-subtitle">All Questions</h3>
//       <div className="question-list">
//         {questions.map(q => (
//           <div key={q._id} className="question-box">
//             <strong>{q.questionText}</strong>
//             <div className="options-list">
//               {q.options.map((opt, i) => <div key={i} className="option-item">{opt}</div>)}
//             </div>
//             <em>Answer: {q.correctAnswer}</em>
//             <div className="admin-actions">
//               <button onClick={() => editQuestion(q)}>Edit</button>
//               <button onClick={() => deleteQuestion(q._id)}>Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <hr />

//       {/* New section for student results */}
//       <div className="admin-results-section">
//         <h3 className="admin-subtitle">Student Submissions</h3>
//         <button className="admin-button" onClick={() => navigate('/admin/results')}>
//           View Student Results
//         </button>
//       </div>
//     </div>
//   );
// }





///..........................................................................................................
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import "./style/AdminQuestionManager.css";

// export default function AdminQuestionManager() {
//   const [form, setForm] = useState({
//     questionText: "",
//     options: ["", "", "", ""],
//     correctAnswer: "",
//   });
//   const [editId, setEditId] = useState(null);

//   const handleChange = (e, idx = null) => {
//     if (idx !== null) {
//       const updated = [...form.options];
//       updated[idx] = e.target.value;
//       setForm({ ...form, options: updated });
//     } else {
//       setForm({ ...form, [e.target.name]: e.target.value });
//     }
//   };

//   const addOrUpdateQuestion = () => {
//     if (editId) {
//       axios
//         .put(`http://localhost:5000/api/admin/question/${editId}`, form)
//         .then(() => {
//           setForm({
//             questionText: "",
//             options: ["", "", "", ""],
//             correctAnswer: "",
//           });
//           setEditId(null);
//         });
//     } else {
//       axios
//         .post("http://localhost:5000/api/admin/add-question", form)
//         .then(() => {
//           setForm({
//             questionText: "",
//             options: ["", "", "", ""],
//             correctAnswer: "",
//           });
//         });
//     }
//   };

//   return (
//     <div className="admin-container">
//       <h2 className="admin-title">Admin Panel</h2>

//       <div className="admin-nav">
//         <Link to="/api/admin/questions">All Questions</Link>
//         <Link to="/admin/results">Student Results</Link>
//       </div>

//       <div className="admin-form">
//         <textarea
//           name="questionText"
//           className="admin-input admin-question-box"
//           placeholder="Enter question here ......"
//           value={form.questionText}
//           onChange={handleChange}
//           required
//         />
//         {form.options.map((opt, i) => (
//           <input
//             key={i}
//             className="admin-input"
//             placeholder={`Option ${i + 1}`}
//             value={opt}
//             onChange={(e) => handleChange(e, i)}
//             required
//           />
//         ))}
//         <input
//           name="correctAnswer"
//           className="admin-input"
//           placeholder="Correct Answer"
//           value={form.correctAnswer}
//           onChange={handleChange}
//           required
//         />
//         <button className="admin-button" onClick={addOrUpdateQuestion}>
//           {editId ? "Update Question" : "Add Question"}
//         </button>
//       </div>
//     </div>
//   );
// }





// AdminQuestionManager.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import "./style/AdminQuestionManager.css";

export default function AdminQuestionManager() {
  const [form, setForm] = useState({
    questionText: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  });
  const [editId, setEditId] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.question) {
      const { _id, questionText, options, correctAnswer } =
        location.state.question;
      setForm({ questionText, options, correctAnswer });
      setEditId(_id);
    }
  }, [location.state]);

  const handleChange = (e, idx = null) => {
    if (idx !== null) {
      const updated = [...form.options];
      updated[idx] = e.target.value;
      setForm({ ...form, options: updated });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const addOrUpdateQuestion = () => {
    if (editId) {
      axios
        .put(`http://localhost:5000/api/admin/question/${editId}`, form)
        .then(() => {
          alert("Question updated successfully");
          resetForm();
        });
    } else {
      axios
        .post("http://localhost:5000/api/admin/add-question", form)
        .then(() => {
          alert("Question added successfully");
          resetForm();
        });
    }
  };

  const resetForm = () => {
    setForm({
      questionText: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    });
    setEditId(null);
  };

  return (
    <div className="admin-container"> 
      <h2 className="admin-title">Create Questions</h2>

      {/* <div className="admin-nav">
        <Link to="/api/admin/questions">All Questions</Link>
        <Link to="/api/admin/results">Student Results</Link>
      </div> */}

      <div className="admin-form">
        <textarea
          name="questionText"
          className="admin-input admin-question-box"
          placeholder="Enter question here ......"
          value={form.questionText}
          onChange={handleChange}
          required
        />
        {form.options.map((opt, i) => (
          <input
            key={i}
            className="admin-input"
            placeholder={`Option ${i + 1}`}
            value={opt}
            onChange={(e) => handleChange(e, i)}
            required
          />
        ))}
        <input
          name="correctAnswer"
          className="admin-input"
          placeholder="Correct Answer"
          value={form.correctAnswer}
          onChange={handleChange}
          required
        />
        <button className="admin-button" onClick={addOrUpdateQuestion}>
          {editId ? "Update Question" : "Add Question"}
        </button>
      </div>
    </div>
  );
}
