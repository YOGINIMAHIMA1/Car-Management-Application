const express = require('express');
const auth = require('../middlewares/auth');
const Car = require('../models/Car');

const router = express.Router();

// Add a new car
router.post('/', auth, async (req, res) => {
    try {
        const car = new Car({ ...req.body, userId: req.user._id });
        await car.save();
        res.status(201).json(car);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all cars for a user
router.get('/', auth, async (req, res) => {
    try {
        const cars = await Car.find({ userId: req.user._id });
        res.json(cars);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update car details
router.put('/:id', auth, async (req, res) => {
    try {
        const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(car);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a car
router.delete('/:id', auth, async (req, res) => {
    try {
        await Car.findByIdAndDelete(req.params.id);
        res.json({ message: 'Car deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
