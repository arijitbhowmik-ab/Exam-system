import React from 'react'
import './style/AdminDashboard.css'
import { Link, Outlet } from 'react-router-dom'
const AdminDashboard = () => {
  const handleLogOut = async () => {
    try {
          const response = await axios.get(`http://localhost:5000/api/admin/logout`, {
            withCredentials: true,
          });
          // toast.success(response.data.message);
          localStorage.removeItem("adminId");
        } catch (error) {
          console.log("Error in logging out ", error);
          toast.error(error.response.data.errors || "Error in logging out");
        }
  }
  return (
    <div className='main-dashboard'>
        <div className='left-part'>
          <h1>Admin Panel</h1>
          <Link to={'/api/admin/manage-question'} className='add-questions'>Add Question</Link>
          <Link to={'/api/admin/questions'} className='all-questions'>All Questions</Link>
          <Link to={'/api/admin/results'} className='student-results'>Student Results</Link>
          <Link className='student-details'>Student Details</Link>
          <Link to={'/api/admin/login'} onClick={handleLogOut} className='student-details'>Log out</Link>
        </div>
        <div className='right-part'>
          {/* <p className='welcome-admin'>Welcome to Admin Panel</p> */}
          <Outlet />
        </div>
    </div>
  )
}

export default AdminDashboard