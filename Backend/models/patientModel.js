const mongoose = require('mongoose');
const validator = require('validator');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const patientscheme = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A user must have a name'],
        maxlength: [20, 'A user name must have less or equal than 20 characters'],
        minlength: [5, 'A user name must have more or equal than 10 characters'],
        validate: {
            validator: function (val) {
                return validator.isAlpha(val.split(' ').join(''));
            },
            message: 'A patient name must only contain characters'
        }
    },
    age: {
        type: Number,
        required: [true, 'A patient must have an age'],
        validate: {
            validator: function (age) {
                return age > 0;
            }
        }
    },
    email: {
        type: String,
        required: [true, 'A patient must have an email'],
        unique: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    address: {
        type: String,
        required: [true, 'A patient must have an address'],
    },
    phoneNumber: {
        type: String,
        required: [true, 'A patient must have a phone number'],
        validate: [validator.isMobilePhone, 'Please provide a valid phone number']
    },
    medicalHistory: {
        type: String,
        required: [true, 'A patient must have a medical history'],
    },
    heartDisease:{
        type: Boolean,
        default: false,
        required: [true, 'A patiernt must have a heart disease discreption']
    },
    diabetes:{
        type: Boolean,
        default: false,
        required: [true, 'A patiernt must have a diabetes discreption']
    },
    anySurgeries :{
        type: Boolean,
        default: false,
        required: [true, 'A patiernt must have a surgeries discreption']
    },
    eyeHealthHistory: {
        type: String,
        default: '',
        required: [true, 'A patient must have an eye health history'],
    },
    password :{
        type: String,
        required: [true,'A patient must have a password'],
        minlength: [8, 'A patient password must have more or equal then 8 characters'],
        select: false
    },
    confirmPassword:{
        type:String ,
        required: [true,'A patient must have a password'],
        validate :{
            validator:function(value){
            return value == this.password
        },
        message: 'Passwords are not the same'
    },
        select: false
    }
});

const Patient = mongoose.model('Patient', patientscheme);
patientscheme.pre('save', async function (next) {
if(!this.isModified('password')) return next();
 this.password = await bcrypt.hash(this.password, 12);
 this.confirmPassword = undefined;
 next();
});

// async function saveTestPatient() {
//     try {
//         const testPatient = new Patient({
//             name: 'Hazem Zakaria',
//             age: 22,
//             email: 'zhazem2@gmail.com',
//             address: 'Cairo',
//             phoneNumber: '01000000000',
//             medicalHistory: 'Healthy'
//         });
//         const savedPatient = await testPatient.save();
//         console.log('Patient saved successfully:', savedPatient);
//     } catch (error) {
//         console.error('Error saving patient:', error);
//     }
// }

// Call the function
// saveTestPatient();

module.exports = Patient;
 