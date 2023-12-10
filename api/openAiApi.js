const { OpenAI } = require("openai");
const { OPENAI_API_KEY } = require("./config");

// create instance of OpenAI API
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

module.exports = { openai };
