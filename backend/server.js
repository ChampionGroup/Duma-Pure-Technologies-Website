import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

const  port  = process.env.PORT || 5000;

connectDB();

const allowAllowOrigin = ["http://localhost:3000"];

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: allowAllowOrigin
}));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});