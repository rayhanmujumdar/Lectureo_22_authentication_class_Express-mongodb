const express = require("express");
const connectDB = require("./db");

const app = express();

app.get("/", (_req, res) => {
  const obj = {
    name: "Ayman",
    email: "ayman@gmail.com",
  };
  res.json(obj);
});

connectDB("mongodb://localhost:27017/attendance-db")
  .then(() => {
    console.log("mongodb is connected");
  })
  .catch((e) => {
    console.log(e);
  });
app.listen(4000, () => {
  console.log("I am listening on port 4000");
});
