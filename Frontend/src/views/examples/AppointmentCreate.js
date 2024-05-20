import React, { useState,useEffect } from 'react';
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import AppHeader from "components/Headers/AppHeader.js";
//lesa 3yzen nzwd en a7na na5od mn patient id w nt2kd eno mwgod fe dataset
//w en id dr yb2 3la 7sb service 
//w en payment tb2 3la 7sb service

const AppProfile = () => {
  const location = useLocation();

  const [selectedDate, setSelectedDate] = useState(null);
  const [patientId, setPatientId] = useState("");
  const [doctorId, setDoctorId] = useState("4");
  const [time, setTime] = useState(""); 
  const [serviceId, setServiceId] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [status, setStatus] = useState("pending");
  const [isUpdate, setIsUpdate] = useState(false);
  const [appointmentId, setAppointmentId] = useState(null);
  const [services, setServices] = useState([]);
  const [doctors, setDoctors] = useState([]);
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
  // useEffect(() => {
  //   if (location.state && location.state.appointmentId) {
  //     const appointmentId = location.state.appointmentId;
  //     setAppointmentId(appointmentId);
  //     const fetchAppointment = async () => {
  //       try {
  //         const response = await axios.get(`http://localhost:5001/api/v1/appointments/${appointmentId}`);
  //         const appointmentData = response.data.data.appointment;
  //         setSelectedDate(new Date(appointmentData.date));
  //         setPatientId(appointmentData.patientId);
  //         setDoctorId(appointmentData.doctorId);
  //         setTime(appointmentData.time);
  //         setServiceId(appointmentData.serviceId);
  //         setPaymentAmount(appointmentData.payment.amount.toString());
  //         setStatus(appointmentData.status);
  //         setIsUpdate(true);

  //       } catch (error) {
  //         console.error('Error fetching appointment:', error);
  //       }
  //     };
  //     fetchAppointment();
  //   }
  // }, [location.state]);

  const handleServiceSelect = (e) => {
    const selectedServiceId = e.target.value;
    setServiceId(selectedServiceId);
    // Find the selected service and set the payment amount accordingly
    const selectedService = services.find(service => service._id === selectedServiceId);
    if (selectedService) {
      setPaymentAmount(selectedService.payment.amount.toString());
      setDoctors(selectedService.doctors);
    }
  };

  const handleBooking = async () => {
    try {
      if (!selectedDate || !patientId || !doctorId || !time || !serviceId || !paymentAmount) {
        console.error('Please fill all fields');
        alert('Please fill all fields');
        return;
      }

      // Format the selected date as "YYYY-MM-DD"
      const formattedDate = selectedDate.toISOString().split('T')[0];

      // Check if there's already an appointment with the same date, time, and service
      const existingAppointmentsResponse = await axios.get('http://localhost:5001/api/v1/appointments');
      const existingAppointments = existingAppointmentsResponse.data.data.appointments;
      const conflictingAppointment = existingAppointments.find(appointment => {
        return appointment.serviceId === serviceId && appointment.time === time && appointment.date === formattedDate;
      });

      if (conflictingAppointment) {
        // There's a conflicting appointment
        alert('This time slot is already reserved. Please choose another time.');
        return;
      }

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

      if (isUpdate) {
        // Update the existing appointment
        const updateResponse = await axios.put(`http://localhost:5001/api/v1/appointments/${appointmentId}`, appointmentData);
        console.log('Appointment updated successfully:', updateResponse.data);
        alert('Appointment updated successfully');
      } else {
        // Create a new appointment
        const bookingResponse = await axios.post('http://localhost:5001/api/v1/appointments', appointmentData);
        console.log('Appointment booked successfully:', bookingResponse.data);
        alert('Appointment booked successfully');
      }

    } catch (error) {
      console.error('Error booking/updating appointment:', error.response.data);
      alert('Error booking/updating appointment');
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
                    <h3 className="mb-0">Appointment Scheduling</h3>
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
                          <label className="form-control-label" htmlFor="input-username">
                            Patient Id
                          </label>
                          <Input
                            className="form-control-alternative"
                            value={patientId}
                            onChange={(e) => setPatientId(e.target.value)}
                            placeholder="Patient ID"
                            type="text"
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
                            value={serviceId}
                            onChange={handleServiceSelect} // Call handleServiceSelect when service is selected
                          >
                            <option>Select a service</option>
                            {services.map(service => (
                              <option key={service._id} value={service._id}>{service.serviceName}</option>
                            ))}
                          </Input>
                        </FormGroup>
                        {/* <FormGroup>
                          <label>Doctor</label>
                          <Input
                            type="select"
                            className="form-control-alternative"
                            value={doctorId}
                            onChange={(e) => setDoctorId(e.target.value)}
                          >
                            <option>Select a doctor</option>
                            {doctors.map(doctor => (
                              <option key={doctor._id} value={doctor._id}>{doctor.first} {doctor.lastName}</option>
                            ))}
                          </Input>
                        </FormGroup> */}
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
                    <Link to={{
                                  pathname: '/admin/Appointments'
                                }}>
                    <Button
                      color="primary"
                      onClick={handleBooking}
                      size="lg"
                      className="float-right"
                    >
                      {isUpdate ? 'Update' : 'Book'}
                    </Button>
                    </Link>
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
