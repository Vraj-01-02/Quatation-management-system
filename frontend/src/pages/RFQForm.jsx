import { useState } from "react";
import axios from "axios";

export default function RFQForm() {
  const [rfqData, setRfqData] = useState({
    companyName: "",
    customerName: "",
    email: "",
    phone: "",
    serviceType: "",
    description: "",
    budget: "",
    currency: "INR", // Default currency
    deadline: "",
    additionalNotes: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRfqData({ ...rfqData, [name]: value });
  };

  const handleFileChange = (e) => {
    setRfqData({ ...rfqData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    Object.keys(rfqData).forEach((key) => {
      formData.append(key, rfqData[key]);
    });

    try {
      await axios.post("http://localhost:5000/api/rfqs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("RFQ submitted successfully!");
      setRfqData({
        companyName: "",
        customerName: "",
        email: "",
        phone: "",
        serviceType: "",
        description: "",
        budget: "",
        currency: "INR",
        deadline: "",
        additionalNotes: "",
        file: null,
      });
    } catch (error) {
      console.error("Error submitting RFQ:", error);
    }
  };

  return (
    <div className="p-8 bg-[#1b263b] text-white rounded-lg shadow-lg max-w-3xl mx-auto mt-10">
      <h2 className="text-3xl font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent text-center">
        Request for Quotation (RFQ)
      </h2>
      <p className="text-gray-400 text-center text-sm mb-4">
        Provide your details and project requirements for a custom quotation.
      </p>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
        {/* Company & Personal Details */}
        <input type="text" name="companyName" placeholder="Company Name" value={rfqData.companyName} onChange={handleChange} className="p-3 rounded-lg bg-gray-800 text-white border border-gray-600" required />
        <input type="text" name="customerName" placeholder="Your Name" value={rfqData.customerName} onChange={handleChange} className="p-3 rounded-lg bg-gray-800 text-white border border-gray-600" required />
        <input type="email" name="email" placeholder="Your Email" value={rfqData.email} onChange={handleChange} className="p-3 rounded-lg bg-gray-800 text-white border border-gray-600" required />
        <input type="text" name="phone" placeholder="Your Phone Number" value={rfqData.phone} onChange={handleChange} className="p-3 rounded-lg bg-gray-800 text-white border border-gray-600" required />

        {/* Service Type & Project Details */}
        <input type="text" name="serviceType" placeholder="Service Required (e.g., Web Development, Mobile App, UI/UX Design)" value={rfqData.serviceType} onChange={handleChange} className="p-3 rounded-lg bg-gray-800 text-white border border-gray-600" required />
        <textarea name="description" placeholder="Describe your project requirements in detail..." value={rfqData.description} onChange={handleChange} className="p-3 h-28 rounded-lg bg-gray-800 text-white border border-gray-600" required />

        {/* Budget & Deadline */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm text-gray-300">Budget (₹)</label>
            <input type="number" name="budget" placeholder="Estimated Budget" value={rfqData.budget} onChange={handleChange} className="p-3 rounded-lg bg-gray-800 text-white border border-gray-600 w-full" required />
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-300">Deadline</label>
            <input type="date" name="deadline" value={rfqData.deadline} onChange={handleChange} className="p-3 rounded-lg bg-gray-800 text-white border border-gray-600 w-full" required />
          </div>
        </div>

        {/* Additional Notes */}
        <textarea name="additionalNotes" placeholder="Any additional details or special requirements..." value={rfqData.additionalNotes} onChange={handleChange} className="p-3 h-20 rounded-lg bg-gray-800 text-white border border-gray-600"></textarea>

        

        {/* Submit Button */}
        <button type="submit" className="p-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition">Submit RFQ</button>
      </form>
    </div>
  );
}

