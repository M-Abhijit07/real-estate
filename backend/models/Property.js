const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Bedrooms: { type: Number, required: true },
    Price: { type: String, required: true },
    Location: { type: String, required: true },
    Total_Area: { type: Number, required: true },
    Description: { type: String, required: true },
    Baths: { type: Number, required: true },
    Balcony: { type: Boolean, required: true }, // Assuming Balcony is a boolean
});

module.exports = mongoose.model('Property', propertySchema);
