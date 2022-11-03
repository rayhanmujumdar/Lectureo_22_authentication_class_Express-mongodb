const User = require("../models/User");
const error = require('../utils/error')
const findUsers = () => {
  return User.find();
};

const findUserByProperty = (key, value) => {
  if (key === "_id") {
    return User.findById(value);
  }
  return User.findOne({ [key]: value });
};

const createNewUser = ({ name, email, password, roles, accountStatus }) => {
  const user = User({
    name,
    email,
    password,
    roles: roles ? roles : ["STUDENT"],
    accountStatus: accountStatus ? accountStatus : "ACTIVE",
  });
  return user.save();
};

const updateUserById = async (id,data) => {
  console.log(data.email)
  const user = await findUserByProperty('email',data?.email)
  console.log(user)
  if(user){
    throw error(400,"User already exist")
  }
  return User.findByIdAndUpdate(id,{...data},{new: true})
}
module.exports = {
  findUserByProperty,
  createNewUser,
  findUsers,
  updateUserById
};
