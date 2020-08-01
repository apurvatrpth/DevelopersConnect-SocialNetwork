const { check } = require("express-validator");

UserValidator = [
  check("name", "Name is required").exists(),
  check("email", "Email is required").isEmail(),
  check("password", "Password should be 8 or more characters long").isLength({
    min: 8,
  }),
];

LoginValidator = [
  check("email", "Email is required").isEmail(),
  check("password", "Password should be 8 or more characters long").exists(),
];

ProfileValidator = [
  check("status", "Status is required").not().isEmpty(),
  check("skills", "Skills is required").not().isEmpty(),
];

module.exports = {
  UserValidator,
  LoginValidator,
  ProfileValidator,
};
