import mongoose from "mongoose";
const StudentSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  responses: [
    {
      questionId: mongoose.Schema.Types.ObjectId,
      answer: String,
      isCorrect: Boolean,
    },
  ],
});
export const Student = mongoose.model('Student', StudentSchema);