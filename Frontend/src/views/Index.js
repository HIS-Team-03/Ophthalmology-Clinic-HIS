import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";
import Chart from 'chart.js'; // Ensure Chart.js is correctly imported
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4
} from "variables/charts.js";
import Header from "components/Headers/Header.js";

const Index = () => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [serviceData, setServiceData] = useState(chartExample1.data); // State for appointment data
  const [chartData, setChartData] = useState(chartExample2.data); // State for appointment data
  const [ageData, setAgeData] = useState(chartExample3.data); // State for age distribution data
  const [genderData, setGenderData] = useState(chartExample4.data);
  useEffect(() => {
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
    fetchAppointmentData();
    fetchAgeDistributionData();
    fetchGenderData();
    fetchServices();
  }, []);
  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/v1/services');
      const servicesData = response.data.data.services;
  
      // Create an object to count each type of service
      const serviceCounts = servicesData.reduce((acc, service) => {
        // Assuming each service has a 'name' property
        acc[service.name] = (acc[service.name] || 0) + 1;
        return acc;
      }, {});
  
      // Update the chart data
      setServiceData({
        labels: Object.keys(serviceCounts), // service names as labels
        datasets: [{
          label: 'Number of Services',
          data: Object.values(serviceCounts), // count of each service
          backgroundColor: Array(Object.keys(serviceCounts).length).fill('#11cdef'), // Adjust color as needed
          hoverBackgroundColor: Array(Object.keys(serviceCounts).length).fill('#ffffff')
        }]
      });
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };
  

  const fetchAppointmentData = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/v1/appointments');
      const appointments = response.data.data.appointments;
      const monthCounts = appointments.reduce((acc, appointment) => {
        // Extract the month from the date string (assumes date format as 'YYYY-MM-DD')
        const month = new Date(appointment.date).getMonth() + 1; // getMonth() returns 0-11, so add 1 for 1-12
        acc[month] = (acc[month] || 0) + 1;
        return acc;
      }, {});
      
      setChartData({
        labels: Object.keys(monthCounts).map(month => `Month ${month}`), // Label each month
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
      setAgeData(prevData => ({
        ...prevData,
        datasets: [
          {
            ...prevData.datasets[0],
            data: ageDistribution
          },
        ],
      }));
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
          backgroundColor: ['#5e72e4', '#11cdef', '#2dce89'],
          hoverBackgroundColor: ['#324cdd', '#0da5c0', '#28b779']
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
                <Card className="bg-gradient-default shadow">
                <CardHeader className="bg-transparent">
                  <h6 className="text-uppercase text-light ls-1 mb-1">Overview</h6>
                  <h2 className="text-white mb-0">Service Usage</h2>
                </CardHeader>
                <CardBody>
                  <Bar
                    data={serviceData} // Make sure you are calling the correct data function if it's dynamic
                    options={chartExample1.options}
                  />
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
                        },
                        tooltips: {
                          callbacks: {
                            label: function(tooltipItem, data) {
                              const dataset = data.datasets[tooltipItem.datasetIndex];
                              const total = dataset.data.reduce((previousValue, currentValue) => previousValue + currentValue);
                              const currentValue = dataset.data[tooltipItem.index];
                              const percentage = Math.floor(((currentValue/total) * 100) + 0.5);         
                              return data.labels[tooltipItem.index] + ': ' + percentage + '%';
                            }
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
