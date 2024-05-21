const mongoose = require("mongoose");
const validator = require("validator");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const shortid = require("shortid");
const patientscheme = new mongoose.Schema({
  _id: {
    type: String,
    default: () => {
      const fullUuid = uuidv4();
      return fullUuid.split("-").pop(); // Returns only the last segment of the UUID
    },
  },
  name: {
    type: String,
    required: [true, "A user must have a name"],
    maxlength: [20, "A user name must have less or equal than 20 characters"],
    minlength: [5, "A user name must have more or equal than 10 characters"],
    validate: {
      validator: function (val) {
        return validator.isAlpha(val.split(" ").join(""));
      },
      message: "A patient name must only contain characters",
    },
  },
  username: {
    type: String,
    required: [true, "A user must have a username"],
    unique: true,
    maxlength: [20, "A user name must have less or equal than 20 characters"],
    minlength: [5, "A user name must have more or equal than 10 characters"],
    validate: {
      validator: function (val) {
        return validator.isAlphanumeric(val);
      },
      message: "A patient username must only contain characters and numbers",
    },
  },
  age: {
    type: Number,
    required: [true, "A patient must have an age"],
    validate: {
      validator: function (age) {
        return age > 0;
      },
    },
  },
  doctorName: {
    type: String,
    required: [true, "A patient must have a doctor name"],
  },
  email: {
    type: String,
    required: [true, "A patient must have an email"],
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  address: {
    type: String,
    required: [true, "A patient must have an address"],
  },
  phoneNumber: {
    type: String,
    required: [true, "A patient must have a phone number"],
    validate: [validator.isMobilePhone, "Please provide a valid phone number"],
  },
  medicalHistory: {
    type: String,
    required: [true, "A patient must have a medical history"],
  },
  heartDisease: {
    type: Boolean,
    default: false,
    required: [true, "A patiernt must have a heart disease discreption"],
  },
  diabetes: {
    type: Boolean,
    default: false,
    required: [true, "A patiernt must have a diabetes discreption"],
  },
  anySurgeries: {
    type: Boolean,
    default: false,
    required: [true, "A patiernt must have a surgeries discreption"],
  },
  eyeHealthHistory: {
    type: String,
    default: "",
    required: [true, "A patient must have an eye health history"],
  },
  sex: {
    type: String,
    required: [true, "A patient must specify their sex"],
    enum: {
      values: ["Male", "Female", "Other"],
      message: "Sex must be either Male, Female, or Other",
    },
  },
  password: {
    type: String,
    required: [true, "A patient must have a password"],
    minlength: [
      8,
      "A patient password must have more or equal then 8 characters",
    ],
  },
  confirmPassword: {
    type: String,
    required: [true, "A patient must have a password"],
    validate: {
      validator: function (value) {
        return value == this.password;
      },
      message: "Passwords are not the same",
    },
  },
});

const Patient = mongoose.model("Patient", patientscheme);

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
