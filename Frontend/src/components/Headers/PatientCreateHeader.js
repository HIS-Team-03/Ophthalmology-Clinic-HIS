import React from 'react';
import PatientCreateProfile from "../../views/examples/PatientCreateProfile";
import {
    Card,
    CardBody,
    CardTitle,
    Col,
    Container,
    Form,
    FormGroup, Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Row
} from "reactstrap";

const PatientCreateHeader = () => {
  return (
      <>
          <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
              <Container fluid>
                  <div className="header-body">

                  </div>
              </Container>
          </div>
      </>
  );
};

export default PatientCreateHeader;

