import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import movieRouter from "./routes/movieRouter.js";
import userRouter from "./routes/userRouter.js";
const PORT = 5000;
const app = express();

dotenv.config();

app.use(express.json());

const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri);

const db = mongoose.connection;

db.on("error", (error) => {
    console.log(error);
});

db.once("open", () => {
    console.log("Connected to MongoDB");
});

app.get("/", (req, res) => {
    try {
        res.status(200).send("Hello World");
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

app.use("/api/movies", movieRouter);
app.use("/api/users", userRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
