import React, { useState } from 'react';
import './Quotation.css';

const App = () => {
  // State for form data
  const [formData, setFormData] = useState({
    quotationNumber: '',
    date: '',
    deliveryDate: '',
    companyName: '',
    address: '',
    cityState: '',
    postalCode: '',
    services: [{ description: '', hours: 0, rate: 0, amount: 0 }],
    taxRate: 0,
    paymentTerms: 'Custom',
    customPaymentTerms: '',
    paymentMode: 'bank-transfer',
    estimatedCompletionDate: '',
    notes: '',
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle service row changes
  const handleServiceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedServices = [...formData.services];
    updatedServices[index][name] = value;

    // Calculate amount for the row
    updatedServices[index].amount =
      updatedServices[index].hours * updatedServices[index].rate;

    setFormData({ ...formData, services: updatedServices });
  };

  // Add a new service row
  const addService = () => {
    setFormData({
      ...formData,
      services: [
        ...formData.services,
        { description: '', hours: 0, rate: 0, amount: 0 },
      ],
    });
  };

  // Remove a service row
  const removeService = (index) => {
    if (formData.services.length > 1) {
      const updatedServices = formData.services.filter((_, i) => i !== index);
      setFormData({ ...formData, services: updatedServices });
    }
  };

  // Calculate totals
  const subTotal = formData.services.reduce(
    (sum, service) => sum + service.amount,
    0
  );
  const tax = (subTotal * formData.taxRate) / 100;
  const total = subTotal + tax;

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    console.log('Sub Total:', subTotal);
    console.log('Tax:', tax);
    console.log('Total:', total);
    alert('Quotation submitted successfully!');
  };

  return (
    <div className="container">
      <h1>QUOTATION FORM</h1>

      <div className="header">
        <div className="company-info">
          <p><strong>TECH ELECON PVT LTD</strong></p>
          <p>ADDRESS: Anand Sojitra Road,</p>
          <p>City/State: Vallabh Vidyanagar, Gujarat,</p>
          <p>Postal Code: 388120</p>
          <p>Email: inquiry@techelecon.com</p>
        </div>
        <div className="quote-info">
          <label>
            QUOTATION #:
            <input
              type="text"
              name="quotationNumber"
              value={formData.quotationNumber}
              onChange={handleInputChange}
              placeholder="Enter quotation number"
            />
          </label>
          <label>
            DATE:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
            />
          </label>
          <label>
            DELIVERY DATE:
            <input
              type="date"
              name="deliveryDate"
              value={formData.deliveryDate}
              onChange={handleInputChange}
            />
          </label>
        </div>
      </div>

      <div className="section">
        <h2>Customer Section</h2>
        <div className="customer-details">
          <label>
            COMPANY NAME:
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              placeholder="Enter company name"
            />
          </label>
          <label>
            ADDRESS:
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter address"
            />
          </label>
          <label>
            CITY/STATE:
            <input
              type="text"
              name="cityState"
              value={formData.cityState}
              onChange={handleInputChange}
              placeholder="Enter city/state"
            />
          </label>
          <label>
            POSTAL CODE:
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
              placeholder="Enter postal code"
            />
          </label>
        </div>
      </div>

      <div className="section">
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Hours</th>
              <th>Rate per Hour</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {formData.services.map((service, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    name="description"
                    value={service.description}
                    onChange={(e) => handleServiceChange(index, e)}
                    placeholder="Enter service description"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="hours"
                    value={service.hours}
                    onChange={(e) => handleServiceChange(index, e)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="rate"
                    value={service.rate}
                    onChange={(e) => handleServiceChange(index, e)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={service.amount.toFixed(2)}
                    readOnly
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={addService}>Add Service</button>
        <button onClick={() => removeService(formData.services.length - 1)}>
          Remove Service
        </button>
      </div>

      <div className="section totals">
        <p>SUB TOTAL: {subTotal.toFixed(2)}</p>
        <p>
          TAX RATE (%):
          <input
            type="number"
            name="taxRate"
            value={formData.taxRate}
            onChange={handleInputChange}
          />
        </p>
        <p>TAX: {tax.toFixed(2)}</p>
        <p><strong>TOTAL: {total.toFixed(2)}</strong></p>
      </div>

      <div className="section">
        <h2>Payment & Terms</h2>
        <div className="payment-details">
          <label>
            PAYMENT TERMS:
            <select
              name="paymentTerms"
              value={formData.paymentTerms}
              onChange={handleInputChange}
            >
              <option value="Custom">Custom</option>
              <option value="Net 30">Net 30</option>
              <option value="Net 60">Net 60</option>
            </select>
          </label>
          <label>
            PAYMENT TERMS:
            <input
              type="text"
              name="customPaymentTerms"
              value={formData.customPaymentTerms}
              onChange={handleInputChange}
              placeholder="Enter custom payment terms"
            />
          </label>
          <div className="payment-mode">
            <label>PAYMENT MODE:</label>
            <label>
              <input
                type="radio"
                name="paymentMode"
                value="bank-transfer"
                checked={formData.paymentMode === 'bank-transfer'}
                onChange={handleInputChange}
              />
              Bank Transfer
            </label>
            <label>
              <input
                type="radio"
                name="paymentMode"
                value="upi"
                checked={formData.paymentMode === 'upi'}
                onChange={handleInputChange}
              />
              UPI
            </label>
            <label>
              <input
                type="radio"
                name="paymentMode"
                value="cash"
                checked={formData.paymentMode === 'cash'}
                onChange={handleInputChange}
              />
              Cash
            </label>
            <label>
              <input
                type="radio"
                name="paymentMode"
                value="cheque"
                checked={formData.paymentMode === 'cheque'}
                onChange={handleInputChange}
              />
              Cheque
            </label>
          </div>
          <label>
            ESTIMATED COMPLETION DATE:
            <input
              type="date"
              name="estimatedCompletionDate"
              value={formData.estimatedCompletionDate}
              onChange={handleInputChange}
            />
          </label>
        </div>
      </div>

      <div className="section">
        <h2>Notes</h2>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          placeholder="Enter your notes here..."
        />
      </div>

      <div className="footer">
        <p>techelecon.com</p>
        <div className="logo">TECH ELECON</div>
        <button onClick={handleSubmit}>SUBMIT QUOTATION</button>
      </div>
    </div>
  );
};

export default App;