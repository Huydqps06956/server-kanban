import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./src/routers/user";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const dbURL = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.6ofqh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const cors = require("cors");
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  })
);
app.use("/auth", userRouter);

const connectDB = async () => {
  try {
    await mongoose.connect(dbURL);
    console.log("Connected to database");
  } catch (err) {
    console.error(err);
  }
};

connectDB()
  .then(() => {
    app.listen(PORT, (err: any) => {
      if (err) {
        throw new Error(err);
      }
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
