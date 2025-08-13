import {Student} from '../models/Student.js';
import {Question} from '../models/Question.js';
import express from 'express';
const router = express.Router();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { StudentSubmission } from '../models/StudentSubmission.js';



router.post('/register', async (req, res) => {
    const existStudent = await Student.findOne({ email: req.body.email });
    if(existStudent)
    {
      res.status(400).send({ message: 'Student with same email already exists' });
      return;  // To avoid duplicate emails in database.
    }
  const hashed = await bcrypt.hash(req.body.password, 10);
  const student = new Student({ email: req.body.email, name: req.body.name, password: hashed });
  await student.save();
  res.send({ message: 'Student registered' }); 
}); 

router.post('/login', async (req, res) => {
   const student = await Student.findOne({ email: req.body.email });
   console.log(student)
  if (student && await bcrypt.compare(req.body.password, student.password)) {
    const token = jwt.sign({ id: student._id }, 'secret');
    console.log(`�� JWT token created for student: ${student._id}`);
    res.send({ token, studentId: student._id, name: student.name, email: student.email }); // ✅ Return studentId too
  } else {
    res.status(401).send({ message: 'Invalid credentials' });
  }
});

router.get('/exam-questions', async (req, res) => {
  const questions = await Question.find();
  const shuffled = questions.sort(() => Math.random() - 0.5);
  res.send(shuffled);
});

router.post('/submit', async (req, res) => {
  const { studentId, responses, score, total, name, email } = req.body;
  // console.log('\n📥 Received /submit POST request', req.body);
  // console.log('Payload:', req.body);
  if (!studentId || !responses || score == null || total == null) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  
  console.log(`�� Received /submit POST request for studentId : ${studentId}`);
  const  existId = await StudentSubmission.findOne({email: email});
  try {
      const submission = new StudentSubmission({
        studentId,
        responses,
        score,
        total,
        name,
        email
      });
      if(existId)
      {
        res.status(500).json({ message: 'You already submitted the exam' });
        console.log('You have already submitted the exam');
      }
      else{
        await submission.save();
        res.status(200).json({ message: 'Submission saved successfully' });
      }
    } catch (error) {
      console.error('Error saving submission:', error);
      res.status(500).json({ message: 'Server error saving submission' });
    }

  // try {
  //   const { studentId, responses } = req.body;

  //   // Check if studentId and responses are present
  //   if (!studentId || !responses || typeof responses !== 'object') {
  //     console.warn('⚠️ Missing or invalid data in request');
  //     return res.status(400).json({ message: 'Missing studentId or responses' });
  //   }

  //   // Find student by ID
  //   const student = await Student.findById(studentId);
  //   if (!student) {
  //     console.error('❌ Student not found:', studentId);
  //     return res.status(404).json({ message: 'Student not found' });
  //   }

  //   // Save responses
  //   student.responses = responses;
  //   await student.save();

  //   console.log('✅ Responses saved successfully for student:', studentId);
  //   res.status(200).json({ message: 'Submitted' });
  // } catch (err) {
  //   console.error('🔥 Error during submission:', err);
  //   res.status(500).json({ message: 'Server error during submission', error: err.message });
  // }
});


// router.get('/responses', async (req, res) => {
//   const students = await Student.find().select('name email responses');
//   res.send(students);
// });
router.get('/responses', async (req, res) => {
  try {
    const students = await Student.find({});
    const questions = await Question.find({});
    
    const results = students.map(student => {
      let score = 0;

      const detailedResponses = Object.entries(student.responses || {}).map(([qId, answer]) => {
        const question = questions.find(q => q._id.toString() === qId);
        if (!question) return { questionText: '[Deleted Question]', answer, correctAnswer: 'N/A' };

        const isCorrect = question.type === 'mcq' && question.correctOption === answer;
        if (isCorrect) score += 1;

        return {
          questionText: question.question,
          answer,
          correctAnswer: question.correctOption || 'N/A',
          type: question.type,
          isCorrect
        };
      });

      return {
        _id: student._id,
        name: student.name,
        email: student.email,
        score,
        total: detailedResponses.filter(r => r.type === 'mcq').length,
        responses: detailedResponses
      };
    });

    res.json(results);
  } catch (err) {
    console.error('Error fetching results:', err);
    res.status(500).send({ message: 'Server error' });
  }
});


export default router