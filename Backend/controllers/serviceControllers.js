const Service = require('../models/serviceModel');

exports.getAllServices = async (req, res, next) => {
    try {
        const services = await Service.find(); 
        res.status(200).json({
            status: 'success',
            data: {
                services
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};

exports.getService = async (req, res, next) => {
    try {
        const service = await Service.findOne({ serviceName: req.params.name });
        if (!service) {
            return res.status(404).json({
                status: 'fail',
                message: 'Service not found'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                service
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};

exports.createService = async (req, res, next) => {
    try {
        const newService = await Service.create(req.body); 
        res.status(201).json({
            status: 'success',
            data: {
                service: newService
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err.message
        });
    }
};

exports.updateService = async (req, res, next) => {
    try {
        const service = await Service.findOneAndUpdate({ serviceName: req.params.name }, req.body, {
            new: true,
            runValidators: true
        });
        if (!service) {
            return res.status(404).json({
                status: 'fail',
                message: 'Service not found'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                service
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'error',
            message: err.message
        });
    }
};

exports.deleteService = async (req, res, next) => {
    try {
        const service = await Service.findOneAndDelete({ serviceName: req.params.name });
        if (!service) {
            return res.status(404).json({
                status: 'fail',
                message: 'Service not found'
            });
        }
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};
exports.addDoctorToService = async (req, res, next) => {
    try {
        const { serviceName, doctorId } = req.body;
        const service = await Service.findOne({ serviceName });

        if (!service) {
            return res.status(404).json({
                status: 'fail',
                message: 'Service not found'
            });
        }

        // Add the new doctor to the existing array if not already present
        if (!service.doctors.includes(doctorId)) {
            service.doctors.push(doctorId);
        }

        await service.save();

        res.status(200).json({
            status: 'success',
            data: {
                service
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message
        });
    }
};
