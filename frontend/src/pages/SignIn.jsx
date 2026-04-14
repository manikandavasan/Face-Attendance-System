import { useState } from "react";
import Camera from "../components/Camera";
import API from "../api/api";
import "../assets/css/signin.css"

function SignIn() {
  const [email, setEmail] = useState("");

  const handleCapture = (blob) => {
    if (!email) {
      alert("Enter email");
      return;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("image", blob);

    API.post("signin/", formData)
      .then(res => {
        alert(res.data.msg);
      })
      .catch(err => {
        alert(err.response?.data?.msg || "Error");
      });
  };

  return (
    <div className="container">
      <h1 className="heading">Sign In</h1>

      <div className="signin-input">
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

export default SignIn;