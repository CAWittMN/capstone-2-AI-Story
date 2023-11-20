const express = require("express");
const Story = require("../models/story");
const Chapter = require("../models/chapter");
const User = require("../models/user");
const {
  ensureAdmin,
  ensureCorrectUser,
  ensureLoggedIn,
} = require("../middleware/auth");
const {
  convertBufferImage,
  convertBufferAudio,
} = require("../helpers/convertBuffer");
const { BadRequestError } = require("../expressError");
//const jsonschema = require("jsonschema");
//const storyNewSchema = require("../schemas/storyNew.json");

const router = express.Router();

/**
 * GET /:username => { stories: [ {...story}, {...story}, ...]}
 * Returns all stories for a user.
 * Sort by date updated
 */
router.get("/:username", ensureCorrectUser, async (req, res, next) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({
      where: { username },
    });

    console.log(user);

    const stories = await Story.findAll({
      where: { UserId: user.id },
      order: [["updatedAt", "DESC"]],
    });

    console.log(stories);

    return res.json({ stories });
  } catch (error) {
    return next(error);
  }
});

/**
 * GET /:userId/:storyId => { story }
 *
 * Returns story
 */
router.get("/:username/:storyId", ensureCorrectUser, async (req, res, next) => {
  const { storyId } = req.params;
  try {
    const story = await Story.findOne({
      where: { id: storyId },
      include: { model: Chapter, as: "chapters" },
      order: [["chapters", "createdAt", "ASC"]],
    });
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
 *
 * Creates a new story and returns it
 */
router.post("/:username/new", ensureCorrectUser, async (req, res, next) => {
  try {
    // const validator = jsonschema.validate(req.body, storyNewSchema);
    // if (!validator.valid) {
    //   const errs = validator.errors.map((e) => e.stack);
    //   throw new BadRequestError(errs);
    // }

    // get user
    const { username } = req.params;
    const user = await User.findOne({
      where: { username: username },
    });

    // create story and content
    const { newStory, content } = await Story.generateNewStory(req.body, user);

    // create first chapter with null user input
    const userInput = null;
    const firstChapter = await Chapter.generateNewChapter(
      newStory,
      user,
      userInput,
      content
    );
    if (firstChapter.img) {
      firstChapter.img = await convertBufferImage(firstChapter.img);
    }
    if (firstChapter.audio) {
      firstChapter.audio = await convertBufferAudio(firstChapter.audio);
    }

    newStory.dataValues.chapters = [firstChapter];

    // add first chapter to story

    return res.status(201).json({ story: newStory });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

/**POST / => { chapter }
 *
 * creates a new chapter and adds it to the story
 */
router.post(
  "/:username/:storyId/new-chapter",
  ensureCorrectUser,
  async (req, res, next) => {
    try {
      const { storyId, username } = req.params;
      const { userPrompt } = req.body;
      const user = await User.findOne({
        where: { username },
      });
      const story = await Story.findOne({
        where: { id: storyId },
        include: { model: User, as: "user" },
      });
      const chapter = await Chapter.generateNewChapter(story, user, userPrompt);
      const updatedStory = await story.increment("completedChapters");
      const updateSummary = await updatedStory.update({
        currSummary: updatedStory + " " + chapter.dataValues.newSummary,
      });
      if (chapter.charAlive === false) {
        const updateCharAlive = await updatedStory.update({
          charAlive: false,
          completed: true,
        });
      }

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

module.exports = router;
