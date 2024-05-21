const Patient = require("../models/patientModel");
const sendEmail = require("../utilits/mailer");
// Modify this function to handle both all patients and filtered search
exports.getAllPatients = async (req, res, next) => {
  try {
    console.log("Query parameter:", req.query.name); // Log the query parameter
    if (req.query.name) {
      const searchQuery = req.query.name;
      const regex = new RegExp(searchQuery, "i"); // Case-insensitive search
      console.log("Regex used:", regex); // Log the regex to be used
      const patients = await Patient.find({ name: { $regex: regex } });
      console.log("Patients found:", patients); // Log the results from the database

      if (patients.length === 0) {
        return res.status(404).json({
          status: "fail",
          message: "No patients found with that name",
        });
      }

      return res.status(200).json({
        numPatients: patients.length,
        status: "success",
        data: {
          patients,
        },
      });
    } else {
      // No query parameter, return all patients
      const patients = await Patient.find();
      res.status(200).json({
        numPatients: patients.length,
        status: "success",
        data: {
          patients,
        },
      });
    }
  } catch (error) {
    console.error("Error during database query:", error); // Log any errors caught
    res.status(500).json({
      status: "error",
      message: "Server error",
      error: error.message,
    });
  }
};

exports.getPatient = async (req, res, next) => {
  const patient = await Patient.findById(req.params.id);
  if (!patient) {
    return res.status(404).json({
      status: "fail",
      message: "Patient not found",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      Patient: patient,
    },
  });
};

exports.createPatient = async (req, res, next) => {
  try {
    const newPatient = await Patient.create(req.body);
    const { email, username, password, name } = newPatient;

    // check if the email is already exist
    console.log("checkinggg email");
    console.log("newPatient");
    console.log("email", email);
    await sendEmail(email, username, password, name);
    console.log("email sent");

    res.status(201).json({
      status: "success",
      data: {
        newPatient,
      },
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(404).json({
        status: "fail",
        message: err.message,
      });
    } else {
      res.status(500).json({
        status: "fail",
        message: "serval error: " + err.message,
      });
    }
  }
};
// 6635bf7f486b6a6c0c808038
exports.updatePatient = async (req, res, next) => {
  console.log("update");

  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!patient) {
      return res.status(404).json({
        status: "fail",
        message: "Patient not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        patient,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deletePatient = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({
        status: "fail",
        message: "No patient found with that ID",
      });
    }
    await Patient.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Server error: " + err.message,
    });
  }
};
