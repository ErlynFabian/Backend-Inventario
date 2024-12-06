const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Crear un artículo
router.post('/', async (req, res) => {
    const { code, name, photo, description, quantity, price } = req.body;
    try {
        const newItem = new Item({ code, name, photo, description, quantity, price });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el artículo', error });
    }
});

// Obtener todos los artículos
router.get('/', async (req, res) => {
    try {
        const items = await Item.find({}, 'code name photo description quantity price');
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los artículos', error });
    }
});

// Obtener un artículo por ID
router.get('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id, 'code name photo description quantity price');
        if (!item) {
            return res.status(404).json({ message: 'Artículo no encontrado' });
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el artículo', error });
    }
});

// Actualizar un artículo
router.put('/:id', async (req, res) => {
    const { code, name, photo, description, quantity, price } = req.body;
    try {
        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            { code, name, photo, description, quantity, price },
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
