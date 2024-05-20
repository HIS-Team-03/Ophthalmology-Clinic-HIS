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
const appointmentRouter = require('./routes/appointmentRoutes');
const serviceRouter = require('./routes/serviceRoutes');

app.use('/api/v1/patients', patientRouter);
app.use('/api/v1/appointments', appointmentRouter);  
app.use('/api/v1/services', serviceRouter);  
app.use(errorDealer)

app.listen(port,()=>{
    console.log("server sha8al ya ");
})
