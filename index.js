import express from "express";
const PORT = 5000;
const app = express();

const movies = [
    { id: "1", title: "Inception", year: 2010 },
    { id: "2", title: "The Matrix", year: 1999 },
];

app.get("/", (req, res) => {
    try {
        res.status(200).send("Hello World");
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

app.get("/movie/:id", (req, res) => {
    try {
        const { id } = req.params;
        const movie = movies.find((m) => m.id === id);

        if (!movie) {
            return res.status(404).json({ message: "Film non trouvé" });
        }

        res.status(200).json(movie);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Erreur serveur",
            error: error.message,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
