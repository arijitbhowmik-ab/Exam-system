import React, { useState } from 'react';
import axios from 'axios';
import '../style/StudentRegister.css'; // Import CSS file
import { Link } from 'react-router-dom';

const AdminRegister = ({onRegister}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = async () => {
    try {
      await axios.post('http://localhost:5000/api/admin/register', { name, email, password });
      alert('Registration successful');
      onRegister(); 
    } catch {
      alert('Registration failed');
    }
  };
  return (
    <div className="register-page">
      <div className="register-card">
        <h2 className="register-title">Admin Registration</h2>
        <input 
          className="register-input" 
          placeholder="Name" 
          value={name} 
          onChange={e => setName(e.target.value)} 
        />
        <input 
          className="register-input" 
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
        />
        <input 
          className="register-input" 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
        />
        <button className="register-button" onClick={register}>Register</button>
        <p>Already hve an account <Link to={'/api/admin/login'}>Admin Login</Link> </p>
      </div>
    </div>
  )
}

export default AdminRegister