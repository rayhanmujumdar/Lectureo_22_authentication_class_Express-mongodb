const express = require("express");
const connectDB = require("./db");
const User = require("./models/User");
const bcrypt = require('bcrypt')
// middleware
const app = express();
app.use(express.json());

app.post("/register", async (req, res) => {
  /**
   * Request input sources:
   * - req body
   * - req params
   * - req header
   * - req cookies
   */
  const { name, email, password } = req?.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "invalid" });
  }
  // exec() use to if you find any error in your function
  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "user already exist" });
  }
  user = new User({
    name,
    email,
    password,
  });
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password,salt)
  user.password = hash
  await user.save();
  return res.status(201).json({ message: "user created successfully", user });
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
