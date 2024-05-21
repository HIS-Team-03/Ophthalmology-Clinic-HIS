
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AppHeader from "components/Headers/AppHeader.js";

const AppProfile = () => {
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState(null);
  const [patientId, setPatientId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [time, setTime] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [status, setStatus] = useState("pending");
  const [appointmentId, setAppointmentId] = useState(null);
  const [services, setServices] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [allPatients, setAllPatients] = useState([]);
  let service;

  useEffect(() => {
    const fetchAllPatients = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/v1/patients');
        const patients = response.data.data.patients; // Ensure you're accessing the correct property
        setAllPatients(patients);
        console.log(patients);
      } catch (error) {
        console.error('Error fetching all patients:', error);
      }
    };

    fetchAllPatients();
  }, []);

  useEffect(() => {
    // Fetch the list of available doctors when the component mounts
    const fetchDoctors = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/doctors');
            const doctorsData = response.data;
            setDoctors(doctorsData);
            
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };
    fetchDoctors();
}, []);

  useEffect(() => {
    const fetchServices = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/v1/services');
            const servicesData = response.data.data.services;
            setServices(servicesData);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };
    fetchServices();
}, []);



  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const appointmentIdFromUrl = urlParams.get('appointmentId');
    if (appointmentIdFromUrl) {
      setAppointmentId(appointmentIdFromUrl);
      fetchAppointmentDetails(appointmentIdFromUrl);
    } else {
      console.log("No appointmentId found in URL query parameters");
    }
  }, []);

  const handleServiceSelect = (e) => {
    const selectedServiceId = e.target.value;
    // Find the selected service and set the payment amount accordingly
    const selectedService = services.find(service => service._id === selectedServiceId);
    if (selectedService) {
      const service = selectedService.serviceName; // Define service here
      console.log(service);
      setServiceId(service);
      setPaymentAmount(selectedService.payment.amount.toString());
      // setDoctors(selectedService.doctors);
    }
  };
  

  const fetchAppointmentDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5001/api/v1/appointments/${id}`);
      const appointmentData = response.data.data.appointment;
      setPatientId(appointmentData.patientId);
      setDoctorId("");
      setTime(appointmentData.time);
      setSelectedDate(new Date(appointmentData.date));
      setServiceId(service);
      setPaymentAmount(appointmentData.payment.amount);
      setStatus("pending");
    } catch (error) {
      console.error('Error fetching appointment details:', error);
    }
  };

  const handleSave = async () => {
    try {
      if (!selectedDate || !patientId || !time || !serviceId || !paymentAmount) {
        console.error('Please fill all fields');
        alert('Please fill all fields');
        return;
      }
   // Check if the entered patient's first and last name exist in the database
   let isPatientValid = false;
   for (let i = 0; i < allPatients.length; i++) {
     const { name } = allPatients[i];
     if (name.toLowerCase() === patientId.toLowerCase()) {
       isPatientValid = true;
       break;
     }
   }
   if (!isPatientValid) {
     console.error('Invalid patient name');
     alert('Invalid patient name');
     return;
   }
  
      // Format the selected date as "MM/DD/YYYY"
      const formattedDate = selectedDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
  
      // Update state variables with the new data entered by the user
      const appointmentData = {
        patientId,
        doctorId,
        serviceId,
        date: formattedDate,
        time,
        status,
        payment: {
          amount: paymentAmount
        }
      };
  
      if (appointmentId) {
        // Update existing appointment
        const response = await axios.put(`http://localhost:5001/api/v1/appointments/${appointmentId}`, appointmentData);
        if (response.data.status === 'success') {
          setPaymentAmount(response.data.data.appointment.payment.amount);
          console.log('Appointment updated successfully');
          alert('Appointment updated successfully');
        }
      } else {
        // Create new appointment
        const response = await axios.post('http://localhost:5001/api/v1/appointments', appointmentData);
        if (response.data.status === 'success') {
          console.log('Appointment created successfully');
          alert('Appointment created successfully');
        }
      }
  
      // Reset form fields after successful action
      setPatientId("");
      setTime("");
      setSelectedDate(null);
      setServiceId("");
      setPaymentAmount("");
      setStatus("pending");
    } catch (error) {
      console.error('Error handling appointment:', error);
      alert('Error handling appointment');
    }
  };
  
  
  
  return (
    <>
      <AppHeader />
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">{appointmentId ? 'Update Appointment' : 'Create Appointment'}</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Link to="/admin/CreateAppointment">
                      <Button color="primary">Back</Button>
                    </Link>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Patient information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label" htmlFor="input-patient-id">
                            Patient ID
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={patientId}
                            onChange={(e) => setPatientId(e.target.value)}
                            placeholder="Patient ID"
                            type="text"
                            id="input-patient-id"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">
                    Appointment Information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label>Appointment Time</label>
                          <Input
                            type="select"
                            className="form-control-alternative"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                          >
                            <option>Select an option</option>
                            <option>3 PM</option>
                            <option>4 PM</option>
                            <option>5 PM</option>
                            <option>6 PM</option>
                            <option>7 PM</option>
                            <option>8 PM</option>
                          </Input>
                        </FormGroup>
                        <FormGroup>
                          <label>Appointment Date</label>
                          <br />
                          <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            className="form-control"
                          />
                        </FormGroup>
                        <FormGroup>
                          <label>Service</label>
                          <Input
                            type="select"
                            className="form-control-alternative"
                            value={service}
                            onChange={handleServiceSelect} // Call handleServiceSelect when service is selected
                          >
                            <option>Select a service</option>
                            {services.map(service => (
                              <option key={service._id} value={service._id}>{service.serviceName}</option>
                            ))}
                          </Input>
                        </FormGroup>
                        <FormGroup>
                          <label>Doctor</label>
                          <Input
                            type="select"
                            className="form-control-alternative"
                            value={doctorId}
                            onChange={(e) => setDoctorId(e.target.value)}
                          >
                            <option>Select a doctor</option>
                            {doctors.map(doctor => (
                              <option key={doctor._id} value={`${doctor.firstName} ${doctor.lastName}`}>{doctor.firstName} {doctor.lastName}</option>
                            ))}
                          </Input>
                        </FormGroup>
                        <FormGroup>
                          <label>Payment Amount</label>
                          <Input
                            type="number"
                            className="form-control-alternative"
                            value={paymentAmount}
                            onChange={(e) => setPaymentAmount(e.target.value)}
                            placeholder="Payment Amount"
                            readOnly 
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Button
                      color="primary"
                      onClick={handleSave}
                      size="lg"
                      className="float-right"
                    >
                      {appointmentId ? 'Update' : 'Book'}
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AppProfile;
