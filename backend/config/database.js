const mysql = require("mysql");

// MySQL connection setup
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "quanlikhohang",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: ", err);
    return;
  }
  console.log("Connected to the MySQL database.");
});

module.exports = db;