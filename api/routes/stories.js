const express = require("express");
const Story = require("../models/story");
const Chapter = require("../models/chapter");
const User = require("../models/user");
const { ensureAdmin, ensureCorrectUser } = require("../middleware/auth");
const {
  convertBufferImage,
  convertBufferAudio,
} = require("../helpers/convertBuffer");
const { BadRequestError } = require("../expressError");
const jsonschema = require("jsonschema");
const newStorySchema = require("../schemas/newStory.json");

const router = express.Router();

/**
 * GET /:username => { stories: [ {...story}, {...story}, ...]}
 * Returns all stories for a user.
 * Sort by date updated
 * Authorization required: admin or same user-as-:username
 */
router.get("/:username", ensureCorrectUser, async (req, res, next) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({
      where: { username },
      include: { model: Story, as: "stories" },
      order: [["stories", "updatedAt", "DESC"]],
    });

    return res.json({ stories: user.dataValues.stories });
  } catch (error) {
    return next(error);
  }
});

/**
 * GET /:userId/:storyId => { story }
 * Returns story for a user based on storyId
 * Authorization required: admin or same user-as-:username
 */
router.get("/:username/:storyId", ensureCorrectUser, async (req, res, next) => {
  const { storyId, username } = req.params;
  try {
    const user = await User.findOne({
      where: { username },
    });
    const story = await Story.findOne({
      where: { id: storyId, UserId: user.id },
      include: { model: Chapter, as: "chapters" },
      order: [["chapters", "createdAt", "ASC"]],
    });
    // convert image and audio to base64
    for (let chapter of story.chapters) {
      if (chapter.img) {
        chapter.img = await convertBufferImage(chapter.img);
      }
      if (chapter.audio) {
        chapter.audio = await convertBufferAudio(chapter.audio);
      }
    }
    return res.json({ story });
  } catch (error) {
    return next(error);
  }
});

/**
 * POST / => { story, chapter }
 * Creates a new story and returns it
 * Authorization required: admin or same user-as-:username
 */
router.post("/:username/new", ensureCorrectUser, async (req, res, next) => {
  // convert moods to string
  req.body.moods = req.body.moods.join(", ");
  // validate input schema
  try {
    const validator = jsonschema.validate(req.body, newStorySchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }

    // get user info
    const { username } = req.params;
    const user = await User.findOne({
      where: { username: username },
    });

    // create story and content
    const storyInfo = {
      ...req.body,
    };
    const newStory = await Story.generateNewStory(storyInfo, user.id);
    let firstChapter;
    try {
      firstChapter = await Chapter.generateNewChapter(newStory);
      if (firstChapter.validResponse === false) {
        newStory.destroy();
        throw new BadRequestError(firstChapter.message);
      }
      if (firstChapter.img) {
        firstChapter.img = await convertBufferImage(firstChapter.img);
      }
      if (firstChapter.audio) {
        firstChapter.audio = await convertBufferAudio(firstChapter.audio);
      }
    } catch (error) {
      newStory.destroy();
      return next(error);
    }
    newStory.update({
      currSummary: firstChapter.newSummary,
      title: firstChapter.title,
      setting: newStory.setting ? newStory.setting : firstChapter.setting,
    });
    newStory.dataValues.chapters = [firstChapter];

    // add first chapter to story

    return res.status(201).json({ story: newStory });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

/**
 * POST / => { chapter }
 * creates a new chapter and adds it to the story
 * Authorization required: admin or same user-as-:username
 */
router.post(
  "/:username/:storyId/new-chapter",
  ensureCorrectUser,
  async (req, res, next) => {
    // get story info
    try {
      const { storyId } = req.params;
      const { userPrompt } = req.body;
      const story = await Story.findOne({
        where: { id: storyId },
      });
      //create new chapter
      const chapter = await Chapter.generateNewChapter(story, userPrompt);
      // check if user input deemed invalid and return if so
      if (chapter.validResponse === false) {
        return res.status(201).json({ chapter });
      }
      // update the story
      const updatedStory = await story.increment("completedChapters");
      const updateSummary = await updatedStory.update({
        completed: story.maxChapters === updatedStory.completedChapters,
        currSummary: chapter.newSummary,
      });
      // check if character has died and update story if so
      if (chapter.charAlive === false) {
        const updateCharAlive = await updatedStory.update({
          charAlive: false,
          completed: true,
        });
      }
      // convert image and audio to base64
      if (chapter.img) {
        chapter.img = await convertBufferImage(chapter.img);
      }
      if (chapter.audio) {
        chapter.audio = await convertBufferAudio(chapter.audio);
      }

      return res.status(201).json({ chapter });
    } catch (error) {
      return next(error);
    }
  }
);

/**
 * DELETE /:username/:storyId
 * Deletes story
 * Authorization required: admin or same user-as-:username
 */
router.delete(
  "/:username/:storyId",
  ensureCorrectUser,
  async (req, res, next) => {
    try {
      const { storyId } = req.params;
      const story = await Story.findOne({
        where: { id: storyId },
      });
      await story.destroy();
      return res.json({ deleted: storyId });
    } catch (error) {
      return next(error);
    }
  }
);

/**
 * GET / => { stories: [ {...story}, {...story}, ...]}
 * Gets all stories
 * Authorization required: admin
 */
router.get("/", ensureAdmin, async (req, res, next) => {
  try {
    const stories = await Story.findAll();
    return res.json({ stories });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
