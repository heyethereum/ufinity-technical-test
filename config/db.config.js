const mysql = require("mysql");
require("dotenv").config();

// create mysql connection
const dbConn = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
});

dbConn.connect(function (error) {
  if (error) throw error;
  console.log("Database connected successfully");
});

module.exports = dbConn;
