const router = require("express").Router();
const notes = require("../db/notes");

// Get ALL notes from the database
router.get("/tasks", (req, res) => {
    notes 
    .getTasks()
    .then((tasks) => {
        return res.json(tasks);
    })
    .catch((err) => res.status(500).json(err));
});

router.post("/tasks", (req, res) => {
    notes 
    .addTask(req.body)
    .then((tasks) => res.json(tasks))
    .catch((err) => res.status(500).json(err));
});

// Delete the task with the corresponding id
router.delete("/tasks/:id", (req, res) => {
    notes 
    .removeTask(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;