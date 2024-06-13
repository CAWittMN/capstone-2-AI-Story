const db = require("../db");
const { Model, DataTypes } = require("sequelize");
const Chapter = require("./chapter");
const { storyGenAi } = require("../storyGenAiApi");

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
  static async generateNewStory(storyInfo, userID) {
    // generate story assistant
    const aiInfo = await storyGenAi.startStory(storyInfo);
    // create new story in database
    const newStory = await Story.create({
      ...storyInfo,
      UserId: userID,
      threadId: aiInfo.threadId,
      assistantId: aiInfo.id,
    });
    // return the new story and the content
    return newStory;
  }
}

Story.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: true,
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
    assistantId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    threadId: {
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
