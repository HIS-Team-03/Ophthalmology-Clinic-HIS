import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardBody, CardTitle, Container, Row, Col, Form, FormGroup, InputGroupAddon, InputGroupText, Input, InputGroup } from "reactstrap";

const AppTableHeader = () => {
  const [totalAppointments, setTotalAppointments] = useState(0);

  useEffect(() => {
    const fetchTotalAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/v1/appointments');
        const appointmentCount = response.data.data.appointments.length;
        setTotalAppointments(appointmentCount);
      } catch (error) {
        console.error('Error fetching total appointments:', error);
      }
    };

    fetchTotalAppointments();
  }, []);

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                            Total Appointments
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{totalAppointments}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
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

export default AppTableHeader;
