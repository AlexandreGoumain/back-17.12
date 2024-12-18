import Car from "../models/Car.js";

export const carValidation = (req, res, next) => {
    const { brand, name, model, year, color, price } = req.body;
    console.log(req.body);

    if (!brand || !name || !model || !year || !color || !price) {
        return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    next();
};

export const isAlreadyCar = async (req, res, next) => {
    const { name } = req.body;
    const isAlreadyCar = await Car.findOne({ name });

    if (isAlreadyCar) {
        return res.status(400).json({ message: "Cette voiture existe déjà" });
    }

    next();
};
