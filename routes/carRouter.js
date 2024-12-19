import express from "express";
import carController from "../controllers/carController.js";

const carRouter = express.Router();

carRouter.get("/", carController.getAllCars);
carRouter.get("/:id", carController.getCarById);
carRouter.post("/", carController.createCar);
carRouter.put("/:id", carController.updateCar);
carRouter.delete("/:id", carController.deleteCar);

export default carRouter;
