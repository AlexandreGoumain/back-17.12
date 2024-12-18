import express from "express";
import {
    isAlreadyUser,
    userValidation,
} from "../middlewares/userValidation.js";
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
        return res.status(200).json(users);
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
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Erreur serveur" });
    }
});

userRouter.post("/", userValidation, isAlreadyUser, async (req, res) => {
    let { name, last_name, email, password } = req.body;

    try {
        const user = new User({ name, last_name, email, password });
        await user.save();
        return res.status(201).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Erreur serveur" });
    }
});

export default userRouter;
