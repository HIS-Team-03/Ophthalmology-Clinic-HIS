
const asyncHandler = require("express-async-handler");
const DoctorModel = require("../models/doctorModel");



//@desc get all doctors
//@route GET /api/doctors
//@access public

const getDoctors = asyncHandler( async (req,res)=>{

    const doctors = await DoctorModel.find();
     res.status(200).json(doctors);
})


//@desc create new doctors
//@route POST /api/doctors
//@access public
const createDoctor = asyncHandler( async(req,res)=>{
    console.log("the request body is ", req.body );

    const { firstName, lastName , email, phone, address , specialization, birthday , password } = req.body;
    //edit nw
    const createdDoctor = await DoctorModel.findOne({email});
    if(createdDoctor){
        res.json({"email_exists":"true"})
    }
    //end of edit
    if (!firstName || !lastName || !email || !phone || !address || !specialization || !birthday || !password) {
            res.status(400);
            // res.json({"err message":"all field me7tageenha 3aaaaash" })
            throw new Error("All fields are mandatory !");
        }

    const doctor = await DoctorModel.create({
       firstName, lastName , email, phone, address , specialization, birthday , password
    });

    res.status(201).json({doctor});
})




//@desc get ind doctor
//@route GET /api/doctors/:id
//@access public
const get_one_Doctor = asyncHandler( async (req,res)=>{
    // res.status(200).json({message:`get doctor for ${req.params.id}`})
    const doctor = await DoctorModel.findById(req.params.id);
    if(!doctor){
        res.status(404);
        throw new Error("Doctor not found");
    }

    res.status(200).json(doctor);
} )





//@desc update doctor
//@route PUT /api/doctors/:id
//@access public
const updateDoctor = asyncHandler( async (req,res)=>{
    // res.status(200).json({message:`update doctor for ${req.params.id}`})

    const doctor = await DoctorModel.findById(req.params.id);
    if(!doctor){
        res.status(404);
        throw new Error("Doctor not found");
    }

    const updatedDoctor = await DoctorModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );

    res.status(200).json(updatedDoctor);
})




//@desc delete doctor
//@route DELETE /api/doctors/:id
//@access public
const deleteDoctor = asyncHandler ( async (req,res)=>{
    // res.status(200).json({message:`delete doctor for ${req.params.id}`})
    const doctor = await DoctorModel.findById(req.params.id);
    if(!doctor){
        res.status(404);
        throw new Error("Doctor not found");
    }

    // await DoctorModel.remove();
    await DoctorModel.deleteOne({ _id: req.params.id });
    // await doctor.remove();
    res.status(200).json(doctor);
})



//http://localhost:5001/api/doctors/login
const loginDoctor = asyncHandler(
    async (req , res) =>{
        const {email , password } = req.body;

        if (!email ||  !password){
            res.status(400);
            throw new Error("All fields are mandatory!");
        }

        const doctor = await DoctorModel.findOne({email});
        if (doctor){ // lw l2ena user b nfs el email
            if(password === doctor.password){

                res.status(200).json({"message" : "Correct Password! Enter the dashboard."});

            }
             else{
            res.status(401).json({"message" : "Wrong Credentials"});
            throw new Error("email or password is not valid"); }
        }
        else{
            res.status(401).json({"message" : "Wrong Credentials"});
            throw new Error("email or password is not valid");

        }
    }
);


module.exports ={ getDoctors, createDoctor, get_one_Doctor, updateDoctor, deleteDoctor, loginDoctor }
