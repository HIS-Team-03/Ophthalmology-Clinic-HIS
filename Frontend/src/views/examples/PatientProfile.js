import React from 'react';
import UserHeader from "../../components/Headers/UserHeader";
import {useState} from "react";
import {Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Row} from "reactstrap";
import './PatientProfile.css';
const PatientProfile = () => {
  const [heartDisease, setHeartDisease] = useState(false); // initial value is false

  return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">My account</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button
                          color="primary"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          size="sm"
                      >
                        Settings
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                                className="form-control-label"
                                htmlFor="input-username"
                            >
                              Username
                            </label>
                            <Input
                                className="form-control-alternative"
                                defaultValue="lucky.jesse"
                                id="input-username"
                                placeholder="Username"
                                type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                                className="form-control-label"
                                htmlFor="input-email"
                            >
                              Email address
                            </label>
                            <Input
                                className="form-control-alternative"
                                id="input-email"
                                placeholder="jesse@example.com"
                                type="email"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                            >
                              First name
                            </label>
                            <Input
                                className="form-control-alternative"
                                defaultValue="Lucky"
                                id="input-first-name"
                                placeholder="First name"
                                type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                            >
                              Last name
                            </label>
                            <Input
                                className="form-control-alternative"
                                defaultValue="Jesse"
                                id="input-last-name"
                                placeholder="Last name"
                                type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                                className="form-control-label"
                                htmlFor="input-birthday"
                            >
                              Birthday
                            </label>
                            <Input
                                className="form-control-alternative"
                                id="input-birthday"
                                type="date"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <h6 className="heading-small text-muted mb-4">
                      Contact information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label
                                className="form-control-label"
                                htmlFor="input-address"
                            >
                              Address
                            </label>
                            <Input
                                className="form-control-alternative"
                                defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                                id="input-address"
                                placeholder="Home Address"
                                type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                                className="form-control-label"
                                htmlFor="input-city"
                            >
                              City
                            </label>
                            <Input
                                className="form-control-alternative"
                                defaultValue="New York"
                                id="input-city"
                                placeholder="City"
                                type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                                className="form-control-label"
                                htmlFor="input-country"
                            >
                              Country
                            </label>
                            <Input
                                className="form-control-alternative"
                                defaultValue="United States"
                                id="input-country"
                                placeholder="Country"
                                type="text"
                            />
                          </FormGroup>
                        </Col>

                          <Col lg="6">
                              <FormGroup>
                              <label
                                  className="form-control-label"
                                  htmlFor="input-phone-number"
                              >
                                  Phone Number
                              </label>
                              <Input
                                  className="form-control-alternative"
                                  id="input-phone-number"
                                  placeholder="Phone Number"
                                  type="tel"
                              />
                              </FormGroup>
                          </Col>

                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Description */}
                    <h6 className="heading-small text-muted mb-4">Health Records</h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label>Medical Record</label>
                            <Input
                                className="form-control-alternative"
                                placeholder="A few words about you ..."
                                rows="4"
                                defaultValue="A beautiful Dashboard for Bootstrap 4. It is Free and
                            Open Source."
                                type="textarea"
                            />
                          </FormGroup>
                          </Col>
                      </Row>
                      <Row>
                          <Col lg="12">
                              <FormGroup>
                                  <label
                                      className="form-control-label"
                                      htmlFor="input-heart-disease"
                                  >
                                      Heart Disease
                                  </label>
                                  <Input
                                      className="form-control-alternative"
                                      id="input-heart-disease"
                                      placeholder="Heart Disease"
                                      type="checkbox"
                                      onChange={(e) => setHeartDisease(e.target.checked)}
                                  />
                              </FormGroup>
                            </Col>

                      </Row>
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

export default PatientProfile;

