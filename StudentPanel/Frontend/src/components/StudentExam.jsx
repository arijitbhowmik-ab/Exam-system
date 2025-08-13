// ///....................................................................................................................

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../style/StudentExam.css';

// export default function StudentExam({ token, studentId, name, email }) {
//   const [questions, setQuestions] = useState([]);
//   const [answers, setAnswers] = useState({});
//   const [current, setCurrent] = useState(0);
//   const [submitted, setSubmitted] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes
//   const [tabSwitched, setTabSwitched] = useState(false);
//   const [tabTimer, setTabTimer] = useState(null);
//   const [scoreInfo, setScoreInfo] = useState(null);

//   // Fetch questions on load
//   useEffect(() => {
//     axios.get('http://localhost:5000/api/student/exam-questions')
//       .then(res => setQuestions(res.data))
//       .catch(err => console.error('Error fetching questions:', err));
//   }, []);

//   // Timer countdown
//   useEffect(() => {
//     if (submitted) return;

//     const timer = setInterval(() => {
//       setTimeLeft(prev => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           handleSubmit(); // Auto-submit when time ends
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [submitted]);

//   // Tab switch detection
//   // useEffect(() => {
//   //   if (submitted) return;

//   //   const handleBlur = () => {
//   //     if (!tabSwitched) {
//   //       setTabSwitched(true);
//   //       const timer = setTimeout(() => {
//   //         handleSubmit();
//   //         alert('Exam auto-submitted due to tab switch!');
//   //       }, 3000);
//   //       setTabTimer(timer);
//   //     }
//   //   };

//   //   const handleFocus = () => {
//   //     if (tabSwitched) {
//   //       clearTimeout(tabTimer);
//   //       setTabSwitched(false);
//   //       setTabTimer(null);
//   //       setSubmitted(true)
//   //     }
//   //   };

//   //   window.addEventListener('blur', handleBlur);
//   //   window.addEventListener('focus', handleFocus);

//   //   return () => {
//   //     window.removeEventListener('blur', handleBlur);
//   //     window.removeEventListener('focus', handleFocus);
//   //   };
//   // }, [tabSwitched, tabTimer, submitted]);

//   // Tab switch detection with 3s delay before submit

//   useEffect(() => {
//   if (submitted) return;

//   let timerId = null;

//   const startAutoSubmitTimer = () => {
//     if (!tabSwitched) {
//       setTabSwitched(true);
//       timerId = setTimeout(() => {
//         handleSubmit();
//         alert('Exam auto-submitted due to tab switch!');
//       }, 3000); // wait 3 seconds
//       setTabTimer(timerId);
//     }
//   };

//   const cancelAutoSubmitTimer = () => {
//     if (tabSwitched) {
//       clearTimeout(tabTimer || timerId);
//       setTabSwitched(false);
//       setTabTimer(null);
//     }
//   };

//   const handleVisibilityChange = () => {
//     if (document.visibilityState === 'hidden') {
//       startAutoSubmitTimer();
//     } else {
//       cancelAutoSubmitTimer();
//     }
//   };

//   const handleBlur = () => startAutoSubmitTimer();
//   const handleFocus = () => cancelAutoSubmitTimer();

//   window.addEventListener('blur', handleBlur);
//   window.addEventListener('focus', handleFocus);
//   document.addEventListener('visibilitychange', handleVisibilityChange);

//   return () => {
//     window.removeEventListener('blur', handleBlur);
//     window.removeEventListener('focus', handleFocus);
//     document.removeEventListener('visibilitychange', handleVisibilityChange);
//     clearTimeout(timerId);
//   };
// }, [tabSwitched, tabTimer, submitted]);



//   // Disable right-click, copy, and paste
//   useEffect(() => {
//     const preventAction = (e) => e.preventDefault();
//     document.addEventListener('contextmenu', preventAction);
//     document.addEventListener('copy', preventAction);
//     document.addEventListener('paste', preventAction);

//     return () => {
//       document.removeEventListener('contextmenu', preventAction);
//       document.removeEventListener('copy', preventAction);
//       document.removeEventListener('paste', preventAction);
//     };
//   }, []);

//   const handleChange = (qId, value) => {
//     setAnswers(prev => ({ ...prev, [qId]: value }));
//   };

//   const handleSubmit = async () => {
//     if (submitted || questions.length === 0) return;

//     let score = 0;
//     let total = questions.length;

//     questions.forEach(q => {
//       if (answers[q._id] === q.correctAnswer) {
//         score++;
//       }
//     });
//     try {
//       await axios.post('http://localhost:5000/api/student/submit', {
//         studentId,
//         responses: answers,
//         score,
//         total,
//         email,
//         name
//       });
//       alert(`Exam submitted!\nScore: ${score} / ${total}`);
//       setScoreInfo({ score, total });
//       setSubmitted(true);
//     } catch (err) {
//       console.error('Submission error:', err);
//       alert('Submission failed', err.message);
//     }
//   };

//   const formatTime = () => {
//     const mins = Math.floor(timeLeft / 60);
//     const secs = timeLeft % 60;
//     return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
//   };

//   if (submitted) {
//     return (
//       <div className="exam-container">
//         <h2>Thank you! Your exam has been submitted.</h2>
//         {scoreInfo && (
//           <h3>Your Score: {scoreInfo.score} / {scoreInfo.total}</h3>
//         )}
//       </div>
//     );
//   }

//   if (!questions.length) return <p>Loading questions...</p>;

//   const currentQuestion = questions[current];

//   return (
//     <div className="exam-container">
//       <div className="main-content">
//         <div className="timer">Time Left: {formatTime()}</div>
//         {currentQuestion && (
//           <div className="question-box">
//             <h2>Question {current + 1}</h2>
//             <p className="question-text">{currentQuestion.questionText}</p>
//             <div className="option-label-box"> 
//               {currentQuestion.options?.map((opt) => (
//                 <label
//                   key={opt}
//                   className={`option-label ${answers[currentQuestion._id] === opt ? "selected" : ""}`}
//                 >
//                   <input
//                     type="radio"
//                     name={currentQuestion._id}
//                     value={opt}
//                     checked={answers[currentQuestion._id] === opt}
//                     onChange={() => handleChange(currentQuestion._id, opt)}
//                   /> {opt}
//                 </label>
//               ))}
//             </div>
//           </div>
//         )}
//         <div className="nav-buttons">
//           {current > 0 && <button onClick={() => setCurrent(current - 1)}>Previous</button>}
//           {current < questions.length - 1 && <button onClick={() => setCurrent(current + 1)}>Next</button>}
//         </div>
//         <button className="submit-btn" onClick={handleSubmit}>Submit Exam</button>
//       </div>

//       <div className="question-index">
//         {/* <h3>Questions</h3> */}
//         {questions.map((q, i) => (
//           <button
//             key={q._id}
//             className={answers[q._id] ? 'green' : 'gray'}
//             onClick={() => setCurrent(i)}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../style/StudentExam.css';

// export default function StudentExam({ token, studentId, name, email }) {
//   const [questions, setQuestions] = useState([]);
//   const [answers, setAnswers] = useState({});
//   const [current, setCurrent] = useState(0);
//   const [submitted, setSubmitted] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(1 * 60); // 15 minutes
//   const [tabSwitched, setTabSwitched] = useState(false);
//   const [tabTimer, setTabTimer] = useState(null);
//   const [scoreInfo, setScoreInfo] = useState(null);

//   // Fetch questions on load
//   useEffect(() => {
//     axios.get('http://localhost:5000/api/student/exam-questions')
//       .then(res => setQuestions(res.data))
//       .catch(err => console.error('Error fetching questions:', err));
//   }, []);

//   // Timer countdown
//   useEffect(() => {
//     if (submitted) return;

//     const timer = setInterval(() => {
//       setTimeLeft(prev => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           handleSubmit(); // Auto-submit when time ends
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [submitted, answers]);

//   // Tab switch detection with 3-second delay
// useEffect(() => {
//   if (submitted) return;

//   const handleBlur = () => {
//     // Only start countdown if not already started
//     if (!tabSwitched) {
//       setTabSwitched(true);

//       const timer = setTimeout(() => {
//         alert('Exam auto-submitted due to tab switch!');
//         handleSubmit();
//         console.log('Exam auto-submitted due to tab switch after handle submit');
//       }, 3000);
//       // setSubmitted(true)
//       setTabTimer(timer);
//     }
//   };

//   // Optional: If you still want to detect returning
//   const handleFocus = () => {
//     console.log("Tab focus detected — submission countdown not cancelled");
//   };

//   window.addEventListener('blur', handleBlur);
//   window.addEventListener('focus', handleFocus);

//   return () => {
//     window.removeEventListener('blur', handleBlur);
//     window.removeEventListener('focus', handleFocus);
//   };
// }, [submitted, tabSwitched, answers, questions]);


//   // Disable right-click, copy, and paste
//   useEffect(() => {
//     const preventAction = (e) => e.preventDefault();
//     document.addEventListener('contextmenu', preventAction);
//     document.addEventListener('copy', preventAction);
//     document.addEventListener('paste', preventAction);

//     return () => {
//       document.removeEventListener('contextmenu', preventAction);
//       document.removeEventListener('copy', preventAction);
//       document.removeEventListener('paste', preventAction);
//     };
//   }, []);

//   const handleChange = (qId, value) => {
//     setAnswers(prev => ({ ...prev, [qId]: value }));
//   };

//   const handleSubmit = async () => {
//     if (submitted) return;

//     let score = 0;
//     let total = questions.length;

//     questions.forEach(q => {
//       if (answers[q._id] === q.correctAnswer) {
//         score++;
//       }
//     });
//     try {
//       await axios.post('http://localhost:5000/api/student/submit', {
//         studentId,
//         responses: answers,
//         score,
//         total,
//         email,
//         name
//       });
//       alert(`Exam submitted!\nScore: ${score} / ${total}`);
//       setScoreInfo({ score, total });
//       setSubmitted(true);
//     } catch (err) {
//       console.error('Submission error:', err);
//       alert('Submission failed', err.message);
//     }
//   };

//   const formatTime = () => {
//     const mins = Math.floor(timeLeft / 60);
//     const secs = timeLeft % 60;
//     return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
//   };

//   if (submitted) {
//     return (
//       <div className="exam-container">
//         <h2>Thank you! Your exam has been submitted.</h2>
//         {scoreInfo && (
//           <h3>Your Score: {scoreInfo.score} / {scoreInfo.total}</h3>
//         )}
//       </div>
//     );
//   }

//   if (!questions.length) return <p>Loading questions...</p>;

//   const currentQuestion = questions[current];

//   return (
//     <div className="exam-container">
//       <div className="main-content">
//         <div className="timer">Time Left: {formatTime()}</div>
//         {currentQuestion && (
//           <div className="question-box">
//             <h2>Question {current + 1}</h2>
//             <p className="question-text">{currentQuestion.questionText}</p>
//             <div className="option-label-box"> 
//               {currentQuestion.options?.map((opt) => (
//                 <label
//                   key={opt}
//                   className={`option-label ${answers[currentQuestion._id] === opt ? "selected" : ""}`}
//                 >
//                   <input
//                     type="radio"
//                     name={currentQuestion._id}
//                     value={opt}
//                     checked={answers[currentQuestion._id] === opt}
//                     onChange={() => handleChange(currentQuestion._id, opt)}
//                   /> {opt}
//                 </label>
//               ))}
//             </div>
//           </div>
//         )}
//         <div className="nav-buttons">
//           {current > 0 && <button onClick={() => setCurrent(current - 1)}>Previous</button>}
//           {current < questions.length - 1 && <button onClick={() => setCurrent(current + 1)}>Next</button>}
//         </div>
//         <button className="submit-btn" onClick={handleSubmit}>Submit Exam</button>
//       </div>

//       <div className="question-index">
//         {questions.map((q, i) => (
//           <button
//             key={q._id}
//             className={answers[q._id] ? 'green' : 'gray'}
//             onClick={() => setCurrent(i)}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

















///..........................................................................................................................
// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import '../style/StudentExam.css';

// export default function StudentExam({ token, studentId, name, email }) {
//   const [questions, setQuestions] = useState([]);
//   const [answers, setAnswers] = useState({});
//   const [current, setCurrent] = useState(0);
//   const [submitted, setSubmitted] = useState(false);
//   const [timeLeft, setTimeLeft] = useState(1 * 60); // 15 minutes
//   const [tabSwitched, setTabSwitched] = useState(false);
//   const [scoreInfo, setScoreInfo] = useState(null);

//   // NEW: ref to prevent double submission
//   const submissionInProgress = useRef(false);

//   // Fetch questions
//   useEffect(() => {
//     axios.get('http://localhost:5000/api/student/exam-questions')
//       .then(res => setQuestions(res.data))
//       .catch(err => console.error('Error fetching questions:', err));
//   }, []);

//   // Timer countdown
//   useEffect(() => {
//     if (submitted) return;

//     const timer = setInterval(() => {
//       setTimeLeft(prev => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           handleSubmit(); // Auto-submit at 0
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [submitted, answers]);

//   // Tab switch detection
//   useEffect(() => {
//     if (submitted) return;

//     const handleBlur = () => {
//       if (!tabSwitched) {
//         setTabSwitched(true);
//         setTimeout(() => {
//           alert('Exam auto-submitted due to tab switch!');
//           handleSubmit();
//         }, 3000);
//       }
//     };

//     window.addEventListener('blur', handleBlur);
//     return () => window.removeEventListener('blur', handleBlur);
//   }, [submitted, tabSwitched, answers]);

//   // Disable right-click, copy, paste
//   useEffect(() => {
//     const preventAction = (e) => e.preventDefault();
//     document.addEventListener('contextmenu', preventAction);
//     document.addEventListener('copy', preventAction);
//     document.addEventListener('paste', preventAction);

//     return () => {
//       document.removeEventListener('contextmenu', preventAction);
//       document.removeEventListener('copy', preventAction);
//       document.removeEventListener('paste', preventAction);
//     };
//   }, []);

//   const handleChange = (qId, value) => {
//     setAnswers(prev => ({ ...prev, [qId]: value }));
//   };

//   const handleSubmit = async () => {
//     // PREVENT multiple calls instantly
//     if (submissionInProgress.current) return;
//     submissionInProgress.current = true;

//     if (submitted) return;

//     let score = 0;
//     let total = questions.length;

//     questions.forEach(q => {
//       if (answers[q._id] === q.correctAnswer) score++;
//     });

//     try {
//       await axios.post('http://localhost:5000/api/student/submit', {
//         studentId,
//         responses: answers,
//         score,
//         total,
//         email,
//         name
//       });
//       alert(`Exam submitted!\nScore: ${score} / ${total}`);
//       setScoreInfo({ score, total });
//       setSubmitted(true);
//     } catch (err) {
//       console.error('Submission error:', err);
//       alert('Submission failed: ' + err.message);
//     }
//   };

//   const formatTime = () => {
//     const mins = Math.floor(timeLeft / 60);
//     const secs = timeLeft % 60;
//     return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
//   };

//   if (submitted) {
//     return (
//       <div className="exam-container">
//         <h2>Thank you! Your exam has been submitted.</h2>
//         {scoreInfo && (
//           <h3>Your Score: {scoreInfo.score} / {scoreInfo.total}</h3>
//         )}
//       </div>
//     );
//   }

//   if (!questions.length) return <p>Loading questions...</p>;

//   const currentQuestion = questions[current];

//   return (
//     <div className="exam-container">
//       <div className="main-content">
//         <div className="timer">Time Left: {formatTime()}</div>
//         {currentQuestion && (
//           <div className="question-box">
//             <h2>Question {current + 1}</h2>
//             <p className="question-text">{currentQuestion.questionText}</p>
//             <div className="option-label-box">
//               {currentQuestion.options?.map((opt) => (
//                 <label
//                   key={opt}
//                   className={`option-label ${answers[currentQuestion._id] === opt ? "selected" : ""}`}
//                 >
//                   <input
//                     type="radio"
//                     name={currentQuestion._id}
//                     value={opt}
//                     checked={answers[currentQuestion._id] === opt}
//                     onChange={() => handleChange(currentQuestion._id, opt)}
//                   /> {opt}
//                 </label>
//               ))}
//             </div>
//           </div>
//         )}
//         <div className="nav-buttons">
//           {current > 0 && <button onClick={() => setCurrent(current - 1)}>Previous</button>}
//           {current < questions.length - 1 && <button onClick={() => setCurrent(current + 1)}>Next</button>}
//         </div>
//         <button className="submit-btn" onClick={handleSubmit}>Submit Exam</button>
//       </div>

//       <div className="question-index">
//         {questions.map((q, i) => (
//           <button
//             key={q._id}
//             className={answers[q._id] ? 'green' : 'gray'}
//             onClick={() => setCurrent(i)}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }



///.............................................................................................................................

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../style/StudentExam.css';

export default function StudentExam({ token, studentId, name, email }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [tabSwitched, setTabSwitched] = useState(false);
  const [scoreInfo, setScoreInfo] = useState(null);
  const [examStarted, setExamStarted] = useState(false);

  const submissionInProgress = useRef(false);

  // Fetch questions
  useEffect(() => {
    axios.get('http://localhost:5000/api/student/exam-questions')
      .then(res => setQuestions(res.data))
      .catch(err => console.error('Error fetching questions:', err));
  }, []);

  // Timer countdown
  useEffect(() => {
    if (!examStarted || submitted) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [examStarted, submitted]);

  // Tab switch detection
  // useEffect(() => {
  //   if (!examStarted || submitted) return;
  //   const handleBlur = () => {
  //     if (!tabSwitched) {
  //       setTabSwitched(true);
  //       setTimeout(() => {
  //         alert('Exam auto-submitted due to tab switch!');
  //         handleSubmit();
  //       }, 3000);
  //     }
  //   };
  //   window.addEventListener('blur', handleBlur);
  //   return () => window.removeEventListener('blur', handleBlur);
  // }, [examStarted, submitted, tabSwitched]);

  // Disable right-click, copy, paste
  useEffect(() => {
    const preventAction = (e) => e.preventDefault();
    document.addEventListener('contextmenu', preventAction);
    document.addEventListener('copy', preventAction);
    document.addEventListener('paste', preventAction);
    return () => {
      document.removeEventListener('contextmenu', preventAction);
      document.removeEventListener('copy', preventAction);
      document.removeEventListener('paste', preventAction);
    };
  }, []);

  const startExam = async () => {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
      // Detect exit from fullscreen
      document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement && !submitted) {
          alert('You exited fullscreen mode. Exam will be submitted.');
          handleSubmit();
        }
      });
      setExamStarted(true);
    } catch (err) {
      console.error("Fullscreen request failed:", err);
      alert("Unable to enter fullscreen. Please allow fullscreen permission.");
    }
  };

  const handleChange = (qId, value) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));
  };

  const handleSubmit = async () => {
    if (submissionInProgress.current) return;
    submissionInProgress.current = true;
    if (submitted) return;

    let score = 0;
    let total = questions.length;
    questions.forEach(q => {
      if (answers[q._id] === q.correctAnswer) score++;
    });

    try {
      await axios.post('http://localhost:5000/api/student/submit', {
        studentId,
        responses: answers,
        score,
        total,
        email,
        name
      });
      alert(`Exam submitted successfully!`);
      setScoreInfo({ score, total });
      setSubmitted(true);
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      localStorage.removeItem('email');
      localStorage.removeItem('studentId');
    } catch (err) {
      console.error('Submission error:', err);
      alert('Submission failed: ' + err.message);
    }
  };

  const formatTime = () => {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  if (!examStarted) {
    return (
      <div className="exam-container-before">
          <h2>Click below to start your exam</h2>
          <button className="start-btn" onClick={startExam}>Start Exam</button>
          <p className='warning'>Note : If you close full screen mode exam automatically submitted</p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="exam-container">
        <h2>Thank you! Your exam has been submitted.</h2>
        {/* {scoreInfo && (
          <h3>Your Score: {scoreInfo.score} / {scoreInfo.total}</h3>
        )} */}
      </div>
    );
  }

  if (!questions.length) return <p>Loading questions...</p>;

  const currentQuestion = questions[current];

  return (
    <div className="exam-container">
      <div className="main-content">
        <div className='email-timer'>
          <div className="timer">Time Left: {formatTime()}</div>
          <div className="timer">{localStorage.getItem('name')} / {localStorage.getItem('email')}</div>
        </div>
        {currentQuestion && (
          <div className="question-box">
            <h2>Question {current + 1}</h2>
            <p className="question-text">{currentQuestion.questionText}</p>
            <div className="option-label-box">
              {currentQuestion.options?.map((opt) => (
                <label
                  key={opt}
                  className={`option-label ${answers[currentQuestion._id] === opt ? "selected" : ""}`}
                >
                  <input
                    type="radio"
                    name={currentQuestion._id}
                    value={opt}
                    checked={answers[currentQuestion._id] === opt}
                    onChange={() => handleChange(currentQuestion._id, opt)}
                  /> {opt}
                </label>
              ))}
            </div>
          </div>
        )}
        <div className="nav-buttons">
          {current > 0 && <button onClick={() => setCurrent(current - 1)}>Previous</button>}
          {current < questions.length - 1 && <button onClick={() => setCurrent(current + 1)}>Next</button>}
        </div>
        <button className="submit-btn" onClick={handleSubmit}>Submit Exam</button>
      </div>

      <div className="question-index">
        {questions.map((q, i) => (
          <button
            key={q._id}
            className={answers[q._id] ? 'green' : 'gray'}
            onClick={() => setCurrent(i)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
