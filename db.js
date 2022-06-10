const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const mongoURI = process.env.MONGO_URL

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("database connected successfully");
  } catch (error) {
    console.log(error);
  }
}
module.exports = connectToMongo;