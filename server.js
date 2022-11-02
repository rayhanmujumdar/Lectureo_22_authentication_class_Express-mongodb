require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
const User = require("./models/User");
const verifyToken = require('./middleware/authenticate')
const routes = require('./routes/index')
const morgan = require('morgan')
// middleware
const app = express();
app.use(express.json());
app.use(routes)
app.use(morgan('dev'))
// token middleware


app.get("/private", verifyToken, async (req, res, next) => {
  try{
    const user = req.decoded
    const findUser = await User.findById(user._id)
    if(findUser){
      return res.status(200).json({ message: "This is my private route" });
    }
  }catch(e){
    next(e)
  }
});

app.post("/public", (req, res) => {
  return res.status(200).json({ message: "This is my public route" });
});

app.use((err, _req, res, _next) => {
  const message = err.message ? err.message : "Internal server errors"
  const status = err.status ? err.status : 500
  res.status(status).json({message});
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
    console.log("Database connected")
    app.listen(4000, () => {
      console.log("I am listening on port 4000");
    });
  })
  .catch((e) => {
    console.log(e);
  });
