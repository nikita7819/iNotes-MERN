const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

const MONGO_URL = process.env.MONGO_URL;
// console.log(process.env.MONGO_URL);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URL);
    // console.log(conn);

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

module.exports = connectDB;
