const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/HW3", { useNewUrlParser: true, useUnifiedTopology: true });

const customerSchema = new mongoose.Schema({
  customer_id: String,
  customer_number: String,
  customer_name: String,
  customer_gender: String
});

const Customer = mongoose.model("Customer", customerSchema);

app.post("/createcustomer", async (req, res) => {
  const { customer_number, customer_name, customer_gender } = req.body;
  const customer_id = uuidv4().slice(0, 16);

  try {
    const newCustomer = new Customer({
      customer_id,
      customer_number,
      customer_name,
      customer_gender
    });
    await newCustomer.save();
    console.log("User Created with ID: " + customer_id);
    res.status(200).send("Customer created successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating customer");
  }
});

app.get("/getcustomers", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching customers");
  }
});

app.delete('/deletecustomer/:customer_id', async (req, res) => {
  const customer_id = req.params.customer_id;

  try {
    await Customer.deleteOne({ customer_id });
    console.log("Customer Deleted with ID: " + customer_id);
    res.status(200).send("Customer deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting customer");
  }
});

app.listen(3001, () => {
  console.log("Yay, your server is running on port 3001");
});
