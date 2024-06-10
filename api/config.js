require("dotenv").config();
require("colors");

const DB_URI = process.env.DB_URI;

const SECRET_KEY = process.env.SECRET_KEY || "secret";

const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const OPENAI_API_MODEL = process.env.OPENAI_API_MODEL || "gpt-3.5-turbo";

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

const ELEVENLABS_VOICE_ID = process.env.ELEVENLABS_VOICE_ID;

const PORT = process.env.PORT || 5000;
console.log("---");
console.log("Story_Gen Config:".cyan);
console.log("SECRET_KEY:".yellow, SECRET_KEY);
console.log("PORT:".yellow, PORT.toString());
console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
console.log("Database:".yellow, DB_URI);
console.log(
  "OpenAI API Key Loaded:".yellow,
  OPENAI_API_KEY !== undefined ? "Yes".green : "No".red
);
console.log(
  "Eleven Labs API Key Loaded:".yellow,
  ELEVENLABS_API_KEY !== undefined ? "Yes".green : "No".red
);
console.log("---");

module.exports = {
  DB_URI,
  SECRET_KEY,
  BCRYPT_WORK_FACTOR,
  OPENAI_API_KEY,
  ELEVENLABS_API_KEY,
  ELEVENLABS_VOICE_ID,
  PORT,
  OPENAI_API_MODEL,
};
