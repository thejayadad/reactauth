const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.set("strictQuery", false);
require('dotenv').config();

mongoose.Promise = Promise;


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

module.exports.User = require("./user");
module.exports.Message = require("./message");