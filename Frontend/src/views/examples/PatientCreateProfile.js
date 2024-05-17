import React from 'react';
import PatientCreateHeader from "../../components/Headers/PatientCreateHeader";
import {useState,useEffect} from "react";
import {useParams} from "react-router-dom";
import {Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Row} from "reactstrap";
import './PatientProfile.css';


import axios from "axios";


// TODO : Add the following fields to the form and handle the submission of the form to create a new patient
 // 1. add file upload
// 2. add a field for the doctor name
// 3. add show password button

const PatientCreateProfile = ( {type="Create"}) => {

    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [birthday, setBirthday] = useState("");
    const [medicalHistory, setMedicalHistory] = useState(""); // initial value is empty string
    const [heartDisease, setHeartDisease] = useState(false); // initial value is false
    const [diabetes, setDiabetes] = useState(false);
    const [anySurgeries, setAnySurgeries] = useState(false);
    const [eyeHealthHistory, setEyeHealthHistory] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [gender, setGender] = useState('');


    const [patientData, setPatientData] = useState({});
    const [initialData, setInitialData] = useState({});
    const { Patient_id } = useParams();
    const { id } = useParams();

    console.log(Patient_id);

    useEffect(() => {
        if (type === "Update") {
            fetchPatientData();
        }
    }, [type]);

    const fetchPatientData = async () => {
        try {
            const response = await fetch(`http://localhost:5001/api/v1/patients/${Patient_id}`);
            const data = await response.json();
            setPatientData(data);
            setInitialData(data); // Keep a copy of the initial data
        } catch (error) {
            console.error("Failed to fetch patient data", error);
        }
    };

    useEffect(() => {
        if (type === "Update" && patientData) {
            setFirstName(patientData.firstname || "");
            setLastName(patientData.lastname || "");
            setUsername(patientData.username || "");
            setEmail(patientData.email || "");
            setPassword(""); // Do not pre-fill password fields
            setConfirmPassword("");
            setAddress(patientData.address || "");
            setPhone(patientData.phone || "");
            setBirthday(patientData.birthday || "");
            setMedicalHistory(patientData.medicalHistory || "");
            setHeartDisease(patientData.heartDisease || false);
            setDiabetes(patientData.diabetes || false);
            setAnySurgeries(patientData.anySurgeries || false);
            setEyeHealthHistory(patientData.eyeHealthHistory || "");
            setGender(patientData.gender || "");
        }
    }, [patientData, type]);







    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const resetForm = () => {
        setFirstName("");
        setLastName("");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setAddress("");
        setPhone("");
        setBirthday("");
        setMedicalHistory("");
        setHeartDisease(false);
        setDiabetes(false);
        setAnySurgeries(false);
        setEyeHealthHistory("");
        setGender("");
    }
    function calculateAge(birthday) {
        const birthDate = new Date(birthday);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }


    const handleCreatePatient = async () => {
        const age = calculateAge(birthday);
        const name = `${firstname} ${lastname}`;


        // Validate form inputs
        if (!name || !username || !age || !email || !address || !phone || !password || !confirmPassword) {
            // Provide user feedback for invalid inputs
            window.alert("Please fill in all required fields.");
            return;
        }
        if (password !== confirmPassword) {
            // Provide user feedback for invalid inputs
            window.alert("Passwords do not match.");
            return;
        }
        {console.log(gender)}


        try {
            const response = await fetch('http://localhost:5001/api/v1/patients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    username,
                    age,
                    email,
                    address,
                    phoneNumber: phone,
                    medicalHistory,
                    heartDisease,
                    diabetes,
                    anySurgeries,
                    eyeHealthHistory,
                    password,
                    confirmPassword,
                    sex:gender,
                    doctorName: "Dr. Ahmed",
                }),
            });
            const responseData = await response.json();
            // if(response.data.email_exists === "true"){
            //     window.alert("Email already exists. Please use a different email.");
            //     return;
            // }
            // if(response.data.username_exists === "true"){
            //     window.alert("Username already exists. Please use a different username.");
            //     return;
            // }
            console.log(responseData);
            if (response.data.status === "success"){
                window.alert("Patient created successfully.");
            }
            else {
                window.alert("Failed to create patient.");
            }
            // resetForm();
        } catch (error) {
            console.log(error);
            window.alert("Failed to create patient.");
        }
    }

    const handleUpdatePatient = async () => {
        const age = calculateAge(birthday);
        const name = `${firstname} ${lastname}`;

        // Validate form inputs
        if (password !== confirmPassword) {
            window.alert("Passwords do not match.");
            return;
        }

        // Collect only changed fields
        const updatedFields = {};
        if (firstname !== initialData.firstname) updatedFields.firstname = firstname;
        if (lastname !== initialData.lastname) updatedFields.lastname = lastname;
        if (username !== initialData.username) updatedFields.username = username;
        if (email !== initialData.email) updatedFields.email = email;
        if (address !== initialData.address) updatedFields.address = address;
        if (phone !== initialData.phone) updatedFields.phoneNumber = phone;
        if (birthday !== initialData.birthday) updatedFields.age = birthday;
        if (medicalHistory !== initialData.medicalHistory) updatedFields.medicalHistory = medicalHistory;
        if (heartDisease !== initialData.heartDisease) updatedFields.heartDisease = heartDisease;
        if (diabetes !== initialData.diabetes) updatedFields.diabetes = diabetes;
        if (anySurgeries !== initialData.anySurgeries) updatedFields.anySurgeries = anySurgeries;
        if (eyeHealthHistory !== initialData.eyeHealthHistory) updatedFields.eyeHealthHistory = eyeHealthHistory;
        if (gender !== initialData.sex) updatedFields.sex = gender;
        if (password) updatedFields.password = password;
        console.log(updatedFields);

        try {
            const response = await fetch(`http://localhost:5001/api/v1/patients/${Patient_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({

                    phoneNumber: updatedFields.phoneNumber
                }
                ),
            });
            const responseData = await response.json();


            console.log(responseData);
            window.alert("Patient updated successfully.");
            resetForm();
        } catch (error) {
            console.log(error);
            window.alert("Failed to update patient.");
        }
    };


    return (
      <>
        <PatientCreateHeader />
        {/* Page content */}
        <Container className="mt--7 " fluid >
          <Row>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Patient Registration</h3>
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
                            <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                            >
                              First name
                            </label>
                            <Input
                                className="form-control-alternative"
                                defaultValue="First name"
                                id="input-first-name"
                                placeholder="First name"
                                type="text"
                                value={firstname}
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
                                defaultValue="Last Name"
                                id="input-last-name"
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
                                htmlFor="input-username"
                            >
                              Username
                            </label>
                            <Input
                                className="form-control-alternative"
                                defaultValue="abdalla_ahmed"
                                id="input-username"
                                placeholder="Username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
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
                                placeholder="abdallah@example.com"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                            <FormGroup>
                                <label
                                    className="form-control-label"
                                    htmlFor="input-password"
                                >
                                    Password
                                </label>
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-password"
                                        placeholder="*********"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        style={{flex: 1}}
                                    />
                                </div>
                            </FormGroup>
                        </Col>
                          <Col lg="6">
                              <FormGroup>
                                  <label
                                      className="form-control-label"
                                      htmlFor="input-confirm-password"
                                  >
                                      Confirm Password
                                  </label>
                                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                      <Input
                                          className="form-control-alternative"
                                          id="input-confirm-password"
                                          placeholder="*********"
                                          type={showPassword ? "text" : "password"}
                                          value={confirmPassword}
                                          onChange={(e) => setConfirmPassword(e.target.value)}
                                      />
                                      <Button onClick={toggleShowPassword} size="sm" style={{marginLeft: '10px'}}>
                                          {showPassword ? "Hide Password" : "Show Password"}
                                      </Button>
                                  </div>
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
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                            <Col lg="6">
                                <FormGroup>
                                    <label className="form-control-label" htmlFor="Gender">
                                        Gender
                                    </label>
                                    <Input type="select" name="Gender" id="Gender" onChange={(e) => setGender(e.target.value)}>
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </Input>
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
                                defaultValue="160 Skyo street, Sheikh Zayed, Giza, Egypt"
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
                                  htmlFor="input-phone-number"
                              >
                                  Phone Number
                              </label>
                              <Input
                                  className="form-control-alternative"
                                  id="input-phone-number"
                                  placeholder="+20"
                                  type="tel"
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
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
                                placeholder="Enter your medical history"
                                rows="4"
                                type="textarea"
                                value={medicalHistory}
                                onChange={(e) => setMedicalHistory(e.target.value)}
                            />
                          </FormGroup>
                          </Col>
                      </Row>
                      <Row>
                          <Col lg="6">
                              <FormGroup>
                                  <label
                                      className="form-control-label"
                                      htmlFor="input-heart-disease"
                                  >
                                      Heart Disease
                                  </label>
                                  <Input
                                      className="form-control-alternative"
                                      id="input-checkboxes"
                                      placeholder="Heart Disease"
                                      type="checkbox"
                                      checked={heartDisease}
                                      onChange={(e) => setHeartDisease(e.target.checked)}
                                  />
                              </FormGroup>
                            </Col>
                            <Col lg="6">
                                  <FormGroup>
                                      <label
                                          className="form-control-label"
                                          htmlFor="input-diabetes"
                                      >
                                          Diabetes
                                      </label>
                                      <Input
                                          className="form-control-alternative"
                                          id="input-checkboxes"
                                          placeholder="Diabetes"
                                          type="checkbox"
                                          checked={diabetes}
                                          onChange={(e) => setDiabetes(e.target.checked)}
                                      />
                                  </FormGroup>
                            </Col>
                      </Row>
                        <Row>

                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-eye-health-history"
                                    >
                                        Eye Health History
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-eye-health-history"
                                        placeholder="Eye Health History"
                                        type="text"
                                        value={eyeHealthHistory}
                                        onChange={(e) => setEyeHealthHistory(e.target.value)}
                                    />
                                </FormGroup>
                            </Col>

                            <Col lg="6">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-any-surgeries"
                                    >
                                        Any Surgeries
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        id="input-any-surgeries"
                                        placeholder="Any Surgeries"
                                        type="text"
                                        checked={anySurgeries}
                                        onChange={(e) => setAnySurgeries(e.target.checked)}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-right" xs="12">
                                <Button
                                    color="primary"
                                    size="l"
                                    onClick={type === "Create"? handleCreatePatient : handleUpdatePatient}
                                >
                                    {type === "Create"? "Create Patient" : "Update Patient"}
                                </Button>
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

export default PatientCreateProfile;

