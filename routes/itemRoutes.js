const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Crear un artículo
router.post('/', async (req, res) => {
    const { description, quantity, price } = req.body;
    try {
        const newItem = new Item({ description, quantity, price });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el artículo', error });
    }
});

// Obtener todos los artículos
router.get('/', async (req, res) => {
    try {
        const items = await Item.find({}, 'description quantity price'); // Solo devuelve los campos que manejas
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los artículos', error });
    }
});

// Actualizar un artículo
router.put('/:id', async (req, res) => {
    const { description, quantity, price } = req.body;
    try {
        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            { description, quantity, price },
            { new: true }
        );
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el artículo', error });
    }
});

// Eliminar un artículo
router.delete('/:id', async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Artículo eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el artículo', error });
    }
});

module.exports = router;
