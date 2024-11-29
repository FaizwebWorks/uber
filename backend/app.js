const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const connectToDb = require("./db/db");
const cors = require("cors");
const app = express();

connectToDb();

app.get("/", (req, res) => {
  res.send("Hello world!");
});

module.exports = app;
