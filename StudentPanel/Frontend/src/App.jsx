import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import StudentLogin from './components/StudentLogin';
import StudentRegister from './components/StudentRegister';
import StudentExam from './components/StudentExam';

import './App.css';


function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [studentId, setStudentId] = useState(localStorage.getItem('studentId') || null);
  const [adminId, setAdminId] = useState(localStorage.getItem('adminId') || null);
  const [name, setName] = useState(localStorage.getItem('name') || null);
  const [email, setEmail] = useState(localStorage.getItem('email') || null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={
            <div className="login-component">
              <StudentLogin onLogin={(t, id) => {
                setToken(t);
                setStudentId(id);
                localStorage.setItem('token', t);
                localStorage.setItem('studentId', id);
                window.location.href = '/exam';
              }} />
              <div className="go-to-register">
                <p>Don't have an account?<button className="btn-go-to-register" onClick={() => window.location.href = "/register"}>Register</button></p>
              </div>
            </div>
          }
        />

        <Route
          path="/register"
          element={
            <div className="register-component">
              <StudentRegister onRegister={() => window.location.href = "/login"} />
              <p className="go-to-login">Already have an account? <button className="btn-go-to-register" onClick={() => window.location.href = "/login"}>Login</button></p>
            </div>
          }
        />

        <Route 
          path="/exam"
          element={
            token && studentId ? (
              <StudentExam token={token} studentId={studentId} name={name} email={email} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
