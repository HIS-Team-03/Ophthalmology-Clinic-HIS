import React, { useState } from 'react';
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, Container, Row, Col } from "reactstrap";
import axios from 'axios';
import ServiceHeader from "components/Headers/ServiceHeader.js";

const ServiceCreate = () => {
    const [doctorId, setDoctorId] = useState('');
    const [serviceId, setServiceId] = useState('');
    const [paymentAmount, setPaymentAmount] = useState('');

    const handleAddDoctor = async (e) => {
        e.preventDefault();
        const doctorData = {
            serviceName: serviceId,
            doctorId: doctorId
        };

        try {
            const response = await axios.post('http://localhost:5001/api/v1/services/add-doctor', doctorData);
            console.log('Doctor added:', response.data);
            alert('Doctor added successfully');
        } catch (error) {
            console.error('Error adding doctor:', error);
            alert('Error adding doctor');
        }
    };

    const handleCreateService = async (e) => {
        e.preventDefault();
        const serviceData = {
            serviceName: serviceId,
            doctors: [doctorId], // Initial doctor ID as an array
            payment: {
                amount: paymentAmount
            }
        };

        try {
            const response = await axios.post('http://localhost:5001/api/v1/services', serviceData);
            console.log('Service created:', response.data);
            alert('Service added successfully');
        } catch (error) {
            console.error('Error creating service:', error);
            alert('Error adding service');
        }
    };

    return (
        <>
            <ServiceHeader />
            <Container className="mt--7" fluid>
                <Row>
                    <Col className="order-xl-1" xl="8">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">Add Service</h3>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form onSubmit={handleCreateService}>
                                    <h6 className="heading-small text-muted mb-4">
                                        Doctor information
                                    </h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="input-username">
                                                        Doctor Id
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        value={doctorId}
                                                        onChange={(e) => setDoctorId(e.target.value)}
                                                        placeholder="e.g. doctor1"
                                                        type="text"
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                    </div>
                                    <hr className="my-4" />
                                    <h6 className="heading-small text-muted mb-4">
                                        Service Information
                                    </h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="4">
                                                <FormGroup>
                                                    <label>Service Type</label>
                                                    <Input
                                                        type="select"
                                                        className="form-control-alternative"
                                                        value={serviceId}
                                                        onChange={(e) => setServiceId(e.target.value)}
                                                        required
                                                    >
                                                        <option value="">Select an option</option>
                                                        <option value="Eye Examination">Eye Examination</option>
                                                        <option value="Surgical Services">Surgical Services</option>
                                                        <option value="Diagnostic Testing">Diagnostic Testing</option>
                                                        <option value="Emergency Eye Care">Emergency Eye Care</option>
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
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Button
                                            color="primary"
                                            type="submit"
                                            size="lg"
                                            className="float-right"
                                        >
                                            Create Service
                                        </Button>
                                    </div>
                                </Form>
                                <hr className="my-4" />
                                <Form onSubmit={handleAddDoctor}>
                                    <h6 className="heading-small text-muted mb-4">
                                        Add Doctor to Existing Service
                                    </h6>
                                    <div className="pl-lg-4">
                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="input-service">
                                                        Service Name
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        value={serviceId}
                                                        onChange={(e) => setServiceId(e.target.value)}
                                                        placeholder="Service Name"
                                                        type="text"
                                                        required
                                                    />
                                                </FormGroup>
                                                <FormGroup>
                                                    <label className="form-control-label" htmlFor="input-doctor">
                                                        Doctor Id
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        value={doctorId}
                                                        onChange={(e) => setDoctorId(e.target.value)}
                                                        placeholder="Doctor ID"
                                                        type="text"
                                                        required
                                                    />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Button
                                            color="primary"
                                            type="submit"
                                            size="lg"
                                            className="float-right"
                                        >
                                            Add Doctor
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

export default ServiceCreate;