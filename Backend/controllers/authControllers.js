const Patient = require('../models/patientModel');
const Doctor = require('../models/doctorModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const userType = req.body.userType; // Assuming userType is provided in the request

    // Check if userType is valid
    if (!['patient', 'doctor', 'admin'].includes(userType)) {
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid user type',
        });
    }

    // Check if password and email exist
    if (!email || !password) {
        return res.status(400).json({
            status: 'fail',
            message: 'Please provide email and password'
        });
    }

    let User;
    // Determine the appropriate model based on userType
    if (userType === 'patient') {
        User = Patient;
    } else if (userType === 'doctor') {
        User = Doctor;
    } else if (userType === 'admin') {
        User = Admin;
    }

    // Check if password is correct and user exists
    const user = await User.findOne({ email: email }).select('+password');
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(403).json({
            status: 'fail',
            message:'Incorrect email or password'
         });
    }

    // Generate JWT token with user ID and role as payload
    const tokenPayload = { id: user._id, role: userType };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });

    // Set token in cookie
    // makescookie(res, token);

    // Send token in response
    res.status(200).json({
        status: 'success',
        token: token
    });
};
