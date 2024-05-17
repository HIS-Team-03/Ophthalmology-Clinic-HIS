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
  const [chartData, setChartData] = useState(chartExample2.data); // State for appointment data
  const [ageData, setAgeData] = useState(chartExample3.data); // State for age distribution data
  const [genderData, setGenderData] = useState(chartExample4.data);
  const [diseaseData, setDiseaseData] = useState();

  useEffect(() => {
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
    fetchAppointmentData();
    fetchAgeDistributionData();
    fetchGenderData();
    fetchDiseaseData();
  }, []);

  const fetchAppointmentData = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/v1/appointments');
      const appointments = response.data.data.appointments;
      const dates = appointments.map(appointment => appointment.date);
      const dateCounts = dates.reduce((acc, date) => {
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});
      setChartData({
        labels: Object.keys(dateCounts),
        datasets: [{
          label: 'Number of Appointments',
          data: Object.values(dateCounts)
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
      const genderCounts = {Male: 0, Female: 0};
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

    const fetchDiseaseData = async () => {
      try{
        const response = await axios.get('http://localhost:5001/api/v1/patients/');
        const patients =  response.data.data.patients;
        const diseaseCounts = {heartDisease:0 , diabetes:0}
        patients.forEach(patient => {
          if (patient.heartDisease) diseaseCounts.heartDisease += 1;
          if (patient.diabetes) diseaseCounts.diabetes += 1;
        });
        setDiseaseData({
          labels: ['Heart Disease', 'Diabetes'],
          datasets: [{
          data: [diseaseCounts.heartDisease, diseaseCounts.diabetes],
          backgroundColor: ['#5e72e4', '#11cdef', '#2dce89'],
          hoverBackgroundColor: ['#324cdd', '#0da5c0', '#28b779']
          }]
        });
        console.log('Disease data:', diseaseData);
        console.log('Gender data:', genderData);

      } catch(error){
        console.error('hmasa fetching disease data:', error);
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
                    <h2 className="text-white mb-0">Sales value</h2>
                  </CardHeader>
                  <CardBody>
                    <Line
                      data={chartExample1[chartExample1Data]}
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
                <h6 className="text-uppercase text-muted ls-1 mb-1">Appointments</h6>
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
          {/*<Col xl="12">*/}
          {/*  <Card className="shadow mt-4">*/}
          {/*    <CardHeader className="bg-transparent">*/}
          {/*      <h6 className="text-uppercase text-muted ls-1 mb-1">Disease Distribution</h6>*/}
          {/*      <h2 className="mb-0">Patient Disease</h2>*/}
          {/*      </CardHeader>*/}
          {/*    <CardBody>*/}
          {/*        <Pie*/}
          {/*            data={diseaseData}*/}
          {/*            options={{*/}
          {/*              maintainAspectRatio: false,*/}
          {/*              legend: {*/}
          {/*                position: 'bottom',*/}
          {/*                labels: {*/}
          {/*                  fontSize: 14,*/}
          {/*                  usePointStyle: true*/}
          {/*                }*/}
          {/*              },*/}
          {/*              tooltips: {*/}
          {/*                callbacks: {*/}
          {/*                  label: function(tooltipItem, data) {*/}
          {/*                    const dataset = data.datasets[tooltipItem.datasetIndex];*/}
          {/*                    const total = dataset.data.reduce((previousValue, currentValue) => previousValue + currentValue);*/}
          {/*                    const currentValue = dataset.data[tooltipItem.index];*/}
          {/*                    const percentage = Math.floor(((currentValue/total) * 100) + 0.5);*/}
          {/*                    return data.labels[tooltipItem.index] + ': ' + percentage + '%';*/}
          {/*                  }*/}
          {/*                }*/}
          {/*              }*/}
          {/*            }}*/}
          {/*        />*/}
          {/*    </CardBody>*/}
          {/*  </Card>*/}
          {/*</Col>*/}
        </Row>
      </Container>
    </>
  );
};

export default Index;
