
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import DoctorEditProfile from "./views/examples/DoctorEditProfile";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      {<Route path="*" element={<Navigate to="/auth/index" replace />} />}
      {<Route path="/admin/*" element={<AdminLayout />} />}
      {<Route path="/auth/*" element={<AuthLayout />} />}
      {<Route path="/admin/EditDoctor" element={<DoctorEditProfile/>} />}

    </Routes>
  </BrowserRouter>
);
