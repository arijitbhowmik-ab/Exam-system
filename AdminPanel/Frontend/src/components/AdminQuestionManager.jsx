

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import "../style/AdminQuestionManager.css";
import { BACKEND_URL } from '../utils/utils'

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
        .put(`${BACKEND_URL}/api/admin/question/${editId}`, form)
        .then(() => {
          alert("Question updated successfully");
          resetForm();
        });
    } else {
      axios
        .post(`${BACKEND_URL}/api/admin/add-question`, form)
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
