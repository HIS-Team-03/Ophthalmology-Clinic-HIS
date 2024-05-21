import React from "react";
import {Container, Row, Col, Card, CardHeader, CardBody} from "reactstrap";
import Header from "../../components/Headers/Header.js";
import Sidebar from "../../components/Sidebar/Sidebar";
import AppointmentCreate from "./AppointmentCreate.js";
import PatientPortalHeader from "../../components/Headers/PatientPortalHeader";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import PatientCreateHeader from "../../components/Headers/PatientCreateHeader";
import AdminNavbar from "../../components/Navbars/AdminNavbar";
const PatientPortalMedicalRecord = () => {
  const [patientData, setPatientData] = useState({});


  const id= "cb3b7b6fb172"
  const md_id= useParams()
  // console.log("md_id",md_id['*'])
  let medical_id  = md_id['*']

  useEffect(() => {
    fetchPatient();
  }, []);

  const Prescription = {"Medicine": "Paracetamol", "Dosage": "2 tablets", "Frequency": "3 times a day", "Duration": "5 days"}

  const fetchPatient = async () => {
    const response = await axios.get(`http://localhost:5001/api/v1/patients/${medical_id}`);
    setPatientData(response.data.data.Patient);

  };

  const { name, username, age, medicalHistory,address, phoneNumber,
    heartDisease, diabetes, anySurgeries, eyeHealthHistory, doctorName,sex } = patientData;

  return (
    <>
      <div className="main-content">
        <Sidebar />
        <AdminNavbar brandText="Patient Dashboard" />
        <PatientCreateHeader />
        <Container className="mt--7 " fluid >
          <Row>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">My Profile</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* Personal Information */}
                  <h6 className="heading-small text-muted mb-4">
                    Patient Information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <p><strong>Name:</strong> { name}</p>
                      </Col>
                      <Col lg="6">
                        <p><strong>Username:</strong> {username}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <p><strong>Age:</strong> {age}</p>
                      </Col>
                      <Col lg="6">
                        <p><strong>ID:</strong> {id}</p>
                      </Col>
                      <Col>
                        <p><strong>Gender</strong> {sex}</p>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">
                    Contact Information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <p><strong>Address:</strong> {address}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <p><strong>Phone Number:</strong> {phoneNumber}</p>
                      </Col>
                    </Row>
                  </div>

                  {/* Health Records */}
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">
                    Health Records
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <p><strong>Medical History:</strong> {medicalHistory}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <p><strong>Heart Disease:</strong> {'No'}</p>
                      </Col>
                      <Col lg="6">
                        <p><strong>Diabetes:</strong> {diabetes ? 'Yes' : 'No'}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <p><strong>Eye Health History:</strong> {eyeHealthHistory}</p>
                      </Col>
                      <Col lg="6">
                        <p><strong>Any Surgeries:</strong> {anySurgeries ? 'Yes' : 'No'}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <p><strong>Doctor:</strong> {doctorName}</p>
                      </Col>
                      <Col>
                        <p><strong>Prescription:</strong> {Prescription.Medicine} {Prescription.Dosage} {Prescription.Frequency} {Prescription.Duration}</p>
                      </Col>
                    </Row>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default PatientPortalMedicalRecord;
