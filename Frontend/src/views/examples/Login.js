
import React, { useState } from "react";
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
  Col,
  Label
} from "reactstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const Login = () => {
  const [role, setRole] = useState("admin"); // State variable to store selected role
  const navigate = useNavigate(); // Initialize navigate object using useNavigate hook

  // Function to handle role change from dropdown
  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  // Function to handle form submission (login)
  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    localStorage.setItem("userRole", role); // Set the user role in localStorage

    // Navigate to different dashboard based on role
    if (role === "patient") {
      navigate("/patient-dashboard");
    } else {
      navigate("/admin/index"); // assuming you have an admin dashboard
    }
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Sign in with credentials</small>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form" onSubmit={handleLogin}>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Email" type="text" autoComplete="new-email" />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Password" type="password" autoComplete="new-password" />
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
              <div className="text-center">
                <Button className="mt-4" color="primary" type="submit">
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Login;
