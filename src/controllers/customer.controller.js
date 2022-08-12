const CustomerModel = require("../models/customer.model");

// get customers lists

exports.getCustomerList = (req, res) => {
  // console.log("Get all customers list");
  CustomerModel.getAllCustomers((err, customers) => {
    console.log("Getting all Customers");
    if (err) {
      res.send(err);
    }
    //console.log("Customers", customers);
    res.send(customers);
  });
};

// get customer by ID
exports.getCustomerByID = (req, res) => {
  console.log("get cust by id");
  CustomerModel.getCustomerByID(req.params.id, (err, customer) => {
    if (err) {
      res.send(err);
    }
    console.log("Single Data retrieved", customer);
    res.send(customer);
  });
};

// create new Customer
exports.createNewCustomer = (req, res) => {
  console.log("req data:", req.body);
  const customerReqData = new CustomerModel(req.body);
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.send(400).send({ success: false, message: "Please fill all fields" });
  } else {
    console.log("Valid Data");
    CustomerModel.createCustomer(customerReqData, (err, customer) => {
      if (err) res.send(err);
      res.json({
        status: true,
        message: "Customer Created successfully",
        data: customer.insertId,
      });
    });
  }
};

// update customer
exports.updateCustomer = (req, res) => {
  const customerReqData = new CustomerModel(req.body);
  console.log("customerReqDate update", customerReqData);
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.send(400).send({ success: false, message: "Please fill all fields" });
  } else {
    CustomerModel.updateCustomer(
      req.params.id,
      customerReqData,
      (err, customer) => {
        if (err) res.send(err);
        res.json({
          status: true,
          message: "Customer updated successfully",
          data: customer.insertId,
        });
      }
    );
  }
};

// delete customer

exports.deleteCustomer = (req, res) => {
  CustomerModel.deleteCustomer(req.params.id, (err, customer) => {
    if (err) res.send(err);
    res.json({ status: true, message: "Customer deleted successfully" });
  });
};
