const { Sequelize } = require("sequelize");
const { DB_URI } = require("./config");

console.log("Connecting to database...".cyan);
const db = new Sequelize("story_gen", "postgres", "admin", {
  dialect: "postgres",
  host: "localhost",
});
const testConnection = async () => {
  try {
    console.log("Authenticating...".cyan);
    await db.authenticate();
    console.log("models:".yellow, db.models);
    console.log("Connection has been established successfully.".cyan);
    return db;
  } catch (error) {
    console.error("Unable to connect to the database:".red, error);
  }
};

db.sync();
testConnection();

module.exports = db;
