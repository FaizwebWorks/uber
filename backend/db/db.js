const mongoose = require("mongoose");

const connectToDb = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Connected to database");
    })
    .catch((err) => console.error(err));
};

module.exports = connectToDb;
