// import React, { useState } from 'react';
// import axios from 'axios';
// import '../style/StudentLogin.css';

// export default function StudentLogin({ onLogin }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const login = async () => {
//     try {
//       const res = await axios.post('http://localhost:5000/api/student/login', { email, password });
//       onLogin(res.data.token, res.data.studentId);
//       localStorage.setItem('token', res.data.token);
//       localStorage.setItem('studentId', res.data.studentId); 
//     } catch {
//       alert('Login failed');
//     }
//   };

//   return (
//     <div>
//       <h2>Student Login</h2>
//       <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br/>
//       <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /><br/>
//       <button onClick={login}>Login</button>
//     </div>
//   );
// }

import React, { useState } from 'react';
import axios from 'axios';
import '../style/StudentLogin.css'; // Import CSS file

export default function StudentLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/student/login', { email, password });
      onLogin(res.data.token, res.data.studentId);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('email', res.data.email);
      localStorage.setItem('name', res.data.name);
      localStorage.setItem('studentId', res.data.studentId);  
    } catch {
      alert('Login failed');
    }
  };

  return (
    <div className="student-login-container">
      <div className="student-login-box">
        <h2>Student Login</h2>
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
        <button className="login-button" onClick={login}>Login</button>
      </div>
    </div>
  );
}
