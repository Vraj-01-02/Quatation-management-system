import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomText from "../components/BottomText";
import Role from "../components/Role";

const Signin = () => {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
    role: "client",
    accessId: "",
  });
  const [error, setError] = useState("");

  const handleRoleChange = (role) => {
    setFormValue((prev) => ({ ...prev, role }));
  };

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state
  
    try {
      const payload = {
        email: formValue.email,
        password: formValue.password,
        accessId: formValue.accessId,
        role: formValue.role,
      };
  
      console.log("Sending payload:", payload);
  
      const response = await axios.post(
        "http://localhost:8080/api/v1/users/signin",
        payload
      );
  
      console.log("Login Successful:", response.data);
  
      // Save token in localStorage
      localStorage.setItem("token", response.data.token);
  
      // Check user role and navigate accordingly
      if (formValue.role === "admin") {
        navigate("/dashboard"); // Admin Dashboard
      } else {
        navigate("/CustomerDashboard"); // Customer Dashboard
      }
    } catch (error) {
      console.error("Signin error:", error);
  
      if (error.response) {
        console.error("Full error response:", error.response);
        setError(error.response.data?.msg || "Something went wrong. Try again.");
      } else if (error.request) {
        console.error("No response received from server:", error.request);
        setError("No response from server. Check your connection.");
      } else {
        console.error("Error setting up request:", error.message);
        setError("Request setup failed. Try again.");
      }
    }
  };
  
  
  

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]">
      <div className="w-auto p-10 rounded-xl bg-white/20 backdrop-blur-lg border border-white/40 shadow-lg flex flex-col justify-center items-center">
        <Heading title="Sign In" style="text-4xl text-[#1e2022] font-bold" />
        <SubHeading subtitle="Enter your information and login into account" />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Role onRoleChange={handleRoleChange} />

        <InputBox
          title="Email"
          type="text"
          name="email"
          placeholder="jhondoe123@example.com"
          value={formValue.email}
          onChange={handleChange}
        />

        <InputBox
          title="Password"
          type="password"
          name="password"
          placeholder="********"
          value={formValue.password}
          onChange={handleChange}
        />

        {formValue.role === "admin" && (
          <InputBox
            title="AccessId"
            type="text"
            name="accessId"
            placeholder="********"
            value={formValue.accessId}
            onChange={handleChange}
          />
        )}

        <Button
          title="Submit"
          onClick={handleSubmit}
          style="bg-[#009e74] text-center text-white rounded-md hover:bg-[#008e68] mt-5 w-full mb-3 p-3"
        />

        <BottomText
          text="Don't have an account? Create one"
          to="/signup"
          title="Sign up"
        />
      </div>
    </div>
  );
};

export default Signin;
