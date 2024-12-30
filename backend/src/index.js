import express from "express";
import authRoutes from './routes/authRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app,server } from "./lib/socket.js";
import path from "path"

dotenv.config();
// const app=express();//remove this since created in socket.js


// Middleware to parse JSON data
//app.use(express.json()); 

app.use(cookieParser());


app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true, // Allow cookies to be sent
}));


// Middleware to parse URL-encoded data (optional, for form submissions)
app.use(express.json({ limit: "10mb" })); // Adjust "10mb" as needed
app.use(express.urlencoded({ limit: "10mb", extended: true }));

const PORT=process.env.PORT

const __dirname = path.resolve();

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}


server.listen(PORT,()=>{
    connectDB();
    console.log(`Server running on ${PORT}`)
})
