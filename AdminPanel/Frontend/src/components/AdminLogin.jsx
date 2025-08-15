import React, { useState } from 'react';
import axios from 'axios';
import '../style/AdminLogin.css'; 
import { Link } from 'react-router-dom';
import { BACKEND_URL } from '../utils/utils'
import toast from 'react-hot-toast';
const AdminLogin = ({onLogin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/admin/login`, { email, password });
      onLogin(res.data.token, res.data.adminId);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('email', res.data.email);
      localStorage.setItem('name', res.data.name);
      localStorage.setItem('adminId', res.data.adminId);  
      toast.success(res.data.message);
    } catch {
      // alert('Login failed');
      toast.error('Invalid email or password');
    }
  }
  return (
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
        <button className="login-button"  onClick={login}>Admin Login</button>
        <p>Don't have Admin account <Link to={'/register'}>Register</Link> </p>
      </div>
    </div>
  ) 
}

export default AdminLogin