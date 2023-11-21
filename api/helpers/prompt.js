const buildPrompt = (story, user, userInput = null) => {
  const {
    title,
    genImages,
    maxChapters,
    completedChapters,
    currSummary,
    genre,
    setting,
    charName,
    moods,
    additionalPrompt,
  } = story;

  const { age, gender } = user;
  const getDemographic = (age) => {
    if (age < 6) {
      return "toddlers";
    } else if (age < 13) {
      return "children";
    } else if (age < 18) {
      return "young adults";
    } else {
      return "adults";
    }
  };

  let systemMessage =
    "You will be generating a chapter for a story. Each chapter you generate is based off input from the user. ";
  let systemStoryDescriptionStart =
    "The story you will be generating chapters for ";
  let systemStoryDescriptionTitle = title ? `is titled "${title} and ` : "";
  let systemStoryDescriptionEnd = `is a high quality ${moods} ${genre} story for ${getDemographic(
    age
  )}`;
  let systemStoryDescriptionSetting = setting
    ? ` that takes place in ${setting}. `
    : " that takes place in a setting (ancient Rome, outer space, a mysterious forest, a bank robbery, ect.) of your choice. Be creative. ";
  let systemStoryDescriptionAdditional = additionalPrompt
    ? additionalPrompt
    : " ";
  let systemCharacterDescription = `The main character is a ${gender} named ${charName}. `;
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
  let systemResponseConfigSummary = currSummary
    ? "and a short but detailed summary of the chapter with key details. "
    : "and a summary of the story so far that includes the key details like setting, characters, and plot.";
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
  let systemResponseFormatSummary =
    completedChapters > 0
      ? "summary: 'new story summary' } "
      : "summary: 'chapter summary' }";
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
        "The chapter should be around 200 words. " +
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
