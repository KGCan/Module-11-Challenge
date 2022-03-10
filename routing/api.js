const router = require("express").Router();
const tasks = require("../db/tasks.js");

// Get ALL tasks from the database
router.get("/tasks", (req, res) => {
    tasks 
    .getTasks()
    .then((tasks) => {
        return res.json(tasks);
    })
    .catch((err) => res.status(500).json(err));
});

router.post("/tasks", (req, res) => {
    tasks 
    .addTask(req.body)
    .then((tasks) => res.json(tasks))
    .catch((err) => res.status(500).json(err));
});

// Delete the task with the corresponding id
router.delete("/tasks/:id", (req, res) => {
    tasks 
    .removeTask(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;