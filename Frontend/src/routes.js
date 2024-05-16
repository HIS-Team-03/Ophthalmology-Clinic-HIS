
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Login from "views/examples/Login.js";
import Tables from "views/examples/Tables.js";
import AppTables from "views/examples/AppTables.js";
import Icons from "views/examples/Icons.js";
import DoctorCreateProfile from "views/examples/DoctorCreateProfile";
import PatientCreateHeader from "./components/Headers/PatientCreateHeader";
import PatientTable from "views/examples/PatientTable";
import PatientCreateProfile from "views/examples/PatientCreateProfile";
import PatientProfile from "./views/examples/PatientProfile";
import {Route} from "react-router-dom";
import AppProfile from "views/examples/AppointmentCreate";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-circle-08",
    component: <Index />,
    layout: "/admin",
  },

  {
    path: "/Patients",
    name: "Patients",
    icon: "ni ni-ambulance",
    component: <PatientTable />,
    layout: "/admin",
  },


  {
    path: "/Doctors",
    name: "Doctors",
    icon: "ni ni-badge",
    component: <DoctorCreateProfile />,
    layout: "/admin",
   
  },
  {
    name: "Appointment",
    icon: "ni ni-calendar-grid-58",
    children: [
      {
        name: "Create Appointment",
        path: "/CreateAppointment",
        icon:"ni ni-bold-right",
        component: <AppProfile/>,
        layout: "/admin",
      },
     { name: "View Appointments",
     path:"/Appointments",
     icon: "ni ni-bold-right",
     component: <AppTables />,
     layout: "/admin",},
    ]
  },
  {
    path: "/Prescription",
    name: "Prescription",
    icon: "ni ni-single-copy-04",
    component: <Tables />,
    layout: "/admin",
  },
  {
    path: "/Payment",
    name: "Payment",
    icon: "ni ni-money-coins",
    component: <Tables/>,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "",
    icon: "",
    component: <Login/>,
    layout: "/auth",
  },
  {
    path: "/PatientsCreate",
    component: <PatientCreateProfile type={"Create"} />,
    layout: "/admin",
  },
  {
    path: "/PatientsUpdate",
    component: <PatientCreateProfile type={"Update"} />,
    layout: "/admin",
  },
  {
    path: "/Patients/:id",
    component: <PatientProfile/>,
    layout: "/admin",
  },
  // {<Route path="/admin/Patients/:id" element={<PatientProfile/> }/> }


  { name: "",
    path: "/CreateAppointment",
    component: <AppProfile/>,
    layout: "/admin",},
    {
      path: "/Appointments",
      name: "",
      component: <AppTables/>,
      layout: "/admin",
    },
 
];
export default routes;
