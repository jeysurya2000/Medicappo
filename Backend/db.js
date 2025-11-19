const mongoose = require("mongoose");
const connectionString = process.env.CONNECTION_STRING;
mongoose.connect(connectionString);
const db = mongoose.connection;
db.once("open", () => {
  console.log("Database established successfully");
});
db.on("error", (err) => {
  console.log("Error Occurred", err);
});
