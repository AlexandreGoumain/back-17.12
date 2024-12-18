import express from "express";
import movieRouter from "./routes/movieRouter.js";
const PORT = 5000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    try {
        res.status(200).send("Hello World");
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

app.use("/api/movies", movieRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
