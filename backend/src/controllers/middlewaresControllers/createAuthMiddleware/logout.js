// const jwt = require("jsonwebtoken");

// const logout = async (req, res, { userModel }) => {
//   try {
//     const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         result: null,
//         message: "No authentication token found",
//       });
//     }

//     // Clear the token cookie
//     res.clearCookie("token", {
//       sameSite: "Lax",
//       httpOnly: true,
//       secure: false,
//       domain: req.hostname,
//       path: "/",
//     });

//     // Remove the token from logged sessions in the database
//     const decoded = jwt.verify(token, "Meetraj@2511");
//     const user = await userModel.findById(decoded.id);

//     if (user) {
//       await userModel.findByIdAndUpdate(
//         decoded.id,
//         { $pull: { loggedSessions: token } },
//         { new: true }
//       );
//     }

//     return res.status(200).json({
//       success: true,
//       result: null,
//       message: "Successfully logged out",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       result: null,
//       message: "Error during logout",
//     });
//   }
// };

// module.exports = logout;
// const mongoose = require("mongoose");

// const logout = async (req, res, { userModel }) => {
//   const UserPasswordModel = mongoose.model(userModel, "Password");

//   // console.log(req.body.currentAdmin);
//   const token = req.cookies.token;
//   await UserPasswordModel.findOneAndUpdate(
//     { user: req.admin._id },
//     { $pull: { loggedSessions: token } },
//     {
//       new: true,
//     }
//   ).exec();

//   res
//     .clearCookie("token", {
//       maxAge: null,
//       sameSite: "none",
//       httpOnly: true,
//       secure: true,
//       domain: req.hostname,
//       path: "/",
//     })
//     .json({
//       success: true,
//       result: {},
//       message: "Successfully logout",
//     });
// };

// module.exports = logout;
const mongoose = require("mongoose");
const logout = async (req, res, next, { userModel }) => {
  // userModel must be the **string** 'AdminPassword'
  const AdminPasswordModel = mongoose.model(userModel, "Password");

  const token = req.cookies.token;

  await AdminPasswordModel.findOneAndUpdate(
    { user: req.admin._id },
    { $pull: { loggedSessions: token } },
    { new: true }
  ).exec();

  res
    .clearCookie("token", {
      sameSite: "none",
      httpOnly: true,
      secure: true,
      domain: req.hostname,
      path: "/",
    })
    .json({
      success: true,
      result: {},
      message: "Successfully logout",
    });
};

module.exports = logout;
