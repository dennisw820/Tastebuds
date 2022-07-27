// Resources
const mongoose = require('mongoose');

// Menu Model
const itemSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        trim: true,
        required: [true, "Menu items must have a name."],
        unique: true
    },
    description: {
        type: String,
        trim: true,
        required: [true, "Menu items must have a description."]
    },
    price: {
        type: Number,
        required: [true, "Menu items must have a price."]
    },
    rating: {
        type: Number,
        required: [true, "Menu items must have a rating."]
    },
    image: {
        type: Buffer,
        required: [true, "Menu items must have an image."]
    },
    url: {
        type: String,
        trim: true,
        required: false,
        unique: true
    }

},{ timestamps: true });

const item = mongoose.model('item', itemSchema);

// Export Schema as Module
module.exports = item;