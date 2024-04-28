const Patient = require('../models/patientModel');

exports.getAllPatients = async (req, res, next) => {
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
    const newpatient = await Patient.create(req.body);
    res.status(201).json({
        status : 'success',
        data:{
             newpatient
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

exports.updatePatient = async (req, res, next) => {
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