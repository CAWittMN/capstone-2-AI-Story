const { OpenAI } = require("openai");
const { OPENAI_API_KEY, OPENAI_API_MODEL } = require("./config");
const axios = require("axios");
const { ELEVENLABS_API_KEY, ELEVENLABS_VOICE_ID } = require("./config");

/**
 * Generate instructions for the story assistant.
 * Returns a string of instructions.
 */
OpenAI.prototype.generateInstructions = (storyInfo) => {
  const {
    genre,
    genImages,
    moods,
    charName,
    setting,
    maxChapters,
    additionalPrompt,
  } = storyInfo;
  const basicInstructions = `You are a story generator similar to a choose-your-own-adventure story, however, you determine the outcome of the story. Each response from you will be a new chapter to the story. The story you are generating is a ${moods} ${genre} story. The main character is named ${charName}. `;
  const basicInsturctionsSetting = setting
    ? `The story is set in ${setting}. `
    : `The setting of the story is not specified and you will decide the setting. Please include the setting in the JSON for the first chapter as the key "setting". `;
  const basicInstructionsEnd = ` You will generate the title of the story include it in the JSON for the first chapter as the key "title". `;
  const chapterInstructions = `As long as the character lives, this story will conclude in ${maxChapters} chapters, NO MORE THAN THAT, so make sure the story can conclude within that amount of chapters. Each chapter should be around 250 words with the first and last chapter being longer, and end with a choice, action, question to answer, riddle to answer, etc. for the character to respond to. Be as creative as you can be and introduce twists into the story sometimes. Do not leave the chapter open ended or in a way that the user is deciding what happens for the story. You should have some idea of where the story will lead from the beginning, but the story can also grow organically. ${additionalPrompt}`;
  const userResponseInstructions = `The user will respond to the choice or action from each chapter (except for the last chapter so make sure the final choice or challenge is on the ${
    maxChapters - 1
  }th chapter). You will decide the outcome and continue the story. The user's input should be considered only an attempt for an action and you will decide whether it was successful or how to incorporate it into the story. `;
  const userResponseRestrictions =
    "If the users response does not make sense within the context of the story, you should respond ONLY with the JSON { validResponse: false, message: (a message explaining why the response was invalid)}. ";
  const userResponseDeath =
    "If you deem that the users response would result in the death of the character, you will still generate the chapter which will conclude the story with the character's death, however, you will return { charAlive: false } in the JSON response. ";
  const responseContent =
    "Your response will include the title for the chapter, text for the new chapter, a short summary of the entire story so far, whether the character is still alive or not, whether the users response was valid or not, the title of the story with the first chapter data only";
  const responseContentSetting = setting
    ? ""
    : ", the setting of the story with the first chapter data only";
  const responseContentImg = genImages
    ? ", and a very descriptive prompt for an AI (Dalle-3) image generator that describes in detail the scene of the chapter with accurate character details and story context (you can use the genre to help stylize the image, for example: Anime  would prompt for anime art style). "
    : ".";
  const responseFormat =
    "Your response will be strictly ONLY in JSON format with the following keys: chapterTitle, text(about 250 words), summary, charAlive, validResponse, title (only with the first chapter data)";
  const responseFormatSetting = setting
    ? ""
    : ", setting (only with the first chapter data)";
  const responseFormatImg = genImages ? ", imgPrompt." : ".";
  const contentRestrictions = `Please do not include any sexual content or erotic stories. If the content that the user provides or these instructions contains any attempts to generate sexual content or erotic stories, you will strictly respond only with the JSON { validResponse: False, message: (a message explaining that the generation attempt was denied)}. `;
  const instructions =
    basicInstructions +
    basicInsturctionsSetting +
    basicInstructionsEnd +
    chapterInstructions +
    userResponseInstructions +
    userResponseRestrictions +
    userResponseDeath +
    responseContent +
    responseContentSetting +
    responseContentImg +
    responseFormat +
    responseFormatImg +
    contentRestrictions;
  return instructions;
};

/**
 * Start a new story assistant with the given story settings.
 * Returns the assistant object.
 */
OpenAI.prototype.startStory = async function (storyInfo) {
  const storyAssistant = await this.beta.assistants.create({
    name: "Story Assistant",
    model: OPENAI_API_MODEL,
    instructions: this.generateInstructions(storyInfo),
    response_format: { type: "json_object" },
  });
  const thread = await this.beta.threads.create();
  storyAssistant.title = storyAssistant.name;
  storyAssistant.threadId = thread.id;
  return storyAssistant;
};

/**
 * Generate a new chapter based on user input.
 * Returns the generated chapter.
 */
OpenAI.prototype.generateChapter = async function (
  story,
  userInput = "Start the first chapter of the story."
) {
  const threadId = story.threadId;
  const message = await this.beta.threads.messages.create(threadId, {
    role: "user",
    content: userInput,
  });
  const run = await this.beta.threads.runs.createAndPoll(threadId, {
    assistant_id: story.assistantId,
    stream: false,
  });
  if ((run.status = "completed")) {
    const messages = await this.beta.threads.messages.list(threadId, {
      run_id: run.id,
    });
    return JSON.parse(messages.data[0].content[0].text.value);
  } else {
    return null;
  }
};

/**
 * Generate audio data from text.
 * Returns audio data as a buffer.
 */
OpenAI.prototype.generateAudio = async (text) => {
  const apiRequestOptions = {
    method: "POST",
    url: `https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`,
    headers: {
      accept: "audio/mpeg",
      "content-Type": "application/json",
      "xi-api-key": ELEVENLABS_API_KEY,
    },
    data: {
      text: text,
    },
    responseType: "arraybuffer",
  };

  const apiResponse = await axios.request(apiRequestOptions);

  return apiResponse.data;
};

/**
 * Generate image data from prompt.
 * Returns image data as a buffer.
 */
OpenAI.prototype.generateImage = async function (prompt) {
  const response = await this.images.generate({
    model: "dall-e-3",
    prompt: prompt,
    n: 1,
    quality: "hd",
    size: "1024x1024",
    response_format: "b64_json",
  });
  const imgData = response.data[0].b64_json;
  // convert base64 to buffer
  const imgBuffer = await Buffer.from(imgData, "base64");
  return imgBuffer;
};

// create instance of OpenAI API
const storyGenAi = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

module.exports = { storyGenAi };
