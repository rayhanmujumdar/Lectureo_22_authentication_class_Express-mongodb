// const jwt = require("jsonwebtoken");
exports.verifyToken = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({ message: "UnAuthorization" });
    }
    token = token.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (err) {
        return res.status(400).json({ message: "UnAuthorization" });
      }
      req.decoded = decoded
      next()
    });
  };
  