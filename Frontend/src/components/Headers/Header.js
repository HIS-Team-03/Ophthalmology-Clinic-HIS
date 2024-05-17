import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const Header = () => {
  const [totalPatients, setTotalPatients] = useState(0);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientsRes = await axios.get('http://localhost:5001/api/v1/patients');
        console.log("Patients:", patientsRes.data.data.patients);
        setTotalPatients(patientsRes.data.data.patients.length);
  
        const doctorsRes = await axios.get('http://localhost:5001/api/v1/doctors');
        console.log("Doctors:", doctorsRes.data.data.doctors);
        setTotalDoctors(doctorsRes.data.data.doctors.length);
  
        const appointmentsRes = await axios.get('http://localhost:5001/api/v1/appointments');
        console.log("Appointments:", appointmentsRes.data.data.appointments);
        setTotalAppointments(appointmentsRes.data.data.appointments.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            <Row>
              <Col lg="4" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                          Total Patients
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{totalPatients}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="4" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                          Total Doctors
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{totalDoctors}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-user-md" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="4" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                          Total Appointments
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{totalAppointments}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-calendar-check" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
