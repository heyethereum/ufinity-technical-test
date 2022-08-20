import React, { useState, useEffect } from "react";
import axios from "axios";

const url = "http://localhost:5000/api/v1/customer";

const RequestCustomer = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios(url);
      console.log(response);
      setData(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Fetch All Customers</h2>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increment Count
      </button>
      <p>{count}</p>

      <ul>
        {data.map((customer) => (
          <li key={customer.id}>{customer.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RequestCustomer;
