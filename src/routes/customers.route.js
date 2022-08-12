const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customer.controller");

// get all customers
router.get("/", customerController.getCustomerList);

// get customer by ID
router.get("/:id", customerController.getCustomerByID);

// create new customer
router.post("/", customerController.createNewCustomer);

// update customer
router.put("/:id", customerController.updateCustomer);

// delete customer
router.delete("/:id", customerController.deleteCustomer);

module.exports = router;
