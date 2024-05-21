import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";
import Chart from 'chart.js';
import { chartOptions, parseOptions, chartExample1, chartExample2, chartExample3, chartExample4 } from "variables/charts.js";
import Header from "components/Headers/Header.js";

const Index = () => {
  const [serviceData, setServiceData] = useState(chartExample1.data1()); 
  const [chartData, setChartData] = useState(chartExample2.data); 
  const [ageData, setAgeData] = useState(chartExample3.data); 
  const [genderData, setGenderData] = useState(chartExample4.data);

  useEffect(() => {
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
    fetchAppointmentCountsByService();
    fetchAppointmentData();
    fetchAgeDistributionData();
    fetchGenderData();
  }, []);

  const fetchAppointmentCountsByService = async () => {
    try {
        const response = await axios.get('http://localhost:5001/api/v1/appointments');
        const appointments = response.data.data.appointments; // Assuming the structure contains an array of appointments

        // Count occurrences of each serviceId in the appointments
        const serviceCounts = appointments.reduce((acc, appointment) => {
            const serviceId = appointment.serviceId; // Assuming each appointment has a serviceId field
            acc[serviceId] = (acc[serviceId] || 0) + 1;
            return acc;
        }, {});

        // Prepare chart data using these counts
        const chartData = {
            labels: Object.keys(serviceCounts),
            datasets: [{
                label: 'Number of Appointments per Service',
                data: Object.values(serviceCounts),
                backgroundColor: Object.keys(serviceCounts).map(() => 'rgba(60, 100, 239, 0.5)'),
                borderWidth: 1
            }]
        };

        setServiceData(chartData);
    } catch (error) {
        console.error('Error fetching appointments:', error);
    }
};

  const fetchAppointmentData = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/v1/appointments');
      const appointments = response.data.data.appointments;
      const monthCounts = appointments.reduce((acc, appointment) => {
        const month = new Date(appointment.date).getMonth() + 1;
        acc[month] = (acc[month] || 0) + 1;
        return acc;
      }, {});

      setChartData({
        labels: Object.keys(monthCounts).map(month => `Month ${month}`),
        datasets: [{
          label: 'Number of Appointments per Month',
          data: Object.values(monthCounts)
        }]
      });
    } catch (error) {
      console.error('Error fetching appointment data:', error);
    }
  };

  const fetchAgeDistributionData = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/v1/patients');
      const patients = response.data.data.patients;
      const ageDistribution = [0, 0, 0, 0];
      patients.forEach(patient => {
        const age = patient.age;
        if (age < 18) ageDistribution[0]++;
        else if (age <= 34) ageDistribution[1]++;
        else if (age <= 50) ageDistribution[2]++;
        else ageDistribution[3]++;
      });

      setAgeData({
        labels: ["18-34", "35-49", "50-64", "65+"],
        datasets: [{
          label: "Age Distribution",
          data: ageDistribution,
          backgroundColor: "#5e72e4"
        }]
      });
    } catch (error) {
      console.error('Failed to fetch and process age distribution data:', error);
    }
  };

  const fetchGenderData = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/v1/patients');
      const patients = response.data.data.patients;
      const genderCounts = { Male: 0, Female: 0 };
      patients.forEach(patient => {
        if (patient.sex === 'Male') genderCounts.Male += 1;
        else if (patient.sex === 'Female') genderCounts.Female += 1;
      });

      setGenderData({
        labels: ['Male', 'Female'],
        datasets: [{
          data: [genderCounts.Male, genderCounts.Female],
          backgroundColor: ['#5e72e4', '#11cdef'],
          hoverBackgroundColor: ['#324cdd', '#0da5c0']
        }]
      });
    } catch (error) {
      console.error('Error fetching gender data:', error);
    }
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <Col xl="8">
            <Row>
            <Col xl="12">
                    <Card className="shadow">
                        <CardHeader>
                            <h3 className="mb-0">Service Analysis</h3>
                        </CardHeader>
                        <CardBody>
                            <Bar data={serviceData} options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true
                                        }
                                    }]
                                }
                            }} />
                        </CardBody>
                    </Card>
                </Col>
              <Col xl="12">
                <Card className="shadow mt-4">
                  <CardHeader className="bg-transparent">
                    <h6 className="text-uppercase text-muted ls-1 mb-1">Gender Distribution</h6>
                    <h2 className="mb-0">Patient Gender</h2>
                  </CardHeader>
                  <CardBody>
                    <Pie
                      data={genderData}
                      options={{
                        maintainAspectRatio: false,
                        legend: {
                          position: 'bottom',
                          labels: {
                            fontSize: 14,
                            usePointStyle: true
                          }
                        }
                      }}
                    />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h6 className="text-uppercase text-muted ls-1 mb-1">Performance</h6>
                <h2 className="mb-0">Total Appointments</h2>
              </CardHeader>
              <CardBody>
                <Bar
                  data={chartData}
                  options={chartExample2.options}
                />
              </CardBody>
            </Card>
            <Card className="shadow mt-4">
              <CardHeader className="bg-transparent">
                <h6 className="text-uppercase text-muted ls-1 mb-1">Demographics</h6>
                <h2 className="mb-0">Age Distribution Patient</h2>
              </CardHeader>
              <CardBody>
                <Bar
                  data={ageData}
                  options={chartExample3.options}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
