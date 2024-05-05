const Patient = require('../models/patientModel');
const sendEmail = require('../utilits/mailer');
exports.getAllPatients = async (req, res, next) => {
    console.log("get all patients");
    const patients = await Patient.find();
    res.status(200).json({
        numPatients: patients.length,
        status: 'success',
        data: {
            patients
        }
    });
}
exports.getPatient = async (req, res, next) =>{
    const patient = await Patient.findById(req.params.id);
    if (!patient){
        return res.status(404).json({
        status: 'fail',
        message: 'Patient not found'
    });
}
res.status(200).json({
    status: 'success',
    data:{
    Patient: patient
    }
})
}


exports.createPatient = async (req, res, next) => {
    try{
    const newPatient = await Patient.create(req.body);
    // send username and password to the patient's email
    await sendEmail(newPatient.email, newPatient.name, newPatient.password);
    res.status(201).json({
        status : 'success',
        data:{
             newPatient
            }
    });
    }
    catch(err){
        if (err.name ==='ValidationError'){
            res.status(404).json({
                status : 'fail',
                message: err.message
            })
        }
        else{
            res.status(500).json({
                status : 'fail',
                message : 'serval error: ' + err.message
            })
        }
    }
    };
// 6635bf7f486b6a6c0c808038
exports.updatePatient = async (req, res, next) => {
    console.log("update");

   try {
       const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
           new: true,
           runValidators: true
       });
       if (!patient) {
           return res.status(404).json({
               status: 'fail',
               message: 'Patient not found'
           });
       }
       res.status(200).json({
           status: 'success',
           data: {
               patient
           }
       });
   } catch(err){
         res.status(500).json({
              status: 'fail',
              message: err.message
         });
   }

};

exports.deletePatient = async (req, res ,next) => {
    try {
        await Patient.findByIdAndDelete(req.params.id, req.body);
        res.status(204).json({
            status: 'success',
            data: null
        });
    }catch (err){
        res.status(400).json({
                status: 'error',
                message: err.message
            })
        ``
        }
}

