require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const {verifyToken} = require('./middleware/authenticate')
// middleware
const app = express();
app.use(express.json());

// token middleware

app.post("/register", async (req, res, next) => {
  /**
   * Request input sources:
   * - req body
   * - req params
   * - req header
   * - req cookies
   */
  try {
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
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    user.password = hash;
    await user.save();
    return res.status(201).json({ message: "user created successfully", user });
  } catch (e) {
    next(e);
  }
});

app.post("/login", async (req, res, next) => {
  /* 
    email = input
    password = input
    user = find user with email
    if user not found
    return 400 error
    if password not equal to user.hash
    return 400 error 
    token = generate token using user
    return token
    end
  */

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        message: "user not find",
      });
    }
    // const method = Object.getOwnPropertyNames(user)
    const isUserPass = await bcrypt.compare(password, user.password);
    if (!isUserPass) {
      return res.status(400).json({ message: "Password is not matching" });
    }
    delete user._doc.password;
    const token = jwt.sign(user._doc, process.env.SECRET_KEY, {
      expiresIn: "2h",
    });
    console.log(token);
    res.status(201).json({
      message: "success",
      token,
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

app.get("/private", verifyToken, async (req, res, next) => {
  console.log(req.decoded)
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
