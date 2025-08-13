import React from 'react'
import '../style/AdminDashboard.css'
import { Link, Outlet } from 'react-router-dom'
import axios from 'axios'
import { BACKEND_URL } from '../utils/utils'
const AdminDashboard = () => {
  const handleLogOut = async () => {
    try {
          const response = await axios.get(`${BACKEND_URL}/api/admin/logout`);
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
          <Outlet />
        </div>
    </div>
  )
}

export default AdminDashboard