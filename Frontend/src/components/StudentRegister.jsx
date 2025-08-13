// import React, { useState } from 'react';
// import axios from 'axios';

// export default function StudentRegister({ onRegister }) {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const register = async () => {
//     try {
//       await axios.post('http://localhost:5000/api/student/register', { name, email, password });
//       alert('Registration successful');
//       onRegister();
//     } catch {
//       alert('Registration failed');
//     }
//   };

//   return (
//     <div>
//       <h2>Student Registration</h2>
//       <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} /><br/>
//       <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br/>
//       <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /><br/>
//       <button onClick={register}>Register</button>
//     </div>
//   );
// }

import React, { useState } from 'react'; 
import axios from 'axios';
import '../style/StudentRegister.css'; // Import CSS file

export default function StudentRegister({ onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = async () => {
    try {
      await axios.post('http://localhost:5000/api/student/register', { name, email, password });
      alert('Registration successful');
      onRegister(); 
    } catch {
      alert('Registration failed');
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h2 className="register-title">Student Registration</h2>
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
      </div>
    </div>
  );
}
