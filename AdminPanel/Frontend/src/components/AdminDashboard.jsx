import React, { useState } from 'react'
import '../style/AdminDashboard.css'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BACKEND_URL } from '../utils/utils'
import toast from 'react-hot-toast'
const AdminDashboard = () => {
  const navigate = useNavigate()
  const [showConfirm, setShowConfirm] = useState(false);
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
  const handleDeleteAllData = async () => {
    try {
      const response = await axios.delete(`${BACKEND_URL}/api/admin/delete-all-data`, {
        // withCredentials: true,
      })
      setShowConfirm(false)
      navigate('/admin/questions')
      toast.success(response.data.message)
    } catch (error) {
      console.error("Error deleting all data", error)
      toast.error(error.response?.data?.message || error.message || "Error deleting all data")
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
          <Link
          onClick={() => setShowConfirm(true)}
          className='delete-all-question'
        >
          Delete All Questions
        </Link>
          <Link to={'/login'} onClick={handleLogOut} className='student-details'>Log out</Link>
          <Link to={'/admin/active-students'} className='active-students'>Active students</Link>
          <p className='login-admin'>Loggedin as : {localStorage.getItem('name')}</p>
        {showConfirm && (
          <>
            {/* Backdrop to prevent clicking background */}
            <div className='modal-backdrop' onClick={() => setShowConfirm(false)}></div>
            <div className='confirm-dialog'>
              <p>Are you sure you want to delete ALL data? This action cannot be undone.</p>
              <button onClick={handleDeleteAllData} className='confirm-delete'>Yes, Delete</button>
              <button onClick={() => setShowConfirm(false)} className='cancel-delete'>Cancel</button>
            </div>
          </>
        )}
      </div>

      <div className='right-part'>
        <Outlet />
      </div>
    </div>
  )
}

export default AdminDashboard