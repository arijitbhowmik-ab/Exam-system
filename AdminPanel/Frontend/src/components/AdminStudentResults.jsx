import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/AdminStudentResults.css';
import { BACKEND_URL } from '../utils/utils'

export default function AdminStudentResults() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/admin/results`)
      .then((res) => {
        setStudents(res.data);
      })
      .catch(err => console.error('Error fetching results:', err));
  }, []);

  const downloadCSV = () => {
    const headers = ['Name', 'Email', 'Score', 'Total'];
    const rows = students.map(student => [
      student.name,
      student.email, 
      student.score,
      student.total,
    ]);

    const csvContent =
      [headers, ...rows]
        .map(e => e.map(field => `"${field}"`).join(","))
        .join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a"); 
    link.setAttribute("href", url);
    link.setAttribute("download", "student_results.csv");
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const deleteResponseHandler = (studentId) => {
    axios.delete(`${BACKEND_URL}/api/admin/results/${studentId}`)
     .then(() => {
        console.log(`Response deleted for student ID: ${studentId}`);
        setStudents(students.filter(student => student._id!== studentId));
      })
     .catch(err => console.error('Error deleting response:', err));
  }

  return (
    <div style={{ padding: '20px' }} className='student-result-box'>
      <h2>Student Exam Results</h2>

      <button onClick={downloadCSV} className="download-btn">
        Download CSV
      </button>

      <div className='student-card'>
        <table className="student-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email Id</th>
              <th>Marks</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="3">No student submissions yet.</td>
              </tr>
            ) : (
              students.map(student => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.score} / {student.total}</td>
                  <td><button className='delete-btn' onClick={()=> deleteResponseHandler(student._id)}>Delete</button></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
