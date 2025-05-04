const login = require("./login");
const register = require("./register");
const isValidAuthToken = require("./isValidAuthToken");
const logout = require("./logout");

const createAuthMiddleware = (userModel) => {
  let authMethods = {};

  authMethods.register = (req, res) => {
    register(req, res, {
      userModel,
    });
  };

  authMethods.login = (req, res) =>
    login(req, res, {
      userModel,
    });

  authMethods.isValidAuthToken = (req, res) =>
    isValidAuthToken(req, res, {
      userModel,
    });

  authMethods.logout = (req, res) =>
    logout(req, res, {
      userModel,
    });

  return authMethods;
};

module.exports = createAuthMiddleware;
