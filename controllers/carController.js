import Car from "../models/Car.js";
import User from "../models/User.js";

const carController = {
    getAllCars: async (req, res) => {
        try {
            const cars = await Car.find().populate("owner", "username email");
            if (cars.length < 1) {
                return res
                    .status(404)
                    .json({ message: "Aucune voiture trouvée" });
            }

            return res.status(200).json(cars);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Erreur serveur" });
        }
    },

    getCarById: async (req, res) => {
        try {
            const { id } = req.params;
            const car = await Car.findById(id).populate(
                "owner",
                "username email"
            );

            if (!car) {
                return res.status(404).json({ message: "Voiture non trouvée" });
            }

            return res.status(200).json(car);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Erreur serveur" });
        }
    },

    createCar: async (req, res) => {
        try {
            const { brand, name, model, year, color, price, userId } = req.body;

            const user = await User.findById(userId);
            if (!user) {
                return res
                    .status(404)
                    .json({ message: "Utilisateur non trouvé" });
            }

            const car = await Car.create({
                brand,
                name,
                model,
                year,
                color,
                price,
                owner: userId,
            });

            return res.status(201).json(car);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Erreur serveur" });
        }
    },

    updateCar: async (req, res) => {
        try {
            const { id } = req.params;
            const { brand, name, model, year, color, price } = req.body;

            const car = await Car.findByIdAndUpdate(id, {
                brand,
                name,
                model,
                year,
                color,
                price,
            });

            return res.status(200).json(car);
        } catch (error) {
            console.log(error);

            return res.status(500).json({ message: "Erreur serveur" });
        }
    },

    deleteCar: async (req, res) => {
        try {
            const { id } = req.params;
            await Car.findByIdAndDelete(id);

            return res.status(200).json({ message: "Voiture supprimée" });
        } catch (error) {
            console.log(error);

            return res.status(500).json({ message: "Erreur serveur" });
        }
    },
};

export default carController;
