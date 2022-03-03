const path = require ("path");
const router = require ("express").Router();

router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/tasks.html"));
});

router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;
