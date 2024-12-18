import express from "express";
import {
    isAlreadyUser,
    userValidation,
} from "../middlewares/userValidation.js";
import Car from "../models/Car.js";
import User from "../models/User.js";

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
    try {
        const users = await User.find();
        if (users.length < 1) {
            return res
                .status(404)
                .json({ message: "Aucun utilisateur trouvé" });
        }

        const usersWithCars = await Promise.all(
            users.map(async (user) => {
                const cars = await Car.find({ owner: user._id });
                return {
                    ...user.toObject(),
                    cars: cars,
                };
            })
        );

        return res.status(200).json(usersWithCars);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Erreur serveur" });
    }
});

userRouter.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        const userCars = await Car.find({ owner: id });

        const userWithCars = {
            ...user.toObject(),
            cars: userCars,
        };

        return res.status(200).json(userWithCars);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Erreur serveur" });
    }
});

userRouter.post("/", userValidation, isAlreadyUser, async (req, res) => {
    let { name, last_name, email, password } = req.body;

    try {
        const user = await User.create({ name, last_name, email, password });

        return res.status(201).json(user);
    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Erreur serveur" });
    }
});

userRouter.put("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const { name, last_name, email, password } = req.body;
        const user = await User.findByIdAndUpdate(id, {
            name,
            last_name,
            email,
            password,
        });

        return res.status(200).json(user);
    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Erreur serveur" });
    }
});

userRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        return res.status(200).json({ message: "Utilisateur supprimé" });
    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "Erreur serveur" });
    }
});

export default userRouter;
