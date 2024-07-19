const CustomError = require("../config/customError");
const {User} = require("../models/userModel");

const authentication = async (req, res, next) => {
  const user = await User.findOne({ _id: req.session.user_id });
  if (user && user.password === req.session?.password) {
    req.user = user;
    next();
  } else {
    req.session = null;
    throw new CustomError('Unauthorized! - You should login first!');
  }
};
module.exports = authentication;