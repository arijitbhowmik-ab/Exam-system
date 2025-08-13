import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import adminRoutes from './routes/adminRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import studentSubmissionRoutes from './routes/studentSubmissionRoutes.js';
import dotenv from 'dotenv';
const app = express();
dotenv.config();


app.use(cors());
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: "GET, POST, PUT, DELETE",
    credentials: true,  // This allows the server to access the cookie sent by the client
    allowedHeaders: ["Content-Type", "Authorization"]  // These are the headers that the server accepts and allows to be sent by the client
}))
app.use(cors({
  origin: "*", // or set to "http://192.168.0.105:5173"
  credentials: true
}));
const DB_URI = process.env.MONGODB_URI

try {
    await mongoose.connect(DB_URI)
    console.log("Connected to DB")
} catch (error) {
    console.log(error)
}


// app.use('http://192.168.0.100:5000/api/admin', adminRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/student', studentSubmissionRoutes);

app.listen(5000,'0.0.0.0', () => console.log('Server running at 5000'));