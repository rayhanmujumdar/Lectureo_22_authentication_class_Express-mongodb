const jwt = require("jsonwebtoken");
const User = require("../models/User");
exports.verifyToken = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(400).json({ message: "UnAuthorization" });
  }
  token = token.split(" ")[1];
  jwt.verify(token, process.env.SECRET_KEY, async function (err, user) {
    if (err) {
      return res.status(400).json({ message: "UnAuthorization" });
    }
    user = await User.findById(user._id);
    req.decoded = user;
    next();
  });
};
