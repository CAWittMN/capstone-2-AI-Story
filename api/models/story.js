const db = require("../db");
const { Model, DataTypes } = require("sequelize");
const Chapter = require("./chapter");
const { buildPrompt } = require("../helpers/prompt");
const { openai } = require("../openAiApi");
const { OPENAI_API_MODEL } = require("../config");

/**
 * Story model.
 * Represents a story.
 * Can generate a new story by calling Story.generateNewStory().
 *
 */
class Story extends Model {
  /**
   * Generate a new story.
   * Creates a new story instance and content for the first chapter.
   */
  static async generateNewStory(info, userID) {
    // generate content
    const prompt = buildPrompt(info);
    const response = await openai.chat.completions.create({
      model: OPENAI_API_MODEL,
      messages: prompt,
      response_format: { type: "json_object" },
      stream: false,
    });

    const content = JSON.parse(response.choices[0].message.content);

    // create new story in database
    const newStory = await Story.create({
      ...info,
      title: content.title,
      // moods: info.moods,
      // genre: info.genre,
      // demographic: info.demographic,
      // charName: info.charName,
      // charInfo: info.charInfo,
      setting: info.setting ? info.setting : content.setting,
      // maxChapters: info.maxChapters,
      // genImages: info.genImages,
      // genAudio: info.genAudio,
      // additionalPrompt: info.additionalPrompt,
      currSummary: content.summary,
      UserId: userID,
    });

    // return the new story and the content
    return { newStory, firstChapterContent: content };
  }
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
    demographic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    charName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    charInfo: {
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
