import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

const Car = mongoose.model("Car", CarSchema);

export default Car;
