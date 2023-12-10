const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { authenticateJWT } = require("./middleware/auth");
const { NotFoundError } = require("./expressError");

const authRoutes = require("./routes/auth.js");
const usersRoutes = require("./routes/users.js");
const storiesRoutes = require("./routes/stories.js");

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(authenticateJWT);
app.use(morgan("tiny"));

// routes
app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/stories", storiesRoutes);

// 404 handler
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
