const express = require ("express");
const api = require("./routing/api");
const html = require("./routing/html");

const taskmanager = express();
const PORT = process.env.PORT || 3001;

taskmanager.use(express.json());
taskmanager.use(express.urlencoded({ extended: true }));
taskmanager.use(express.static("public"));
app.use("/api", api);
app.use("/", html);

app.listen(PORT, () => console.log(`App is listening on PORT: ${PORT}`));