const { employee } = require("../controllers");
const { verifyToken, verifyAdmin } = require("../middleware/auth");
const router = require("express").Router();

router.post("/registration", verifyToken, verifyAdmin, employee.register);

module.exports = router;
