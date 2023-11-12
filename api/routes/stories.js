const express = require("express");
const Story = require("../models/story");
const Chapter = require("../models/chapter");
const User = require("../models/user");
const {
  ensureAdmin,
  ensureCorrectUser,
  ensureLoggedIn,
} = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
//const jsonschema = require("jsonschema");
//const storyNewSchema = require("../schemas/storyNew.json");

const router = express.Router();

/**
 * GET /:userId => { storyIds: [ storyId, ... ] }
 *
 * Returns list of all user story ids
 *
 * Authorization required: admin or same user-as-:userId
 */
router.get("/:userId", ensureCorrectUser, async (req, res, next) => {
  const { userId } = req.params;
  try {
    const storyIds = await Story.getStoryIds(userId);
    return res.json({ storyIds });
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
      where: { storyId },
      include: { model: Chapter, as: "chapters" },
    });
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

    // add first chapter to story
    newStory.dataValues.chapters = [firstChapter];
    const story = await newStory.save();
    return res.status(201).json({ story });
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
      let user = await User.findOne({
        where: { username },
      });
      let story = await Story.findOne({
        where: { id: storyId },
        include: User,
      });
      const updatedStory = await story.increment("completedChapters");
      const chapter = await Chapter.generateNewChapter(
        updatedStory,
        user,
        userPrompt
      );
      const updateSummary = await updatedStory.update({
        currSummary: updatedStory + " " + chapter.dataValues.newSummary,
      });
      if (chapter.charAlive === false) {
        const updateCharAlive = await updatedStory.update({
          charAlive: false,
          completed: true,
        });
      }
      return res.status(201).json({ chapter });
    } catch (error) {
      return next(error);
    }
  }
);

module.exports = router;
