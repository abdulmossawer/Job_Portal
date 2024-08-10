import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./utils/db.js";

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
import dotenv from "dotenv";
dotenv.config({});

//for cors
const corsOptions = {
  origin: "http//localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

//import the router files
import  userRoute  from "./routes/user.routes.js";

//use the routes
app.use("/api/v1/user", userRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server listning on PORT no : ${PORT} `);
});
