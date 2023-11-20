const db = require("../db");
const { Model, DataTypes } = require("sequelize");
const Chapter = require("./chapter");
const { buildPrompt } = require("../helpers/prompt");
const { openai } = require("../openAiApi");

/**
 * Story model.
 * Represents a story.
 * Can generate a new story by calling Story.generateNewStory().
 * @param {string} title - The title of the story.
 * @param {string} mood - The mood of the story.
 * @param {string} genre - The genre of the story.
 * @param {string} charName - The name of the character in the story.
 * @param {string} setting - The setting of the story.
 * @param {number} maxChapters - The maximum number of chapters in the story.
 * @param {boolean} genImages - Boolean value if the story generates images.
 * @param {boolean} genAudio - Boolean value if the story generates audio.
 * @param {boolean} charAlive - Boolean value if the character is alive.
 * @param {boolean} completed - Boolean value if the story is completed.
 * @param {string} currSummary - The current summary of the story.
 * @param {number} completedChapters - The number of completed chapters in the story.
 *
 */
class Story extends Model {
  /**
   * Generate a new story.
   * Creates a new story instance and content for the first chapter.
   */
  static async generateNewStory(inputs, user) {
    inputs.moods = inputs.moods.join(", ");
    // generate content
    const prompt = buildPrompt(inputs, user);
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      messages: prompt,
      stream: false,
    });

    const content = JSON.parse(response.choices[0].message.content);

    // create new story in database
    const newStory = await Story.create({
      title: content.title,
      moods: inputs.moods,
      genre: inputs.genre,
      charName: inputs.charName,
      setting: inputs.setting ? inputs.setting : content.setting,
      maxChapters: inputs.maxChapters,
      genImages: inputs.genImages,
      genAudio: inputs.genAudio,
      additionalPrompt: inputs.additionalPrompt,
      currSummary: content.summary,
      UserId: user.id,
    });
    return { newStory, content };
  }

  /**
   * Get a formatted string of the story's moods for display or text use.
   * @returns {string}
   */
}

Story.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    moods: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    charName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    setting: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    maxChapters: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
    },
    genImages: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    genAudio: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    charAlive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    currSummary: {
      type: DataTypes.STRING(10000),
      allowNull: true,
    },
    additionalPrompt: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    completedChapters: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
    },
  },
  {
    sequelize: db,
    modelName: "Story",
    tableName: "stories",
  }
);

Story.hasMany(Chapter, { as: "chapters" });
Chapter.belongsTo(Story, { as: "story" });

module.exports = Story;
