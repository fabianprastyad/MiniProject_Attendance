const router = require("express").Router();
const { attendance } = require("../controllers");
const { verifyToken } = require("../middleware/auth");

router.post("/clockin", verifyToken, attendance.clockIn);
router.post("/clockout", verifyToken, attendance.clockOut);
router.get("/attendancereport", verifyToken, attendance.attendanceReport);

module.exports = router;

module.exports = router;
