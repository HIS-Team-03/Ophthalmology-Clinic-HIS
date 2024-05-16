import React from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import PatientCreateHeader from "../../components/Headers/PatientCreateHeader";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from 'react-router-dom';

const PatientProfile = () => {

    const [patientData, setPatientData] = useState({});
    const { id } = useParams();
    console.log(id);

    useEffect(() => {
        fetchPatient();
    }, []);

    const fetchPatient = async () => {
        const response = await axios.get(`http://localhost:5001/api/v1/patients/${id}`);
        setPatientData(response.data.data.Patient);

    };

    const { name, username, age, email, address, phoneNumber, medicalHistory,
        heartDisease, diabetes, anySurgeries, eyeHealthHistory, doctorName } = patientData;

    return (
    <>
    <PatientCreateHeader />
    <Container className="mt--7 " fluid >
        <Row>
                <Col className="order-xl-1" xl="8">
                    <Card className="bg-secondary shadow">
                        <CardHeader className="bg-white border-0">
                            <Row className="align-items-center">
                                <Col xs="8">
                                    <h3 className="mb-0">Patient Profile</h3>
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
                                        <p><strong>Name:</strong> {name}</p>
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
                                        <p><strong>Email:</strong> {email}</p>
                                    </Col>
                                </Row>
                            </div>

                            {/* Contact Information */}
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
                                        <p><strong>Heart Disease:</strong> {heartDisease ?' Yes' :'No'}</p>
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
                                </Row>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    </>
    );
};

export default PatientProfile;
