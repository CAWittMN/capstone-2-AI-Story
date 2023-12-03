"use strict";

/** Convenience middleware to handle common auth cases in routes. */

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../expressError");

/** Middleware: Authenticate user.
 *
 * If a token was provided, verify it, and, if valid, store the token payload
 * on res.locals (this will include the username and isAdmin field.)
 *
 * It's not an error if no token was provided or if the token is not valid.
 */
const authenticateJWT = (req, res, next) => {
  try {
    const authHeader = req.headers && req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace(/^[Bb]earer /, "").trim();
      res.locals.user = jwt.verify(token, SECRET_KEY);
    }
    return next();
  } catch (err) {
    return next();
  }
};

/** Middleware: Ensure user is logged in.
 *
 * If a request has res.locals.user, the user is logged in, so allow
 * the next function to continue.
 *
 * If not, raise UnauthorizedError
 */
const ensureLoggedIn = (req, res, next) => {
  try {
    if (!res.locals.user) throw new UnauthorizedError();
    return next();
  } catch (err) {
    return next(err);
  }
};

/** Middleware: Ensure user is admin.
 *
 * If a request has res.locals.user and isAdmin is true, the user is admin, so allow
 * the next function to continue.
 *
 * If not, raise UnauthorizedError
 */
const ensureAdmin = (req, res, next) => {
  try {
    if (!res.locals.user || !res.locals.user.isAdmin) {
      throw new UnauthorizedError();
    }
    return next();
  } catch (err) {
    return next(err);
  }
};

/** Middleware: Ensure user is admin or correct user.
 *
 * If a request username param matches the username in res.locals.user, the user is correct, so allow
 * the next function to continue. Continue if user is admin regardless of username param.
 *
 * If not, raise UnauthorizedError
 */
const ensureCorrectUser = (req, res, next) => {
  try {
    if (!res.locals.user) throw new UnauthorizedError();
    else if (res.locals.user.isAdmin) return next();
    else if (res.locals.user.username !== req.params.username)
      throw new UnauthorizedError();
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  authenticateJWT,
  ensureLoggedIn,
  ensureAdmin,
  ensureCorrectUser,
};
