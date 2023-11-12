const express = require("express");
const User = require("../models/user");
const { ensureAdmin, ensureCorrectUser } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
//const jsonschema = require("jsonschema");
//const userUpdateSchema = require("../schemas/userUpdate.json");

const router = express.Router();

/**
 * GET / => { users: [ {...user }, {...user}, ...]}
 *
 * Returns list of all users.
 *
 * Authorization required: admin
 */
router.get("/", ensureAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll();
    return res.json({ users });
  } catch (error) {
    return next(error);
  }
});

/**
 * Get /get-username => { username }
 * Returns username of current user
 *
 * Authorization required: logged in
 */
router.get("/get-username", ensureCorrectUser, async (req, res, next) => {
  try {
    const { username } = res.locals.user;
    return res.json({ username });
  } catch (error) {
    return next(error);
  }
});

/**
 * GET /:username => { user }
 *
 * Returns user
 *  with all user stories stories
 *
 * Authorization required: admin or same user-as-:username
 */
router.get("/:username", ensureCorrectUser, async (req, res, next) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({
      where: { username },
    });
    return res.json({ user });
  } catch (error) {
    return next(error);
  }
});

/**
 * PATCH /:username => { user }
 *
 * Updates user info and returns updated user
 *
 * Authorization required: admin or same user-as-:username
 */
router.patch("/:username", ensureCorrectUser, async (req, res, next) => {
  const { username } = req.params;
  try {
    // const validator = jsonschema.validate(req.body, userUpdateSchema);
    // if (!validator.valid) {
    //   const errs = validator.errors.map((e) => e.stack);
    //   throw new BadRequestError(errs);
    // }
    const user = await User.findOne({
      where: { username },
    });
    const updatedUser = await user.update(req.body);
    return res.json({ user: updatedUser });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
