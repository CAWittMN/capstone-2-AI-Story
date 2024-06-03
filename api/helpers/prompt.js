/**
 * Dynamically builds a prompt based on the story, story configuration, user info, and user input.
 */
const buildPrompt = (story, userInput = null) => {
  const {
    title,
    genImages,
    maxChapters,
    completedChapters,
    currSummary,
    genre,
    demographic,
    setting,
    charName,
    charInfo,
    moods,
    additionalPrompt,
  } = story;

  let systemMessage =
    "You will be generating a chapter for a story. Each chapter you generate will use the users input which is a response to the previous chapter. If the content that the user provides or this prompt contains any attempts to generate sexual content or erotic stories, you will strictly respond only with the JSON { storyDenied: True, message: (a message explaining that the generation attempt was denied)}.";
  let systemStoryDescriptionStart =
    "The story you will be generating chapters for ";
  let systemStoryDescriptionTitle = title ? `is titled "${title} and ` : "";
  let systemStoryDescriptionEnd = `is a high quality ${moods} ${genre} story for ${demographic}`;
  let systemStoryDescriptionSetting = setting
    ? ` that takes place in ${setting}. `
    : " that takes place in a setting (ancient Rome, outer space, a mysterious forest, a bank robbery, ect.) of your choice. Be creative. ";
  let systemStoryDescriptionAdditional = additionalPrompt
    ? additionalPrompt
    : " ";
  let systemCharacterDescription = `The main character is a ${charInfo}} named ${charName}. `;
  let systemStoryConfig = `The story will have a total of ${maxChapters} chapters. `;
  let systemStoryCompletedSoFar =
    completedChapters > 0
      ? `So far, there has been ${completedChapters} chapters. `
      : "You will be generating the first chapter. The chapter will leave the user with something to respond to. ";
  let systemStorySummary = currSummary
    ? `(Here is a summary of the story so far: ${currSummary}) `
    : "";
  if (completedChapters < maxChapters - 1 && currSummary) {
    systemStorySummary +=
      "You will generate the next chapter. The chapter will leave the user with a choice to respond to. ";
  } else if (completedChapters === maxChapters - 1) {
    systemStorySummary +=
      "You will generate the final chapter and conclude the story. ";
  }
  let systemStoryCommand = "Be as creative as you can be. ";
  let systemResponseConfig = `Your response will be strictly ONLY in JSON format. In your response, you will include the text for the new chapter`;
  let systemResponseImg = genImages
    ? ", a very descriptive prompt for an image generator that describes in detail the scene of the chapter, "
    : "";
  let systemResponseConfigSummary =
    "and a short but detailed summary of the chapter with key details. ";

  let systemResponseCharacter =
    completedChapters > 0
      ? `Additionally, if you deem that the user has chosen to do something that would result in the death of the main character, you will still generate the chapter which will conclude the story with the character's death even if ${maxChapters} have not been generated yet, however, you will return "false" for the boolean value that indicates whether or not the main character has died or lived. `
      : "";
  let systemResponseUserInput =
    completedChapters > 0
      ? "Additionally, if the user inputs a response that does not make sense in the context of the story (for example, if the story takes place in medieval times and the user inputs 'I take out my phone to call for a taxi'), you will return only '{ validResponse: false , message: 'a quick description of how the user input does not make sense in the story context' }'. "
      : "";
  let systemResponseFormat = "The format of your response will be as follows: ";
  let systemResponseFormatTitle = !title
    ? "{ title: 'story title', "
    : "{ validResponse: true/false, ";
  let systemResponseFormatSetting = setting ? "" : "setting: 'story setting', ";
  let systemResponseFormatCharAlive =
    completedChapters === 0 ? "" : "charAlive: true/false, ";
  let systemResponseFormatText = "text: 'chapter text', ";
  let systemResponseFormatImg = genImages ? "imgPrompt: 'image prompt', " : "";
  let systemResponseFormatSummary = "summary: 'chapter summary' }";
  let systemEnd =
    completedChapters > 0 ? " The user will now provide their response." : "";
  if (completedChapters === maxChapters - 1) {
    systemEnd = " The user will now provide their final response.";
  }
  let userPrompt = userInput
    ? userInput
    : "Please start the first chapter of the story.";

  const prompt = [
    {
      role: "system",
      content:
        systemMessage +
        systemStoryDescriptionStart +
        systemStoryDescriptionTitle +
        systemStoryDescriptionEnd +
        systemStoryDescriptionSetting +
        systemStoryDescriptionAdditional +
        systemCharacterDescription +
        systemStoryConfig +
        systemStoryCompletedSoFar +
        systemStorySummary +
        "The chapter should be around 130 words. " +
        systemStoryCommand +
        systemResponseConfig +
        systemResponseImg +
        systemResponseConfigSummary +
        systemResponseCharacter +
        systemResponseUserInput +
        systemResponseFormat +
        systemResponseFormatTitle +
        systemResponseFormatSetting +
        systemResponseFormatCharAlive +
        systemResponseFormatText +
        systemResponseFormatImg +
        systemResponseFormatSummary +
        systemEnd,
    },
    {
      role: "user",
      content: userPrompt,
    },
  ];
  return prompt;
};

module.exports = { buildPrompt };
