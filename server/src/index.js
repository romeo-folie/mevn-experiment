import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes";

const config = dotenv.config({path: "../.env"});

if (config.error) throw config.error;

function connectToDB() {
  const uri = process.env.DB_URI;

  try {
    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(`db connection error ${error}`);
    process.exit(1);
  }
}

function startServer() {
  const app = express();
  const port = process.env.PORT;

  app.use(cors());
  app.use(express.json());
  app.use(router);

  connectToDB();

  app.listen(port, () => console.log(`server up on port ${port}`));
}

startServer();
