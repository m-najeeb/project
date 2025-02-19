const { Router } = require("express");
const userController = require("../controllers/userController");
const verifyToken = require("../../src/middleware/verifyToken");

const router = Router();

router.post("/sign-up", userController.signUp);
router.post("/sign-in", userController.signIn);
router.post("/verify-otp", userController.verifyOTP);
router.post("/profile-edit", verifyToken, userController.profileEdit);

module.exports = router;
