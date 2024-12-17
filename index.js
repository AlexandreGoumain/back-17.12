import express from "express";
const PORT = 5000;
const app = express();

app.get("/", (req, res) => {
    try {
        res.status(200).send("Hello World");
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
