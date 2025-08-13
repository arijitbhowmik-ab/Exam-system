import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';

import './App.css';
import AdminStudentResults from './components/AdminStudentResults';
import AllQuestions from './components/AllQuestions';
import AdminQuestionManager from './components/AdminQuestionManager';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import AdminRegister from './components/AdminRegister';


function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [studentId, setStudentId] = useState(localStorage.getItem('studentId') || null);
  const [adminId, setAdminId] = useState(localStorage.getItem('adminId') || null);
  const [name, setName] = useState(localStorage.getItem('name') || null);
  const [email, setEmail] = useState(localStorage.getItem('email') || null);

  return (
    <Router>
      <Routes>
        {/* Admin layout with nested routes */}
        {/* <Route path="/admin" element={<AdminDashboard />}> */}
        <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/register" 
           element={
            <div className="register-component">
              <AdminRegister onRegister={() => window.location.href = "/api/admin/login"} />
            </div>
          }
          ></Route>
          <Route 
          path="/login" 
          element={
            <div className="login-component">
              <AdminLogin onLogin={(t, id) => {
                setToken(t);
                setAdminId(id);
                localStorage.setItem('token', t);
                localStorage.setItem('adminId', id);
                window.location.href = '/admin';
              }} />
            </div>
          }
          />
            <Route path="/admin" 
            element={
            token && adminId ? (
              <AdminDashboard token={token} adminId={studentId} name={name} email={email} />
            ) : (
              <Navigate to="/login" />
            )
          }
            >
            <Route path="manage-question" element={<AdminQuestionManager />} />
            <Route path="results" element={<AdminStudentResults />} />
            <Route path="questions" element={<AllQuestions />} />
          </Route>
      </Routes>
    </Router>
  );
}

export default App;
