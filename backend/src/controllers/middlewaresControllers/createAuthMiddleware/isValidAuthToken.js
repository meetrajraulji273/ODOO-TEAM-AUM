// const jwt = require("jsonwebtoken");

// const isValidAuthToken = async (req, res, next, { userModel }) => {
//   try {
//     const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         result: null,
//         message: "No authentication token found",
//       });
//     }

//     const decoded = jwt.verify(token, "Meetraj@2511");

//     const user = await userModel.findById(decoded.id);
//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         result: null,
//         message: "User not found",
//       });
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       result: null,
//       message: "Invalid or expired token",
//     });
//   }
// };

// module.exports = isValidAuthToken;

const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");

const isValidAuthToken = async (req, res, { userModel }) => {
  try {
    const UserPasswordModel = mongoose.model(userModel + "Password");
    const UserModel = mongoose.model(userModel);
    console.log(req.cookies.token);
    const token = req.cookies.token;
    if (!token)
      return res.status(401).json({
        success: false,
        result: null,
        message: "No authentication token, authorization denied.",
        jwtExpired: true,
      });

    const verified = jwt.verify(token, "Meetraj@2511");

    if (!verified)
      return res.status(401).json({
        success: false,
        result: null,
        message: "Token verification failed, authorization denied.",
        jwtExpired: true,
      });

    const userPasswordPromise = UserPasswordModel.findOne({
      user: verified.id,
      removed: false,
    });
    const userPromise = UserModel.findOne({ _id: verified.id, removed: false });

    const [user, userPassword] = await Promise.all([
      userPromise,
      userPasswordPromise,
    ]);

    if (!user)
      return res.status(401).json({
        success: false,
        result: null,
        message: "User doens't Exist, authorization denied.",
        jwtExpired: true,
      });

    const { loggedSessions } = userPassword;
    if (!loggedSessions.includes(token))
      return res.status(401).json({
        success: false,
        result: null,
        message: "User is already logout try to login, authorization denied.",
        jwtExpired: true,
      });
    else {
      const reqUserName = userModel.toLowerCase();
      req[reqUserName] = user;
      // next();
    }
  } catch (error) {
    return res.status(503).json({
      success: false,
      result: null,
      message: error.message,
      error: error,
      controller: "isValidAuthToken",
    });
  }
};

module.exports = isValidAuthToken;
