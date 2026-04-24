import { useState } from "react";
import API from "../api/api";
import "../assets/css/admin.css"
import { useNavigate } from "react-router-dom";

function AdminPage() {
    const navigate = useNavigate()
  return (
    <div className="container">
      <h1 className="heading">Admin Page</h1>

      <div className="overall">
        <h2>Create new User by clicking the button</h2>
        <button onClick={()=> {navigate(`/api/register`)}} className="new-user-btn">Register New User</button>
      </div>
    </div>
  );
}

export default AdminPage;