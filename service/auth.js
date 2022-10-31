const {findUserByProperty,createNewUser} = require('./user')
const {errorService} = require('./error')
const User = require("../models/User")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
exports.registerService = async ({ name, email, password }) => {
  let user = await findUserByProperty("email",email)
  if (user) {
    const err = new Error('user already exist')
    err.status = 400
    throw err
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return createNewUser({name,email,password: hash})
};

exports.loginService = async ({ email, password }) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    throw errorService(400,"user not found")
  }
  // const method = Object.getOwnPropertyNames(user)
  const isUserPass = await bcrypt.compare(password, user.password);
  if (!isUserPass) {
    throw errorService(400,"Password not match")
  }
  const playLoad = {
    _id: user._id,
    name: user.name,
    email: user.email,
    roles: user.roles,
    accountStatus: user.accountStatus
  }
  return jwt.sign(playLoad, process.env.SECRET_KEY, {
    expiresIn: "2h",
  });
};
