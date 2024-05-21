import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const PatientPortalHeader = ({pt_id}) => {
    console.log("pt_idd",pt_id)
    let patient_id = pt_id['*']

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>

 <div className="header-body" style={{ marginTop: '20px' }}>
      <a href="/patient-dashboard"
         style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px',
          fontSize: '16px',
          fontWeight: 'bold',
          marginRight: '10px'
        }}>
        Create Appointment
      </a>

      <a href={`/patient-PortalEMR/${patient_id}`}
         style={{
          padding: '10px 20px',
          // backgroundColor: '#28a745',
          backgroundColor: '#007bff',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '5px',
          fontSize: '16px',
          fontWeight: 'bold'
        }}>
        View Medical Records
      </a>
    </div>

        </Container>
      </div>
    </>
  );
};

export default PatientPortalHeader;
