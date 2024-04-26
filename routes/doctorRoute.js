const express = require("express")
const { getDoctors, createDoctor, get_one_Doctor, updateDoctor, deleteDoctor , loginDoctor } = require("../controllers/doctorController")
const router = express.Router()

router.route('/').get(getDoctors).post(createDoctor)

router.route('/:id').put(updateDoctor).get(get_one_Doctor).delete(deleteDoctor)

// /http://localhost:5001/api/doctors/login
router.route('/login').post(loginDoctor)



module.exports = router