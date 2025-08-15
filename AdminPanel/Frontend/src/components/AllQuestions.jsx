import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/AllQuestions.css';
import { BACKEND_URL } from '../utils/utils'

export default function AllQuestions() {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  let qnum=1

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/admin/questions`)
      .then((res) => setQuestions(res.data));
  }, []);

  const deleteQuestion = (id) => {
    axios
      .delete(`${BACKEND_URL}/api/admin/question/${id}`)
      .then(() => setQuestions((prev) => prev.filter((q) => q._id !== id)));
  };

  const updateQuestion = (question) => {
    navigate('/admin/manage-question', { state: { question } });
  };

  return (
    <div className="question-list">
      <h3 className="admin-subtitle">All Questions</h3>
      {console.log('questions', questions, typeof (questions))}
      {questions.map((q) => (
        <div key={q._id} className="question-box">
          <strong>{qnum++}{'.  '}{q.questionText}</strong>
          <div className="options-list">
            {q.options.map((opt, i) => (
              <div key={i} className="option-item"> 
                {opt}
              </div>
            ))}
          </div>
          <em>Answer: {q.correctAnswer}</em>
          <div className="admin-actions">
            <button onClick={() => deleteQuestion(q._id)}>Delete</button>
            <button className='update-btn' onClick={() => updateQuestion(q)}>Update</button>
          </div>
        </div>
      ))}
    </div>
  );
}
