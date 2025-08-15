import mongoose from "mongoose";
const QuestionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true
  },
  options: [String],
  correctAnswer: {
    type: String,
    required: true
  },
  // marks: Number,
  // type: { type: String, enum: ['MCQ', 'Descriptive'] },
});
export const Question = mongoose.model('Question', QuestionSchema);