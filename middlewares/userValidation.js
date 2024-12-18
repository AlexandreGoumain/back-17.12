import User from "../models/User.js";

export const userValidation = (req, res, next) => {
    const { name, last_name, email, password } = req.body;
    console.log(req.body);

    if (!name || !last_name || !email || !password) {
        return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    next();
};

export const isAlreadyUser = async (req, res, next) => {
    const { email } = req.body;
    const isAlreadyUser = await User.findOne({ email });
    if (isAlreadyUser) {
        return res
            .status(400)
            .json({ message: "Cette adresse email est déjà utilisée" });
    }
    next();
};
