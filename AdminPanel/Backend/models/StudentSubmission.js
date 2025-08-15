import mongoose from 'mongoose';

const studentSubmissionSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  }, 
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  responses: {
    type: Object,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

export const StudentSubmission = mongoose.model('StudentSubmission', studentSubmissionSchema);
