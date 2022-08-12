const express = require("express");
const bodyParser = require("body-parser");
// create an express app
const app = express();

// setup server port
const port = process.env.PORT || 5000;

// parse request data content type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse request data content type application/json
app.use(bodyParser.json());

// define root route
app.get("/", (req, res) => {
  res.send("Hello world");
});

// import customer route
const customerRoute = require("./src/routes/customers.route");

//create customer route
app.use("/api/v1/customer", customerRoute);
/* app.use(express.urlencoded({ extended: true }));
app.use(express.json);
 */

app.listen(port, () => {
  console.log(`Express is running at port ${port}`);
});

module.exports = app;
