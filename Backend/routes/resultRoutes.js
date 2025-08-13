import express from 'express';
import Result from '../models/Result.js';
const router = express.Router();

// POST /api/student/submit
router.post('/submit', async (req, res) => {
  try {
    const { studentId, responses, score, total } = req.body;

    const result = new Result({
      studentId,
      responses,
      score, 
      total
    });

    await result.save();

    res.status(200).json({ message: 'Result saved successfully' });
  } catch (err) {
    console.error('Error saving result:', err);
    res.status(500).json({ message: 'Failed to save result' });
  }
});

export default router;
