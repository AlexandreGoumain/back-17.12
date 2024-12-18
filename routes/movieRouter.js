import express from "express";
import movies from "../data/data.js";
const movieRouter = express.Router();

movieRouter.get("/:id", (req, res) => {
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

movieRouter.post("/", (req, res) => {
    const { title, genre, year } = req.body;

    try {
        const movie = { id: movies.length + 1, title, genre, year };

        if (!title || !genre || !year) {
            return res
                .status(400)
                .json({ message: "Titre, genre et année sont requis" });
        }

        movies.push(movie);

        res.status(201).json(movie);
    } catch (error) {
        console.log(error);
    }
});

movieRouter.put("/:id", (req, res) => {
    const { id } = req.params;
    const { title, genre, year } = req.body;

    const movie = movies.find((m) => m.id === id);

    if (!movie) {
        return res.status(404).json({ message: "Film non trouvé" });
    }

    movie.title = title || movie.title;
    movie.genre = genre || movie.genre;
    movie.year = year || movie.year;

    res.status(200).json(movie);
});

movieRouter.delete("/:id", (req, res) => {
    const { id } = req.params;
    const movie = movies.find((m) => m.id === id);

    if (!movie) {
        return res.status(404).json({ message: "Film non trouvé" });
    }

    const index = movies.indexOf(movie);
    movies.splice(index, 1);

    res.status(204).send();
});

export default movieRouter;
