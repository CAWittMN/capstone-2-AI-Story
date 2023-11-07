const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/auth.js");
const usersRoutes = require("./routes/users.js");
const storiesRoutes = require("./routes/stories.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/stories", storiesRoutes);

module.exports = app;
