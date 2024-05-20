const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceControllers');

router.get('/', serviceController.getAllServices);

router.get('/:name', serviceController.getService);

router.post('/', serviceController.createService);

router.patch('/:name', serviceController.updateService);

router.delete('/:name', serviceController.deleteService);

router.post('/add-doctor', serviceController.addDoctorToService);

module.exports = router;