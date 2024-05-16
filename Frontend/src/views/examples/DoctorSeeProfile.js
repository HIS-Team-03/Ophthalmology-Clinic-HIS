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
import PatientCreateHeader from "components/Headers/PatientCreateHeader";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Sidebar from "components/Sidebar/Sidebar";
import Footer from "components/Footers/AdminFooter";
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
      {/* <AdminNavbar/> */}
      {/* <Sidebar/> */}
      <PatientCreateHeader />
      <Container className="mt--7 " fluid >
          <Row>
                  <Col className="order-xl-1" xl="8">
                      <Card className="bg-secondary shadow">
                          <CardHeader className="bg-white border-0">
                              <Row className="align-items-center">
                                  <Col xs="8">
                                      <h3 className="mb-0">Doctor Profile</h3>
                                  </Col>
                              </Row>
                          </CardHeader>
                          <CardBody>
                              {/* Personal Information */}
                              <h6 className="heading-small text-muted mb-4">
                                  Doctor Information
                              </h6>
                              <div className="pl-lg-4">
                                  <Row>
                                      <Col lg="6">
                                          <p><strong>First Name:</strong> {firstname}</p>
                                      </Col>
                                      <Col lg="6">
                                      <p><strong>Last Name:</strong> {lastname}</p>
                                      </Col>
                                  </Row>
                                  <Row>
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
                                      <Col lg="6">
                                          <p><strong>Address:</strong> {address}</p>
                                      </Col>
                                      <Col lg="6">
                                          <p><strong>Phone Number:</strong> {phone}</p>
                                      </Col>
                                  </Row>
                              </div>
  
                              {/* Health Records */}
                              <hr className="my-4" />
                              <h6 className="heading-small text-muted mb-4">
                                  Extra information
                              </h6>
                              <div className="pl-lg-4">
                                  <Row>
                                      <Col lg="6">
                                          <p><strong>Specialization:</strong> {specialization}</p>
                                      </Col>
                                      <Col lg="6">
                                          <p><strong>Birthday:</strong> {birthday}</p>
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

  export default DoctorSeeProfile;
