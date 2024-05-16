/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import React, { useState, useEffect } from "react";
import axios from "axios";



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
    Col,
  } from "reactstrap";
  // core components
//   import UserHeader from "components/Headers/UserHeader.js";
  import DoctorCreateHeader from "components/Headers/DoctorCreateHeader";
  const DoctorSeeProfile = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [birthday, setBirthday] = useState("");

    const url = window.location.href;
    const id = url.substring(url.lastIndexOf('/') + 1);
    console.log("id: ",id); // This will log the id passed in the URL

    useEffect(() => {
      populateData();
    }, []);

    
    const populateData = async ()=>{
      const back_url = `http://localhost:5001/api/doctors/${id}`
      const response = await axios.get(back_url);
      console.log("email:  ",response.data.email)
      setFirstName(response.data.firstName)
      setLastName(response.data.lastName)
      setEmail(response.data.email)
      setPassword(response.data.password)
      setPhone(response.data.phone)
      setAddress(response.data.address)
      setSpecialization(response.data.specialization)
      setBirthday(response.data.birthday)
    }
    

    

    const handleEdit = async () => {
        try{
            const url = `http://localhost:5001/api/doctors/${id}`; // Backend API endpoint
            const data = {
                email: email,
                password: password,
                firstName: firstname,
                lastName: lastname,
                address:address,
                phone: phone,
                specialization: specialization,
                birthday: birthday,
            };
            // Send POST request to the backend API
            const response = await axios.put(url, data);

            

            // Handle the response
            console.log("updated Successfully:", response.data);
            window.alert("updated Successfully");
            window.location.href = "http://localhost:3000/admin/Doctorslist";
        }catch (error) {
            // Handle errors
            // console.error("Wrong Credentials", error.message);
            console.log("All fields are required")
            window.alert("All fields are required");
          }
    };



    return (
      <>
        <DoctorCreateHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              {/*  */}
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">My account</h3>
                    </Col>

                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Doctor information
                    </h6>
                    <div className="pl-lg-4">
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
                              id="input-firstname"
                              placeholder="First name"
                              type="text"
                              value={firstname}
                              // value={"khaledddd"}
                              onChange={(e) => setFirstName(e.target.value)}
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
                              id="input-lastname"
                              placeholder="Last name"
                              type="text"
                              value={lastname}
                              onChange={(e) => setLastName(e.target.value)}
                            />
                          </FormGroup>

                        </Col>
                      </Row>
                      <Row>
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
                              placeholder="name@example.com"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                        <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-password"
                            >
                              Password
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-password"
                              placeholder="******"
                              type="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
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
                              id="input-address"
                              placeholder="Home Address"
                              type="text"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-phone"
                            >
                              Phone
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-phone"
                              placeholder="+20"
                              type="text"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Specialization and bday */}
                    <h6 className="heading-small text-muted mb-4">Extra Information</h6>
                    <div className="pl-lg-4">
                      <FormGroup>
                        <Row>
                        <Col lg="6">
                        <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-specialization"
                            >
                              Specialization
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-specialization"
                              placeholder="Specialization"
                              type="text"
                              value={specialization}
                              onChange={(e) => setSpecialization(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
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
                              placeholder="Birthday"
                              type="text"
                              value={birthday}
                              onChange={(e) => setBirthday(e.target.value)}
                            />
                          </FormGroup>

                        </Col>
                      </Row>
                      <Row>
                      <Col className="text-right" xs="12">
                      <Button
                        color="primary"
                        // href="/admin/Doctorslist"  //8aleban hane7tagha te7arakna le el next page
                        onClick={handleEdit}
                        size="l"
                      >
                        Save
                      </Button>

                       <Button
                        color="primary"
                        href="/admin/Doctorslist"  //8aleban hane7tagha te7arakna le el next page
                        size="l"
                      >
                        Cancel
                      </Button>

                    </Col>
                      </Row>
                      </FormGroup>
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

  export default DoctorSeeProfile;
