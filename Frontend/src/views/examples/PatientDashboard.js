import React from "react";
import { Container, Row, Col } from "reactstrap";
import Header from "../../components/Headers/Header.js";
import Sidebar from "../../components/Sidebar/Sidebar";
import AppointmentCreate from "./AppointmentCreate.js";
import PatientPortalHeader from "../../components/Headers/PatientPortalHeader";
import AdminNavbar from "../../components/Navbars/AdminNavbar";

const PatientDashboard = () => {
  return (
    <>
      <div className="main-content">
        <Sidebar />
        <AdminNavbar brandText="Patient Dashboard" /> {/* Add AdminNavbar here */}
        <PatientPortalHeader />
        <Container className="mt--7" fluid>
          <Row>
            <Col className="mb-5 mb-xl-0" xl="8">
              <AppointmentCreate />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default PatientDashboard;
