import React, { useState, useEffect } from "react";
import axios from "axios";

const url = "http://localhost:5000/api/v1/customer";

const RequestCustomer = () => {
  const [data, setData] = useState([]);

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

      {data.map(({ id, name, email }) => {
        if (id === 1) {
          name = "Piggy Inu";
        }
        return <h5 key={id}>{`${id}. ${name} Email: ${email}`}</h5>;
      })}
    </div>
  );
};

export default RequestCustomer;
