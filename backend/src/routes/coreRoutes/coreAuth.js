const express = require("express");

const router = express.Router();

const { catchErrors } = require("../../handlers/errorHandlers");
const adminAuth = require("../../controllers/coreControllers/adminAuth/index");

router.route("/login").post(adminAuth.login);
router.route("/register").post(adminAuth.register);

router
  .route("/logout")
  .post(adminAuth.isValidAuthToken, catchErrors(adminAuth.logout));

module.exports = router;
