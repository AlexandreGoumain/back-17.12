import express from "express";
import userController from "../controllers/userController.js";
import {
    isAlreadyUser,
    userValidation,
} from "../middlewares/userValidation.js";

const userRouter = express.Router();

userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", userController.getUserById);
userRouter.put("/:id", userController.updateUser);
userRouter.post("/", userValidation, isAlreadyUser, userController.createUser);
userRouter.delete("/:id", userController.deleteUser);

export default userRouter;
