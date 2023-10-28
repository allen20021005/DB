const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "Allen911005",
  database: "ordersystem",
});

app.post("/createcustomer", (req, res) => {
  const customer_number = req.body.customer_number;
  const customer_name = req.body.customer_name;
  const customer_gender = req.body.customer_gender;
  const fullUUID = uuidv4();
  const customer_id = fullUUID.slice(0, 16);

  db.query(
    "INSERT INTO customer (customer_id, customer_number, customer_name, customer_gender) VALUES (?,?,?,?)",
    [customer_id, customer_number, customer_name, customer_gender],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error creating customer");
      } else {
        console.log("User Created with ID: " + customer_id);
        res.status(200).send("customer created successfully");
      }
    }
  );
});

app.get("/getcustomers", (req, res) => {
  db.query("SELECT * FROM customer", (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error fetching customers");
    } else {
      res.status(200).json(result);
    }
  });
});
app.delete('/deletecustomer/:customer_id', (req, res) => {
  const customer_id = req.params.customer_id;
  console.log('Received DELETE request for customer ID: ', customer_id);

  db.query('DELETE FROM customer WHERE customer_id = ?', customer_id, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error deleting customer");
    } else {
      console.log("Customer Deleted with ID: " + customer_id);
      res.status(200).send("Customer deleted successfully");
    }
  });
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
