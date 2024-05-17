import React from 'react';
import {
  Card, CardBody, CardTitle, Container, Row, Col, Form, FormGroup, InputGroupAddon, InputGroupText, Input, InputGroup
} from "reactstrap";

const DoctorListHeader = ({ setSearch, searchPatients, totaldoctors }) => {
  const [input, setInput] = React.useState("");

  const handleInputChange = (event) => {
    const newInput = event.target.value;
    setInput(newInput);
    setSearch(newInput);  // Update search term immediately
    if (newInput.trim() === "") {
      event.preventDefault();
      searchPatients(); // Fetch all patients if search is cleared
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission
      searchPatients();       // Trigger the search
    }
  };

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            <Row className="align-items-center">
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                          Total Doctors 
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{totaldoctors}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col md="12" lg="auto" className="ml-lg-auto">
                <Form className="navbar-search navbar-search-dark form-inline d-flex justify-content-end">
                  <FormGroup className="mb-0">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fas fa-search" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Search Doctors"
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                      />
                    </InputGroup>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default DoctorListHeader;