const express = require("express");
const router = express.Router();
const { getallEvents, getEvents, postEvents } = require("../controllers/eventController");
const { authenticateToken } = require('./middleware/authMiddleware');

router.get("/events", getallEvents);
router.get("/my-events", authenticateToken, getEvents);
router.post("/events", authenticateToken, postEvents);

module.exports = router;