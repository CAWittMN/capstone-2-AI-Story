require("dotenv").config();

const DB_URI =
  process.env.NODE_ENV === "test"
    ? "postgresql:///story_gen_test"
    : "postgresql:///story_gen";

const SECRET_KEY = process.env.SECRET_KEY || "secret";

const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

const API_KEY = process.env.API_KEY || "YOUR_API_KEY";

const PORT = process.env.PORT || 5000;

console.log("Story_Gen Config:".green);
console.log("SECRET_KEY:".yellow, SECRET_KEY);
console.log("PORT:".yellow, PORT.toString());
console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
console.log("Database:".yellow, DB_URI);
console.log("---");

module.exports = {
  DB_URI,
  SECRET_KEY,
  BCRYPT_WORK_FACTOR,
  API_KEY,
  PORT,
};
