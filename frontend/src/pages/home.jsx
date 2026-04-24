import { useState } from "react"
import "../assets/css/home.css"
import { useNavigate, useParams } from "react-router-dom"
import AdminPage from "../pages/admin.jsx"


export default function Home(){
    const navigate = useNavigate()
    return(
            <div className="container">
                <h1>Face Attendance System</h1>
                <div className="login-box">
                    <button onClick={()=> {navigate(`api/signin`)}}>User Login</button>
                    <button onClick={()=> {navigate(`api/admin`)}}>Admin Login</button>
                </div>
            </div>
    )
}

