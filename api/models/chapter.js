const { Model, DataTypes } = require("sequelize");
const { openai } = require("../openAiApi");
const { elevenLabsApi } = require("../elevenLabsApi");
const { buildPrompt } = require("../helpers/prompt");
const db = require("../db");

/**
 * Chapter model.
 * Represents a chapter in a story.
 * Can generate a new chapter by calling Chapter.generateNewChapter().
 */
class Chapter extends Model {
  /**
   * Create a new chapter.
   * Generates content if none is provided.
   * Generates image and audio if story settings allow.
   * Returns the new chapter.
   */
  static async generateNewChapter(story, user, userInput, content = null) {
    let img = null;
    let audio = null;

    // if content is null, generate new content
    if (!content) {
      const prompt = buildPrompt(story, user, userInput);
      const response = await openai.chat.completions.create({
        model: "gpt-4-1106-preview",
        messages: prompt,
        stream: false,
        response_format: { type: "json_object" },
      });
      content = JSON.parse(response.choices[0].message.content);
    }
    if (content.validResponse === false) {
      return content;
    }

    // generate image and/or audio if story settings allow
    if (story.genImages && story.genAudio) {
      img = await Chapter.generateImage(content.imgPrompt);
      audio = await Chapter.generateAudio(content.text);
    } else if (story.genAudio && !story.genImage) {
      audio = await Chapter.generateAudio(content.text);
    } else if (!story.genAudio && story.genImages) {
      img = await Chapter.generateImage(content.imgPrompt);
    }

    // create new chapter in database.
    const newChapter = await Chapter.create({
      text: content.text.replace(/\n/g, " "), // remove newlines if any
      img: img,
      audio: audio,
      userPrompt: userInput,
      StoryId: story.id,
      charAlive: content.charAlive,
    });

    newChapter.dataValues.validResponse = content.validResponse;
    newChapter.dataValues.newSummary = content.summary;

    return newChapter;
  }

  /**
   * Generate image data.
   */
  static async generateImage(imgPrompt) {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: imgPrompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    const imgData = response.data[0].b64_json;

    const imgBuffer = await Buffer.from(imgData, "base64"); // convert base64 to buffer
    return imgBuffer;
  }

  /**
   * Generate audio data.
   */
  static async generateAudio(text) {
    const audioData = await elevenLabsApi.getAudio(text);
    return audioData;
  }
}

Chapter.init(
  {
    text: {
      type: DataTypes.STRING(5000),
      allowNull: false,
    },
    img: {
      type: DataTypes.BLOB("long"),
      allowNull: true,
    },
    audio: {
      type: DataTypes.BLOB("long"),
      allowNull: true,
    },
    userPrompt: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    StoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    charAlive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize: db,
    modelName: "Chapter",
    tableName: "chapters",
  }
);

module.exports = Chapter;
