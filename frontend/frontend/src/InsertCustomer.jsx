import React, { useState } from "react";
import axios from "axios";

const InsertCustomer = () => {
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const submitForm = async () => {
    const response = await axios
      .post("http://localhost:5000/api/v1/customer/", {
        name: customerName,
        email: email,
      })
      .then((err) => {
        err ? console.log(err) : console.log("customer created Successfully");
      });
    console.log(response?.data);
  };

  return (
    <div>
      <h2>Insert New Customer</h2>
      <div>
        <label>Customer Name:</label>
        <input
          type="text"
          name="customerName"
          onChange={(e) => {
            setCustomerName(e.target.value);
          }}
        />
        <label>Email:</label>
        <input
          type="text"
          name="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <button onClick={() => submitForm()}>Submit</button>
      </div>
    </div>
  );
};

export default InsertCustomer;
