const express = require("express");
const aiController = require("../controllers/aiController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, aiController.generatePlan);

module.exports = router;
