const mongoose = require('mongoose');
const validator= require('validator');

const appointmentSchema = new mongoose.Schema({
    patientId: {
        type: String,
        required: true,
    },
    doctorId: {
        type: String,
        required: true,
    },
    serviceId: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: { type: String,
        required:true,
    },
    status: {
        type: String,
        enum: ['scheduled', 'cancelled', 'pending'],
        default: 'pending'
    },
    payment: {
        amount: {
            type: Number,
            required: true,
        },
    },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;

// async function saveTestapp() {
//     try {
//         const testapp = new Appointment({
//             patientId: '321',
//             doctorId: '1818',
//             serviceId: 'check',
//             date: '12',
//             status: 'scheduled',
//             payment: {
//                 amount: 100, 
//                 method: 'credit card' 
//             }
//         });
//         const savedAppointment = await testapp.save(); // Corrected
//         console.log('Appointment saved successfully:', savedAppointment);
//     } catch (error) {
//         console.error('Error saving appointment:', error);
//     }
// }

