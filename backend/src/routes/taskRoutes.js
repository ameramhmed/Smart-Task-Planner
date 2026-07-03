const express = require("express");
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", taskController.listTasks);
router.post("/", taskController.createTask);
router.get("/stats", taskController.taskStats);
router.get("/:id", taskController.getTask);
router.patch("/:id", taskController.updateTask);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
