const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const mongoose = require("mongoose");
const checkAndCorrectURL = require("./checkAndCorrectURL");
const AdminPassword = require("../../../models/coreModels/AdminPassword");
const Admin = require("../../../models/coreModels/Admin");

const register = async (req, res, { userModel }) => {
  const UserModel = Admin;
  const PasswordInstance = new AdminPassword();

  const { name, email, password, country } = req.body;

  const objectSchema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: true } })
      .required(),
    name: Joi.string().required(),
    country: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { error, value } = objectSchema.validate({
    name,
    email,
    password,
    country,
  });
  if (error) {
    return res.status(409).json({
      success: false,
      result: null,
      error: error,
      message: "Invalid/Missing credentials.",
      errorMessage: error.message,
    });
  }

  const user = await UserModel.findOne({ email: email, removed: false });
  if (user)
    return res.status(409).json({
      success: false,
      result: null,
      message: "An account with this email already exists.",
    });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await PasswordInstance.generateHash(salt, password);

  const newUser = {
    name: name,
    email: email,
    country: country,
    enabled: true,
  };
  const createdUser = await UserModel.create(newUser);
  const newUserPassword = new AdminPassword({
    removed: false,
    user: createdUser,
    password: hashedPassword,
    salt: salt,
    emailVerified: false,
    authType: "email",
    loggedSessions: [],
  });
  const newPassword = await newUserPassword.save();

  if (!createdUser || !newUserPassword) {
    return res.status(500).json({
      success: false,
      result: null,
      message: "Error creating your account.",
    });
  } else {
    const success = {
      success: true,
    };
    const newUser = { ...createdUser, ...success };
    return res.status(200).json(newUser);
  }
};

module.exports = register;
