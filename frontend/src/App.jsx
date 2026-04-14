import { useState, useEffect } from "react";
// import API from "./api"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AttendanceData from "./pages/attendance_data";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="api/register" element={<Register/>} />
        <Route path="api/signin" element={<SignIn/>} />
        <Route path="api/attendance_data" element={<AttendanceData/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;