const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/caarts", {
    useFindAndModify: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection sucessful");
  })
  .catch((err) => {
    console.log("Error in connecting");
  });
