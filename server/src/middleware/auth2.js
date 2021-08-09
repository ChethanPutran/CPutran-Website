const jwt = require("jsonwebtoken");
const Register = require("../models/registers");

const auth2 = (req) => {
  try {
    const token = req.cookies.jwt;
    const verifyUser = jwt.verify(token, "asdfgjkiuytfvbkhgbnlkjhgvbkjhgfv");

    const user = Register.findOne({ _id: verifyUser._id });

    req.token = token;
    req.user = user;

    return true;
  } catch (error) {
    return false;
  }
};

module.exports = auth2;
