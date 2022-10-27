const express = require("express");
const connectDB = require("./db");

const app = express();
app.post('/register',(req,res) => {
    /**
     * Request input sources:
     * - req body
     * - req params
     * - req header
     * - req cookies
     */
})



app.get("/", (_req, res) => {
  const obj = {
    name: "Ayman",
    email: "ayman@gmail.com",
  };
  res.json(obj);
});


connectDB("mongodb://localhost:27017/attendance-db")
  .then(() => {
    app.listen(4000, () => {
      console.log("I am listening on port 4000");
    });
  })
  .catch((e) => {
    console.log(e);
  });
