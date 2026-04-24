import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Camera from "../components/Camera";
import API from "../api/api";
import "../assets/css/register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleCapture = async (blob) => {
    if (!name || !email) {
      alert("Please enter name and email");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("image", blob, "capture.jpg");

      const res = await API.post("register/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(res.data.msg);
      navigate("api/signin");

    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.msg || "Error registering user");
    }
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

      <Camera onCapture={handleCapture} />
    </div>
  );
}

export default Register;