const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authUser = async (
  req,
  res,
  { user, databasePassword, password, UserPasswordModel }
) => {
  const isMatch = await bcrypt.compare(
    databasePassword.salt + password,
    databasePassword.password
  );

  if (!isMatch)
    return res.status(403).json({
      success: false,
      result: null,
      message: "Invalid credentials.",
    });

  if (isMatch === true) {
    const token = jwt.sign(
      {
        id: user._id,
      },
      "Meetraj@2511",
      { expiresIn: req.body.remember ? 365 * 24 + "h" : "24h" }
    );

    await UserPasswordModel.findOneAndUpdate(
      { user: user._id },
      { $push: { loggedSessions: token } },
      {
        new: true,
      }
    ).exec();

    res
      .status(200)
      // .cookie("username","Meetraj@2511")
      .cookie("token", token, {
        maxAge: req.body.remember ? 365 * 24 * 60 * 60 * 1000 : null,
        sameSite: "Lax",
        httpOnly: false,
        secure: false,
        domain: req.hostname,
        path: "/",
        Partitioned: true,
      })
      // .setHeader('Set-Cookie', 'username=JohnDoe; Max-Age=3600; Path=/; HttpOnly')
      .json({
        success: true,
        result: {
          _id: user._id,
          name: user.name,
          surname: user.surname,
          role: user.role,
          email: user.email,
          photo: user.photo,
        },
        message: "Successfully login user",
      });
  } else {
    return res.status(403).json({
      success: false,
      result: null,
      message: "Invalid credentials.",
    });
  }
};

module.exports = authUser;
