import { useState } from "react";
import Camera from "../components/Camera";
import API from "../api/api";
import "../assets/css/register.css"

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleCapture = (blob) => {
    if (!name || !email) {
      alert("Please enter name and email");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("image", blob);

    API.post("register/", formData)
      .then(res => {
        alert(res.data.msg);
      })
      .catch(err => {
        console.log(err);
        alert("Error registering user");
      });
  };

  return (
    <div className="container">
      <h1 className="heading">Register User</h1>

      <div className="register-input">
        <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      </div>

      {/* CAMERA COMPONENT */}
      <Camera onCapture={handleCapture} />
    </div>
  );
}

export default Register;