import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card, CardHeader, CardFooter, Table, Container, Row,
  DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle
} from "reactstrap";
import { Link } from 'react-router-dom';
import { Button } from "reactstrap";
import DoctorListHeader from "../../components/Headers/DoctorListHeader";
import DoctorEditProfile from "./DoctorEditProfile";
// import PatientHeader from "components/Headers/PatientHeader";  // Ensure this path is correct
// changed header

const DoctorTable = () => {

  const [doctors, setDoctors] = useState([]);
  // const [search, setSearch] = useState("");

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    const response = await axios.get("http://localhost:5001/api/doctors");
    setDoctors(response.data);
  };

  const deleteDoctor  = async (id) =>{

    console.log("khaledd shrerrrrr")
    const url = `http://localhost:5001/api/doctors/${id}`; // Backend API endpoint

    const response = await axios.delete(url);
    fetchDoctors();
    // window.location.href = "http://localhost:3000/admin/CreateDoctor"
  }

  const editDoctor = (id) =>{
   console.log("khaledd shrerrrrr")
      

   window.location.href = `http://localhost:3000/admin/EditDoctor/${id}`
  // return <DoctorEditProfile id={id} />;

  }

  const showDoctor = (id) =>{
    console.log("hana shereeera")
    window.location.href = `http://localhost:3000/admin/SeeDoctor/${id}`
  }









  return (
    <>
      <DoctorListHeader 
        totaldoctors={doctors.length}
          // setSearch={setSearch} searchPatients={searchPatients} 
      />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h3 className="mb-0">Doctors List</h3>
                  <Link to={'/admin/CreateDoctor'}>
                  <Button color="primary">Add Doctor</Button>
                  </Link>
              </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Doctor </th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">address</th>
                    <th scope="col">specialization</th>
                    <th scope="col">birthday</th>
                    {/*<th scope="col">Doctor ID</th>*/}
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {doctors.map((doctor, index) => (
                    <tr key={doctor._id}>
                      <th scope="row">{index+1}</th>
                      {/*<td>*/}
                      {/*  <img*/}
                      {/*    src={doctor.pictureUrl}*/}
                      {/*    alt="..."*/}
                      {/*    className="rounded-circle"*/}
                      {/*  />*/}
                      {/*</td>*/}
                      {/* <td onClick={()=>showDoctor(doctor._id)} style={{ textDecoration: 'underline', color: 'blue', cursor: 'pointer' }}>{doctor.firstName +" "+ doctor.lastName}</td> */}
                      <td><Link onClick={()=>showDoctor(doctor._id)}>{doctor.firstName +" "+ doctor.lastName}</Link></td>
                      <td>{doctor.email}</td>
                      <td>{doctor.phone}</td>
                      <td>{doctor.address}</td>
                      <td>{doctor.specialization}</td>
                      <td>{doctor.birthday}</td>
                      {/*<td>{doctor._id}</td>*/}
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#"
                            role="button"
                            size="sm"
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu right>
                            <DropdownItem
                              onClick={() => deleteDoctor(doctor._id)}
                                // changed
                            >
                              Delete Doctor
                            </DropdownItem>
                            <DropdownItem
                              onClick={() =>editDoctor(doctor._id)}
                            >
                              Edit Doctor
                            </DropdownItem>
                            <DropdownItem
                              onClick={(e) => e.preventDefault()}
                            >
                              See Doctor
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

export default DoctorTable;