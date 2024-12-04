const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    description: { 
        type: String, 
        required: true 
    },
    quantity: { 
        type: Number, 
        required: true 
    },

    price: { 
        type: Number, 
        required: true 
    },
});

module.exports = mongoose.model('Item', itemSchema);
