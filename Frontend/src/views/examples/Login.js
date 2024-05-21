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
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Label,
} from "reactstrap";

const Login = () => {

  const [role, setRole] = useState("admin"); // State variable to store selected role
  const navigate = useNavigate(); // Initialize navigate object using useNavigate hook

  // Function to handle role change from dropdown
  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    if(role == "admin"){
    try {
      const url = "http://localhost:5001/api/doctors/login"; // Backend API endpoint
      const data = {
        email: email,
        password: password
      };

      // Send POST request to the backend API
      const response = await axios.post(url, data);

      // Handle the response
      console.log("Login successful:", response.data);
      window.location.href = "http://localhost:3000/admin/index";
      window.alert("Login successful!");
    } catch (error) {
      // Handle errors
      // console.error("Wrong Credentials", error.message);
      console.log("Wrong Email or Password")
      window.alert("Wrong email or password. Please try again.");
    }
  }else {

    try{
    console.log("patint")
    const response = await axios.get("http://localhost:5001/api/v1/patients/")
    // const response = axios.get(url)
    const patients = response.data.data.patients
    const patientWithEmail = patients.find(patient => patient.email === email);
    console.log(patientWithEmail.password)
    if(patientWithEmail.email === password){
      navigate(`/patient-dashboard/${patientWithEmail._id}`);
    }else{
      console.log("Wrong Email or Password")
      window.alert("Wrong email or password. Please try again.");
    }
  }catch(error){
    console.log("Wrong Email or Password")
    window.alert("Wrong email or password. Please try again.");
  }

  }
  };



  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Sign in with credentials</small>
            </div>
            <Form role="form">
            <FormGroup className="mb-3">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-email-83" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Email"
                  type="email"
                  autoComplete="new-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-lock-circle-open" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
                <Label for="roleSelect">Select Role</Label>
                <Input type="select" name="role" id="roleSelect" value={role} onChange={handleRoleChange}>
                  <option value="admin">Admin</option>
                  <option value="patient">Patient</option>
                  {/*<option value="doctor">Doctor</option>*/}
                </Input>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <Button className="my-4" color="primary" type="button" onClick={handleSignIn}>
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;