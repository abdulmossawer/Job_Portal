import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors'
import connectDB from "./utils/db.js";

const app = express();

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
import dotenv from 'dotenv'
dotenv.config({})

const corsOptions = {
  origin: 'http//localhost:5173',
  credentials: true
}

app.use(cors(corsOptions))

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  connectDB()
  console.log(`Server listning on PORT no : ${PORT} `);
});
