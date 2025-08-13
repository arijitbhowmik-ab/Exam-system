import React from 'react'
import '../style/AdminDashboard.css'
import { Link, Outlet } from 'react-router-dom'
import axios from 'axios'
const AdminDashboard = () => {
  const handleLogOut = async () => {
    try {
          const response = await axios.get(`http://localhost:5000/api/admin/logout`);
          console.log(response);
          // toast.success(response.data.message);
          localStorage.removeItem("adminId");
          localStorage.removeItem("email");
          localStorage.removeItem("name");
          localStorage.removeItem("token");
        } catch (error) { 
          console.log("Error in logging out ", error);
          // toast.error(error.response.data.errors || "Error in logging out");
        }
  }
  return (
    <div className='main-dashboard'>
        <div className='left-part'>
          <h1>Admin Panel</h1>
          <Link to={'/admin/manage-question'} className='add-questions'>Add Question</Link>
          <Link to={'/admin/questions'} className='all-questions'>All Questions</Link>
          <Link to={'/admin/results'} className='student-results'>Student Results</Link>
          <Link className='student-details'>Student Details</Link>
          <Link to={'/login'} onClick={handleLogOut} className='student-details'>Log out</Link>
        </div>
        <div className='right-part'>
          {/* <p className='welcome-admin'>Welcome to Admin Panel</p> */}
          <Outlet />
        </div>
    </div>
  )
}

export default AdminDashboard