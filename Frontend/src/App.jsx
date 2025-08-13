// import React, { useState } from 'react';
// import StudentLogin from './components/StudentLogin';
// import StudentRegister from './components/StudentRegister';
// import StudentExam from './components/StudentExam';
// import AdminPanel from './components/AdminPanel';
// import './App.css';
// import { Link } from 'react-router-dom';
// function App() {
//   const [token, setToken] = useState(null);
//   const [studentId, setStudentId] = useState(null);
//   const [view, setView] = useState('login');

//   if (token) return <StudentExam token={token} studentId={studentId} />;
//   if (token) return <StudentExam token={token} studentId={localStorage.getItem('studentId')} />

//   if (view === 'admin') return (
//     <>
//     <AdminPanel />
//     </>
//   );

//   return view === 'login' ? (
//     <>
//       <div className='login-component'>
//         <StudentLogin onLogin={(t, id) => { setToken(t); setStudentId(id); }} />
//         <div className='go-to-register'>
//           <p>Don't have an account? <button className='btn-go-to-register' onClick={() => setView('register')}>Register</button></p>
//           {/* {
//             view === 'admin' ? <p>Admin? <button onClick={() => setView('admin')}>Go to Admin Panel</button></p>:<></>
//           } */}
//           <p>Admin? <button className='btn-go-to-admin' onClick={() => setView('admin')}>Go to Admin Panel</button></p>
//         </div>
//       </div>
//     </>
//   ) : (
//     <>
//       <div className='register-component'>
//         <StudentRegister onRegister={() => setView('login')} />
//         <p className='go-to-login'>Already have an account? <button className='btn-go-to-register' onClick={() => setView('login')}>Login</button></p>
//       </div>
//     </>
//   );
// }

// export default App;















// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
// import StudentLogin from './components/StudentLogin';
// import StudentRegister from './components/StudentRegister';
// import StudentExam from './components/StudentExam';
// import AdminPanel from './components/AdminPanel';
// import './App.css';

// function App() {
//   const [token, setToken] = useState(null);
//   const [studentId, setStudentId] = useState(null);

//   return (
//     <Router>
//       <div className="app-container">
//         <div className="auth-card">
//           <Routes>
//             <Route
//               path="/"
//               element={
//                 token ? (
//                   <StudentExam token={token} studentId={localStorage.getItem('studentId')} />
//                 ) : (
//                   <Navigate to="/login" />
//                 )
//               }
//             />
//             <Route
//               path="/login"
//               element={
//                 <>
//                   <StudentLogin onLogin={(t, id) => { setToken(t); setStudentId(id); }} />
//                   <div className="auth-links">
//                     <p>Don't have an account? <Link to="/register">Register</Link></p>
//                     <p>Admin? <Link to="/admin">Go to Admin Panel</Link></p>
//                   </div>
//                 </>
//               }
//             />
//             <Route
//               path="/register"
//               element={
//                 <>
//                   <StudentRegister onRegister={() => { window.location.href = "/login"; }} />
//                   <div className="auth-links">
//                     <p>Already have an account? <Link to="/login">Login</Link></p>
//                   </div>
//                 </>
//               }
//             />
//             <Route path="/admin" element={<AdminPanel />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;















// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
// import StudentLogin from './components/StudentLogin';
// import StudentRegister from './components/StudentRegister';
// import StudentExam from './components/StudentExam';
// import AdminPanel from './components/AdminPanel';
// import AdminStudentResults from './components/AdminStudentResults'; // Make sure this file exists
// import './App.css';

// function App() {
//   const [token, setToken] = useState(null);
//   const [studentId, setStudentId] = useState(null);

//   return (
//     <Router>
//       <div className="app-container">
//         <div className="auth-card">
//           <Routes>
//             <Route
//               path="/"
//               element={
//                 token ? (
//                   <StudentExam token={token} studentId={localStorage.getItem('studentId')} />
//                 ) : (
//                   <Navigate to="/login" />
//                 )
//               }
//             />

//             <Route
//               path="/login"
//               element={
//                 <>
//                   <StudentLogin onLogin={(t, id) => {
//                     setToken(t);
//                     setStudentId(id);
//                     localStorage.setItem('studentId', id); // Save student ID on login
//                   }} />
//                   <div className="auth-links">
//                     <p>Don't have an account? <Link to="/register">Register</Link></p>
//                     <p>Admin? <Link to="/admin">Go to Admin Panel</Link></p>
//                   </div>
//                 </>
//               }
//             />

//             <Route
//               path="/register"
//               element={
//                 <>
//                   <StudentRegister onRegister={() => { window.location.href = "/login"; }} />
//                   <div className="auth-links">
//                     <p>Already have an account? <Link to="/login">Login</Link></p>
//                   </div>
//                 </>
//               }
//             />

//            <Route path="/admin" element={<AdminPanel />} />
//             <Route path="/admin/results" element={<AdminStudentResults />} /> 
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;













///.............................................................................................................................

// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import StudentLogin from './components/StudentLogin';
// import StudentRegister from './components/StudentRegister';
// import StudentExam from './components/StudentExam';
// import AdminPanel from './components/AdminPanel';
// import './App.css';

// function App() {
//   const [token, setToken] = useState(localStorage.getItem('token') || null);
//   const [studentId, setStudentId] = useState(localStorage.getItem('studentId') || null);

//   return (
//     <Router>
//       <Routes>
//         <Route
//           path="/"
//           element={<Navigate to="/login" />}
//         />
        
//         <Route
//           path="/login"
//           element={
//             <div className="login-component">
//               <StudentLogin onLogin={(t, id) => {
//                 setToken(t);
//                 setStudentId(id);
//                 localStorage.setItem('token', t);
//                 localStorage.setItem('studentId', id);
//                 window.location.href = '/exam'; // redirect after login
//               }} />
//               <div className="go-to-register">
//                 <p>Don't have an account? <button className="btn-go-to-register" onClick={() => window.location.href = "/register"}>Register</button></p>
//                 <p>Admin? <button className="btn-go-to-admin" onClick={() => window.location.href = "/admin"}>Go to Admin Panel</button></p>
//               </div>
//             </div>
//           }
//         />

//         <Route
//           path="/register"
//           element={
//             <div className="register-component">
//               <StudentRegister onRegister={() => window.location.href = "/login"} />
//               <p className="go-to-login">Already have an account? <button className="btn-go-to-register" onClick={() => window.location.href = "/login"}>Login</button></p>
//             </div>
//           }
//         />

//         <Route
//           path="/exam"
//           element={
//             token && studentId ? (
//               <StudentExam token={token} studentId={studentId} />
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />

//         <Route
//           path="/admin"
//           element={<AdminPanel />}
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



//....................................................................................................................................


import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import StudentLogin from './components/StudentLogin';
import StudentRegister from './components/StudentRegister';
import StudentExam from './components/StudentExam';

import './App.css';
import AdminStudentResults from './admin/AdminStudentResults';
import AllQuestions from './admin/AllQuestions';
import AdminQuestionManager from './admin/AdminQuestionManager';
import AdminDashboard from './admin/AdminDashboard';
import AdminLogin from './admin/AdminLogin';
import AdminRegister from './admin/AdminRegister';


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
                <p>Admin? <Link className="btn-go-to-admin" to="/api/admin/login">Go to Admin Panel</Link></p>
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

        {/* Admin layout with nested routes */}
        {/* <Route path="/admin" element={<AdminDashboard />}> */}
          <Route path="/api/admin/register" 
           element={
            <div className="register-component">
              <AdminRegister onRegister={() => window.location.href = "/api/admin/login"} />
            </div>
          }
          ></Route>
          <Route 
          path="/api/admin/login" 
          element={
            <div className="login-component">
              <AdminLogin onLogin={(t, id) => {
                setToken(t);
                setAdminId(id);
                localStorage.setItem('token', t);
                localStorage.setItem('adminId', id);
                window.location.href = '/api/admin';
              }} />
            </div>
          }
          />
            <Route path="/api/admin" 
            element={
            token && adminId ? (
              <AdminDashboard token={token} adminId={studentId} name={name} email={email} />
            ) : (
              <Navigate to="api/admin/login" />
            )
          }
            >
            <Route path="manage-question" element={<AdminQuestionManager />} />
            <Route path="results" element={<AdminStudentResults />} />
            <Route path="questions" element={<AllQuestions />} />
          </Route>
          {/* <Route index element={<Navigate to="manager" />} /> */}
        {/* </Route> */}
      </Routes>
    </Router>
  );
}

export default App;
