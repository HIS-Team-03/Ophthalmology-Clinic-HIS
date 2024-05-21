import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card, CardHeader, CardFooter, Table, Container, Row,
  DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle,Button
} from "reactstrap";
import { Link } from 'react-router-dom';
import PatientHeader from "components/Headers/PatientHeader";  // Ensure this path is correct


const PatientTable = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    const response = await axios.get("http://localhost:5001/api/v1/patients");
    setPatients(response.data.data.patients);
  };

  const searchPatients = async () => {
    if (search.trim()) {
        try {
            const response = await axios.get(`http://localhost:5001/api/v1/patients?name=${search}`);
            setPatients(response.data.data.patients);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setPatients([]);  // Clear the patients list if no results found
                // Optionally, handle the 404-specific logic here, e.g., show a message
            } else {
                console.error("Error searching patients:", error);
                // Handle other kinds of errors (network error, server error, etc.)
            }
        }
    } else {
        fetchPatients();  // Fetch all patients if the search is cleared
    }
};

const deletePatient = async (id) => {
  // Prompt the user to confirm the deletion
  if (!id) {
    console.error("Attempted to delete with undefined ID");
    return;
} 
  if (window.confirm("Are you sure you want to delete this patient?")) {
      try {
          const response = await axios.delete(`http://localhost:5001/api/v1/patients/${id}`);
          fetchPatients(); // Refresh the list after successful deletion
          alert("Patient successfully deleted."); // Optional: confirm deletion
          console.log("Deletion successful: ", response.data);
      } catch (error) {
          console.error("Failed to delete the patient:", error);
          alert(`Failed to delete the patient: ${error.response?.data?.message || error.message}`);
      }
  } else {
      // If user cancels, you can alert or just ignore
      console.log("Deletion cancelled by the user.");
  }
};


  return (
    <>
      <PatientHeader setSearch={setSearch} searchPatients={searchPatients} totalPatients={patients.length} />
      <Container className="mt--7" fluid >
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h3 className="mb-0">Patient List</h3>
                  <Link to={'/admin/PatientsCreate'}>
                  <Button color="primary">Add Patient</Button>
                  </Link>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                <tr>
                    <th scope="col">Patient</th>
                    <th scope="col">Patient Name</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Age</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Patient ID</th>
                    <th scope="col"/>
                    <th scope="col"/>
                    <th scope="col"/>

                </tr>
                </thead>
                  <tbody>
                  {patients.map((patient, index) => (
                      <tr key={patient._id}>
                          <th scope="row">{index + 1}</th>
                          <td>
                              <Link to={`/admin/Patients/${patient._id}`}>
                                  {patient.name}
                              </Link>
                          </td>
                          <td>{patient.phoneNumber}</td>
                          <td>{patient.age}</td>
                          <td>{patient.sex}</td>
                          <td>{patient._id}</td>
                          {/*<td className="text-right">*/}
                          {/*    <Link to={`/admin/PatientsUpdate`}>*/}
                          {/*        <Button color="success ">Edit</Button>*/}
                          {/*    </Link>*/}
                          {/*</td>*/}

                          <td className="text-right">
                              <UncontrolledDropdown>
                                  <DropdownToggle
                                      className="btn-icon-only text-light"
                                      href="#"
                                      role="button"
                                      size="sm"
                                  >
                                      <i className="fas fa-ellipsis-v"/>
                                  </DropdownToggle>
                                  <DropdownMenu right>
                                      <DropdownItem
                                          onClick={() => deletePatient(patient._id)}
                                      >
                                          Delete Patient
                                      </DropdownItem>
                                      <DropdownItem
                                      >
                                        <Link to={{
                                                pathname: `/admin/PatientsUpdate/${patient._id}`,
                                                state: { patient }
                                          }}>
                                          <DropdownItem>
                                                Update Patient
                                          </DropdownItem>
                                          </Link>
                                      </DropdownItem>
                                  </DropdownMenu>
                              </UncontrolledDropdown>
                          </td>
                      </tr>
                  ))}
                </tbody>
              </Table>
                <CardFooter className="py-4">
                    {/* Pagination can be added here */}

                </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default PatientTable;
