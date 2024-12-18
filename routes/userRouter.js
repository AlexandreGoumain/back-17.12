import express from "express";
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

export default userRouter;
