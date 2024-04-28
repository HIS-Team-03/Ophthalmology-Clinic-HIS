const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentControllers');

// Define route to get all appointments
router.get('/', appointmentController.getAllAppointments);

router.post('/', appointmentController.createAppointment);

router.put('/:id', appointmentController.updateAppointment);

router.delete('/:id', appointmentController.deleteAppointment);

router.get('/:id',appointmentController.getAppointment);

module.exports = router;
