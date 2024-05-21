import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Col
} from 'reactstrap';
import AppTableHeader from "components/Headers/AppTableHeader";

const AppTables = () => {
  let [app_id, setAppId] = useState(null); // Change const to let for app_id
  const [appointments, setAppointments] = useState([]);
  const [totalAppointments, setTotalAppointments] = useState(0);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/v1/appointments');
        setAppointments(response.data.data.appointments);
        setTotalAppointments(response.data.data.appointments.length);
        setAppId(response.data.data.appointments[0]?._id); // Set app_id when appointments are fetched
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [appointments]); // Run useEffect whenever appointments change

  const handleApproveAppointment = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5001/api/v1/appointments/${id}`, { status: 'scheduled' });
      if (response.data.status === 'success') {
        const updatedAppointments = appointments.map((appointment) =>
          appointment._id === id ? { ...appointment, status: 'scheduled' } : appointment
        );
        setAppointments(updatedAppointments);
      }
    } catch (error) {
      console.error('Error approving appointment:', error);
    }
  };

  const handleCancelAppointment = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5001/api/v1/appointments/${id}`, { status: 'cancelled' });
      if (response.data.status === 'success') {
        const updatedAppointments = appointments.map((appointment) =>
          appointment._id === id ? { ...appointment, status: 'cancelled' } : appointment
        );
        setAppointments(updatedAppointments);
      }
    } catch (error) {
      console.error('Error canceling appointment:', error);
    }
  };

  const handleDeleteAppointment = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5001/api/v1/appointments/${id}`);
      if (response.status === 204) {
        const updatedAppointments = appointments.filter(appointment => appointment._id !== id);
        alert("Appointment successfully deleted.");
        setAppointments(updatedAppointments);
        window.location.reload();
      }
    } catch (error) {
      alert("Failed to delete Appointment.");
      console.error('Error deleting appointment:', error);
    }
  };

  const handleUpdateAppointment = (id) => {
    // Navigate to the update page with the appointment ID
    console.log("Updating appointment with ID:", id);
    window.location.href = `/admin/CreateAppointment?appointmentId=${id}`;
    setAppId(id); // Update app_id
  };

  return (
    <>
      <AppTableHeader />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <Col>
                    <h3 className="mb-0">Appointments Schedule</h3>
                  </Col>
                  <Col className="text-right">
                    <Link to="/admin/CreateAppointment">
                      <Button color="primary">Add Appointment</Button>
                    </Link>
                  </Col>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Service Id</th>
                    <th scope="col">Appointment Date</th>
                    <th scope="col">Billing invoice</th>
                    <th scope="col">Status</th>
                    <th scope="col">Doctor</th>
                    <th scope="col">Patient</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment) => (
                    <tr key={appointment._id}>
                      <th scope="row">
                        <Media className="align-items-center">
                          <Media>
                            <span className="mb-0 text-sm">{appointment.serviceId}</span>
                          </Media>
                        </Media>
                      </th>
                      <td>{appointment.date} At {appointment.time}</td>
                      <td>{`$${appointment.payment.amount} USD`}</td>
                      <td>
                        <Badge color="" className="badge-dot">
                          <i className={`bg-${appointment.status === 'pending' ? 'info' : appointment.status === 'scheduled' ? 'success' : 'danger'}`} />
                          {appointment.status}
                        </Badge>
                      </td>
                      <td>
                        <div className="avatar-group">
                          <td>{appointment.doctorId}</td>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <td>{appointment.patientId}</td>
                        </div>
                      </td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem href="#pablo" onClick={() => handleApproveAppointment(appointment._id)}>
                              Approve Appointment
                            </DropdownItem>
                            <DropdownItem href="#pablo" onClick={() => handleCancelAppointment(appointment._id)}>
                              Cancel Appointment
                            </DropdownItem>
                            <DropdownItem href="#pablo" onClick={() => handleDeleteAppointment(appointment._id)}>
                              Delete Appointment
                            </DropdownItem>
                            <Link to={{
                              pathname: '/admin/CreateAppointment',
                              state: { appointmentId: app_id }
                            }}>
                              <DropdownItem onClick={() => handleUpdateAppointment(appointment._id)}>
                                Update Appointment
                              </DropdownItem>
                            </Link>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );

};

export default AppTables;
