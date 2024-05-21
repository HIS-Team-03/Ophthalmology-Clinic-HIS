import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import DoctorEditProfile from "./views/examples/DoctorEditProfile";
import DoctorSeeProfile from "views/examples/DoctorSeeProfile";
import PatientDashboard from "./views/examples/PatientDashboard";
import PatientPortalMedicalRecord from "./views/examples/PatientPortalMedicalRecord";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      {<Route path="*" element={<Navigate to="/auth/index" replace />} />}
      {<Route path="/admin/*" element={<AdminLayout />} />}
      {<Route path="/auth/*" element={<AuthLayout />} />}
      {<Route path="/admin/EditDoctor/*" element={<DoctorEditProfile />} />}
      {/* {<Route path="/admin/SeeDoctor/*" element={<DoctorSeeProfile/>} />} */}
      {/* incomment el foo2 we balash arraf */}
      {<Route path="/patient-dashboard/*" element={<PatientDashboard />} />}
      {
        <Route
          path="/patient-PortalEMR/*"
          element={<PatientPortalMedicalRecord />}
        />
      }
    </Routes>
  </BrowserRouter>
);
