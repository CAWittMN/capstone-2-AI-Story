const { Model, DataTypes } = require("sequelize");
const { openai } = require("../openAiApi");
const { getAudio } = require("../elevenLabsApi");
const { buildPrompt } = require("../helpers/prompt");
const db = require("../db");

/**
 * Chapter model.
 * Represents a chapter in a story.
 * Can generate a new chapter by calling Chapter.generateNewChapter().
 * @param {string} text - The text of the chapter.
 * @param {string} img - The image data of the chapter.
 * @param {string} audio - The audio data of the chapter.
 * @param {string} userPrompt - The user prompt of the chapter.
 * @param {charAlive} charAlive - Boolean value if the character is alive.
 */
class Chapter extends Model {
  /**
   * Generate a new chapter.
   * Generates content if none is provided.
   * Generates image and audio if story settings allow.
   * Returns the new chapter.
   *
   * @returns {Chapter}
   */
  static async generateNewChapter(story, user, userInput, content = null) {
    let img;
    let audio;

    // if content is null, generate new content
    if (content === null) {
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
      throw new Error(content.message);
    }

    // generate image and audio if story settings allow
    if (story.genImages && story.genAudio) {
      img = await Chapter.generateImage(content.imgPrompt);

      audio = await Chapter.generateAudio(content.text);
    } else if (story.genAudio && !story.genImage) {
      audio = await Chapter.generateAudio(content.text);
      img = null;
    } else if (!story.genAudio && story.genImages) {
      img = await Chapter.generateImage(content.imgPrompt);
      audio = null;
    }

    // create new chapter in database. replaces all new line characters in the text with a space.
    const newChapter = await Chapter.create({
      text: content.text.replace(/\n/g, " "),
      img: img,
      audio: audio,
      userPrompt: userInput,
      StoryId: story.id,
      charAlive: content.charAlive,
    });

    newChapter.dataValues.newSummary = content.summary;

    return newChapter;
  }

  /**
   * Generate image data.
   * The data returned is a base64 encoded string.
   * @param {string} imgPrompt - The image prompt.
   *
   * @returns {string}
   */
  static async generateImage(imgPrompt) {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: imgPrompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    const img = response.data[0].b64_json;

    const imgBlob = await Buffer.from(img, "base64");
    return imgBlob;
  }

  /**
   * Generate audio data.
   * @param {string} text - The text to generate audio from.
   *
   * @returns {string}
   */
  static async generateAudio(text) {
    const audioData = await getAudio(text);
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
