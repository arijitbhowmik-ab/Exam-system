import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import adminRoutes from './routes/adminRoutes.js';
import dotenv from 'dotenv';
const app = express();
dotenv.config();

let activeStudentsCount = 0;

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
// app.use('/api/student', studentRoutes);
app.use('/api/admin', adminRoutes);
// app.use('/api/student', studentSubmissionRoutes);


app.post("/api/student-status", (req, res) => {
    const { action } = req.body;
    if (action === "connect") {
        activeStudentsCount++;
    } else if (action === "disconnect" && activeStudentsCount > 0) {
        activeStudentsCount--;
    }
    console.log("Active Students:", activeStudentsCount);
    res.sendStatus(200);
});

app.get("/api/active-students", (req, res) => {
    res.json({ count: activeStudentsCount });
});
app.get('/', (req,res)=>{
    res.send("You are in the root directory")
})

app.listen(5000,'0.0.0.0', () => console.log('Server running at 5000'));