import express from 'express';
import  {StudentSubmission}  from '../models/StudentSubmission.js';
// const StudentSubmission = require('../models/StudentSubmission');

const router = express.Router();

router.post('/submit', async (req, res) => {
  const { studentId, responses, score, total, name } = req.body;
  console.log(`Received /submit POST request with body:`, req.body);
  if (!studentId || !responses || score == null || total == null) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  console.log(`�� Received / submit POST request for studentId with name is : ${name, studentId}`);
  try {
    const submission = new StudentSubmission({
      studentId,
      responses,
      score,
      total,
    });

    await submission.save();
    res.status(200).json({ message: 'Submission saved successfully' });
  } catch (error) {
    console.error('Error saving submission:', error);
    res.status(500).json({ message: 'Server error saving submission' });
  }
});

export default router;
