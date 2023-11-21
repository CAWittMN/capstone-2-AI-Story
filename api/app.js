const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { authenticateJWT } = require("./middleware/auth");
const { NotFoundError } = require("./expressError");
const { db } = require("./db");

const authRoutes = require("./routes/auth.js");
const usersRoutes = require("./routes/users.js");
const storiesRoutes = require("./routes/stories.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(authenticateJWT);
app.use(morgan("tiny"));

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/stories", storiesRoutes);

app.use(function (req, res, next) {
  return next(new NotFoundError());
});

app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;
  return res.status(status).json({
    error: { message, status },
  });
});
module.exports = { app };
