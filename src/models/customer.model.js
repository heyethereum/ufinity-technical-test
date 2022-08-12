const dbConn = require("../../config/db.config");

let Customer = function (customer) {
  this.name = customer.name;
  this.email = customer.email;
  this.phone = customer.phone;
};

// get all customers

Customer.getAllCustomers = (result) => {
  dbConn.query("SELECT * FROM customers", (err, res) => {
    if (err) {
      console.log("Error while fetching customers", err);
      result(null, err);
    } else {
      console.log("Customers fetched successfully");
      result(null, res);
    }
  });
};

// get employee by ID from DB
Customer.getCustomerByID = (id, result) => {
  dbConn.query("SELECT * FROM customers WHERE id=?", id, (err, res) => {
    if (err) {
      console.log("Error while fetching customer by id", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

// create new customer
Customer.createCustomer = (customerReqData, result) => {
  dbConn.query("INSERT INTO customers SET ? ", customerReqData, (err, res) => {
    if (err) {
      console.log("Error while inserting data");
      result(null, err);
    } else {
      console.log("Customer created successfully");
      result(null, res);
    }
  });
};

// update customer
Customer.updateCustomer = (id, customerReqData, result) => {
  dbConn.query(
    "UPDATE customers SET name=?, email=?, phone =? WHERE id = ?",
    [customerReqData.name, customerReqData.email, customerReqData.phone, id],
    (err, res) => {
      if (err) {
        console.log("Error while updating customer");
        result(null, err);
      } else {
        console.log("Updated customer successfully");
        result(null, res);
      }
    }
  );
};

// delete customer
Customer.deleteCustomer = (id, result) => {
  dbConn.query("DELETE FROM customers WHERE id=?", [id], (err, res) => {
    if (err) {
      console.log("Error while deleting customer");
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Customer;
