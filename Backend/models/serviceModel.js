const mongoose = require('mongoose');
const validator = require('validator');

const serviceSchema = new mongoose.Schema({
    serviceName: {
        type: String,
        required: true,
        unique: true         // Ensure serviceName is not dupluicated 
    },
    doctors:[ {
        type: String,
        required: true,
    }],
    payment: {
        amount: {
            type: Number,
            required: true,
        },
    },
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;