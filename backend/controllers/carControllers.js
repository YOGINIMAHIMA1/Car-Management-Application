// controllers/carController.js

const Car = require('../models/Car');

// Add a car
exports.addCar = async (req, res) => {
    try {
        const car = new Car({ ...req.body, userId: req.user._id });
        await car.save();
        res.status(201).json(car);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all cars for a user
exports.getCars = async (req, res) => {
    try {
        const cars = await Car.find({ userId: req.user._id });
        res.json(cars);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update a car
exports.updateCar = async (req, res) => {
    try {
        const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(car);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a car
exports.deleteCar = async (req, res) => {
    try {
        await Car.findByIdAndDelete(req.params.id);
        res.json({ message: 'Car deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
