"use strict";

const express = require("express");

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  UnprocessableEntityError,
} = require("../expressError");
const {
  authenticateJWT,
  ensureLoggedIn,
  ensureAdmin,
  ensureCorrectUser,
} = require("../middleware/auth");
const { createToken } = require("../helpers/tokens");

const User = require("../models/user");

const router = new express.Router();

/** POST / { user } => { user, token }
 *
 * Adds a new user.
 *
 * This returns the newly created user and an authentication token for them:
 *  { user: { username, password, age, gender, email, isAdmin }, token }
 *
 * Authorization required: none
 **/
router.post("/", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const token = createToken(user);
    return res.status(201).json({ user, token });
  } catch (err) {
    return next(err);
  }
});

/** GET / => { users: [ { username,  isAdmin }, ... ] }
 *
 * Returns list of all users.
 *
 * Authorization required: none
 **/
