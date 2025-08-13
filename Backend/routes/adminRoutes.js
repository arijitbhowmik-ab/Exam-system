// const express = require('express');
const router = express.Router();
// const Admin = require('../models/Admin');
// const Question = require('../models/Question');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

import express from 'express';
import {Admin} from '../models/Admin.js';
import {Question} from '../models/Question.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Result } from '../models/Result.js'; 
import { StudentSubmission } from '../models/StudentSubmission.js';

router.post('/register', async (req, res) => {
  const existAdmin = await Admin.findOne({ email: req.body.email });
  if(existAdmin)
  {
    res.status(400).send({ message: 'Admin with same email already exists' });
    return;  // To avoid duplicate emails in database.
  }
  const hashed = await bcrypt.hash(req.body.password, 10);
  const admin = new Admin({ email: req.body.email, name: req.body.name, password: hashed });
  await admin.save();
  res.send({ message: 'Admin registered' });
});

router.post('/login', async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });
  const isPasswordValid = await bcrypt.compare(req.body.password, admin.password);
  if (!admin || !isPasswordValid)
    res.status(401).send({ message: 'Invalid credentials' }); 

    const token = jwt.sign({ id: admin._id }, 'secret', {expiresIn: "1d"  });
    res.send({ token, adminId: admin._id, name: admin.name, email: admin.email })
    const cookieOptions = {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        httpOnly: true,  //can't be access via JS directly
        secure: "production",  // true for https only
        sameSite: "Strict" //CSRF attack prevent
    }
        res.cookie("jwt", token, cookieOptions)
        res.status(201).json({ message: "Logged in successfully", admin, token})
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
    console.log(error);
  }
  
});

router.get('/logout', (req,res) => {
      try {
        if(!req.cookies.jwt){
            return res.status(400).json({ message: "No token found, Login first" })
        }
        res.clearCookie("jwt")
        res.status(200).json({ message: "Logged out successfully" })
    } catch (error) {
        res.status(500).json({ message: "Server error in logout" })
        console.error(error)
    }
})

router.post('/add-question', async (req, res) => {
  const question = new Question(req.body);
  await question.save();
  res.send({ message: 'Question added' });
}); 

router.get('/questions', async (req, res) => {
  const questions = await Question.find();
  res.send(questions);
});

router.delete('/question/:id', async (req, res) => {
  await Question.findByIdAndDelete(req.params.id);
  res.send({ message: 'Deleted' });
});

router.put('/question/:id', async (req, res) => {
  await Question.findByIdAndUpdate(req.params.id, req.body);
  res.send({ message: 'Updated' });
});

router.get('/results', async (req, res) => {  
  try {
    const submissions = await StudentSubmission.find()
    console.log(submissions);
      // .populate('studentId', 'name email') // Get student name and email
      // .sort({ submittedAt: -1 });

    res.status(200).json(submissions);
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ message: 'Error fetching student results' });
  }
});

router.delete('/results/:id', async (req, res) => {
  try {
    await StudentSubmission.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Deleted' });
  } catch (error) {
    console.error('Error deleting result:', error);
    res.status(500).json({ message: 'Error deleting student response' });
  }
})

export default router