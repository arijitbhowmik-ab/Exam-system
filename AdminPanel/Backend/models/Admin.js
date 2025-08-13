// const mongoose = require('mongoose');
import mongoose from "mongoose";
const AdminSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
export const Admin = mongoose.model('Admin', AdminSchema);