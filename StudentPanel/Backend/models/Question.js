import mongoose from "mongoose";
const QuestionSchema = new mongoose.Schema({
  questionText: String,
  options: [String],
  correctAnswer: String,
  marks: Number,
  type: { type: String, enum: ['MCQ', 'Descriptive'] },
});
export const Question = mongoose.model('Question', QuestionSchema);