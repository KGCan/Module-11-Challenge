const express = require ("express");
const api = require("./routing/api");
const html = require("./routing/html");

const notetaker = express();
const PORT = process.env.PORT || 3001;

notetaker.use(express.json());
notetaker.use(express.urlencoded({ extended: true }));
notetaker.use(express.static("public"));
app.use("/api", api);
app.use("/", html);

app.listen(PORT, () => console.log(`App is listening on PORT: ${PORT}`));