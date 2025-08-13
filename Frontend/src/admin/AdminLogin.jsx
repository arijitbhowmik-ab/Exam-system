import React, { useState } from 'react';
import axios from 'axios';
import './style/AdminLogin.css'; // Import CSS file
import { Link } from 'react-router-dom';
const AdminLogin = ({onLogin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:5000/api/admin/login', { email, password },
        {
            // withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            }
        }
      );
      onLogin(res.data.token, res.data.studentId);
      console.log(res.data);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('email', res.data.email);
      localStorage.setItem('name', res.data.name);
      localStorage.setItem('adminId', res.data.adminId);
    } catch(err) {
      console.log(err);
      alert('Login failed');
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="student-login-container">
      <div className="student-login-box">
        <h2>Admin Login</h2>
        <input 
          className="login-input" 
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
        /><br/>
        <input 
          className="login-input" 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
        /><br/>
        <button className="login-button">Admin Login</button>
        <p>Don't have Admin account <Link to={'/api/admin/register'}>Register</Link> </p>
      </div>
    </div>
    </form>
  ) 
}

export default AdminLogin