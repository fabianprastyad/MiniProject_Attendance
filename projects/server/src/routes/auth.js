const { auth: authController } = require("../controllers");
const router = require("express").Router();

router.post("/login", authController.login);
router.post("/forgot", authController.forgot);

module.exports = router;
