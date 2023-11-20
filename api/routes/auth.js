"use strict";

/** Routes for authentication */

const User = require("../models/user");
const express = require("express");
const router = new express.Router();
const { createToken } = require("../helpers/tokens");
//const jsonschema = require("jsonschema");
//const userLoginSchema = require("../schemas/userLogin.json");
//const userRegisterSchema = require("../schemas/userRegister.json");
const { BadRequestError } = require("../expressError");

/** POST /auth/login:   { username, password } => { token, user }
 *
 * Returns JWT to authenticate further requests and a user object.
 *
 * Authorization required: none
 */
router.post("/login", async function (req, res, next) {
  try {
    // const validator = jsonschema.validate(req.body, userLoginSchema);
    // if (!validator.valid) {
    //   const errs = validator.errors.map((e) => e.stack);
    //   throw new BadRequestError(errs);
    // }
    const { username, password } = req.body;
    const user = await User.login(username, password);
    const token = createToken(user);
    return res.json({ token, username: user.username });
  } catch (err) {
    return next(err);
  }
});

/** POST /auth/register: { user } => { token, user }
 *
 * user must include { username, password, firstName, lastName, age, gender }
 *
 * Returns JWT to authenticate further requests and a user object.
 *
 * Authorization required: none
 */
router.post("/register", async function (req, res, next) {
  try {
    // const validator = jsonschema.validate(req.body, userRegisterSchema);
    // if (!validator.valid) {
    //   const errs = validator.errors.map((e) => e.stack);
    //   throw new BadRequestError(errs);
    // }
    const newUser = await User.register({ ...req.body });
    const token = createToken(newUser);
    return res.status(201).json({ token, username: newUser.username });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
