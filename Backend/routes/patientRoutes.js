// routes/patientRoutes.js

const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientControllers');

// Define route to get all patients
router.get('/',patientController.getAllPatients);
router.get('/:id',patientController.getPatient);
router.post('/',patientController.createPatient);
router.put('/:id',patientController.updatePatient);
module.exports = router;
