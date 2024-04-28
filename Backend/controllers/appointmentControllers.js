const Appointment = require('../models/appointmentModel');

exports.getAllAppointments = async (req, res, next) => {
    try {
        const appointments = await Appointment.find(); 
        res.status(200).json({
            status: 'success',
            data: {
                appointments
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};

exports.createAppointment = async (req, res, next) => {
    try {
        const newAppointment = await Appointment.create(req.body); 
        res.status(201).json({
            status: 'success',
            data: {
                appointment: newAppointment
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err.message
        });
    }
};


exports.updateAppointment = async (req, res, next) => {
    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                appointment: updatedAppointment
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err.message
        });
    }
};

exports.deleteAppointment = async (req, res, next) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err.message
        });
    }
};

exports.getAppointment = async (req, res, next) => {}