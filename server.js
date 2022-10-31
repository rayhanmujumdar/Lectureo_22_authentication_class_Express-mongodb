require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
const User = require("./models/User");
const {verifyToken} = require('./middleware/authenticate')
const routes = require('./routes/index')
// middleware
const app = express();
app.use(express.json());
app.use(routes)

// token middleware


app.get("/private", verifyToken, async (req, res, next) => {
  try{
    const user = req.decoded
    const findUser = await User.findById(user._id)
    if(findUser){
      return res.status(200).json({ message: "This is my private route" });
    }
  }catch(e){
    // next(e)
  }
});

app.post("/public", (req, res) => {
  return res.status(200).json({ message: "This is my public route" });
});

app.use((err, _req, res, _next) => {
  res.status(500).json({ message: "Internal server errors"});
});

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
