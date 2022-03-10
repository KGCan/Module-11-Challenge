const router = require("express").Router();
const tasks = require("../db/store");

// Get ALL tasks from the database
router.get("/tasks", (req, res) => {
    store 
    .getTasks()
    .then((tasks) => {
        return res.json(tasks);
    })
    .catch((err) => res.status(500).json(err));
});

router.post("/tasks", (req, res) => {
    store 
    .addTask(req.body)
    .then((tasks) => res.json(tasks))
    .catch((err) => res.status(500).json(err));
});

// Delete the task with the corresponding id
router.delete("/tasks/:id", (req, res) => {
    store 
    .removeTask(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;