import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomText from "../components/BottomText";
import Role from "../components/Role";

const Signup = () => {
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    firstName: "",
    lastName: "",
    phoneNo: "",
    email: "",
    password: "",
    role: "client", 
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleChange = (role) => {
    setFormValue((prev) => ({ ...prev, role }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formValue.firstName || !formValue.lastName || !formValue.phoneNo || !formValue.email || !formValue.password || !formValue.role) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/users/signup",
        formValue
      );

      console.log(response.data);

      if (response.data.success) {
        navigate("/signin");
      } else {
        setError("Signup failed! Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error.response?.data);
      setError(error.response?.data?.msg || "Something went wrong. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef]">
      <div className="w-auto p-10 rounded-xl bg-white/20 backdrop-blur-lg border border-white/40 shadow-lg flex flex-col justify-center items-center">
        
        <Heading title="Create a free account" style="text-4xl text-[#1e2022] font-bold" />
        <SubHeading subtitle="Enter your information to create an account" className="text-gray-600" />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Role onRoleChange={handleRoleChange} />

        <div className="flex justify-between space-x-4 w-full">
          <InputBox
            title="First Name"
            type="text"
            name="firstName"
            placeholder="John"
            value={formValue.firstName}
            onChange={handleChange}
          />

          <InputBox
            title="Last Name"
            type="text"
            name="lastName"
            placeholder="Doe"
            value={formValue.lastName}
            onChange={handleChange}
          />
        </div>

        
        <InputBox
          title="Phone Number"
          type="text"
          name="phoneNo"
          placeholder="7598461328"
          value={formValue.phoneNo}
          onChange={handleChange}
        />

        <InputBox
          title="Email"
          type="email"
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

        <Button
          title="Submit"
          onClick={handleSubmit}
          style="bg-[#009e74] text-center text-white rounded-md hover:bg-[#008e68] mt-5 w-full mb-3 p-3"
        />

        <BottomText text="Already have an account?" to="/signin" title="Sign in" className="text-gray-600" />
      </div>
    </div>
  );
};

export default Signup;
