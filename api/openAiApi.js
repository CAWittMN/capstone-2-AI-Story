const { OpenAI } = require("openai");
const { OPENAI_API_KEY, OPENAI_API_MODEL } = require("./config");
const openai = new OpenAI({
  response_format: { type: "json_object" },
  apiKey: OPENAI_API_KEY,
  model: OPENAI_API_MODEL,
});

module.exports = { openai };
