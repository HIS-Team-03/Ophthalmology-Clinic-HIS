const express = require("express");
const errorDealer = require("./middleware/errorDealer");
const connectDb = require("./config/dbConnection");
const cors = require("cors");
// const errorHandler = require("./middleware/errorhandler");
// const errorDealer = require("./middleware/errorDealer");
const dotenv = require("dotenv").config()
connectDb();
const app = express()
app.use(cors());

const port = process.env.PORT || 5000

app.use(express.json())
app.use('/api/doctors', require("./routes/doctorRoute"))
const patientRouter = require('./routes/patientRoutes');
// const doctorRouter = require('./routes/userRoutes');
const appointmentRouter = require('./routes/appointmentRoutes');

app.use('/api/v1/patients', patientRouter);
// app.use('/api/v1/doctors', doctorRouter);
app.use('/api/v1/appointments', appointmentRouter);   
app.use(errorDealer)

app.listen(port,()=>{
    console.log("server sha8al ya ");
})
