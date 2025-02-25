import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const dbURL = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.6ofqh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
app.listen(PORT, (err: any) => {
  if (err) {
    throw new Error(err);
  }
  console.log(`Server is running at http://localhost:${PORT}`);
});
