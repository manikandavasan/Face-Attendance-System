import { useState, useEffect } from "react";
// import API from "./api"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AttendanceData from "./pages/attendance_data";
import Home from "./pages/home";
import AdminPage from "./pages/admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="api/register" element={<Register/>} />
        <Route path="api/signin" element={<SignIn/>} />
        <Route path="api/attendance_data" element={<AttendanceData/>} />
        <Route path="api/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;