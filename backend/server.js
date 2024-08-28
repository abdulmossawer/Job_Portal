import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./utils/db.js";
import path from "path"

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
import dotenv from "dotenv";
dotenv.config({});

//For hosting
const __dirname = path.resolve();
console.log(__dirname);


//for cors
const corsOptions = {
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true,

};

app.use(cors(corsOptions));

//import the router files
import  userRoute  from "./routes/user.route.js";
import companyRouter from './routes/company.route.js'
import jobRouter from './routes/job.route.js'
import applicationRouter from './routes/application.route.js'

//use the routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRouter)
app.use("/api/v1/job", jobRouter)
app.use("/api/v1/application", applicationRouter)

app.use(express.static(path.join(__dirname, "/frontend/dist")))
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
})



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server listning on PORT no : ${PORT} `);
});
