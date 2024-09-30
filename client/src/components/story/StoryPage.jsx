import { useEffect, useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { useParams, useNavigate } from "react-router-dom";
import Chapter from "./Chapter";
import UserInput from "./UserInput";
import ChapterSelect from "./ChapterSelect";

const StoryPage = () => {
  const { storyId, selectedUser } = useParams();
  const { handleGetStory, handleCreateNewChapter, isLoading, setFirstOpen } =
    useContext(AppContext);
  const [isAlive, setIsAlive] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [currStory, setCurrStory] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [currChapterNum, setCurrChapterNum] = useState(null);
  const [disableInput, setDisableInput] = useState(false);

  // get story and set chapters on mount if not already loaded
  useEffect(() => {
    const getStory = async () => {
      if (!currStory) {
        let story = await handleGetStory(storyId, selectedUser);
        setCurrStory(story);
        setChapters(story.chapters);
        setCurrChapterNum(story.chapters.length);
        setDisableInput(!story.charAlive || story.completed);
        setIsAlive(story.charAlive);
        setIsComplete(story.completed);
      } else {
        setChapters(currStory.chapters);
        setCurrChapterNum(currStory.chapters.length);
        setDisableInput(!currStory.charAlive || currStory.completed);
      }
    };
    setFirstOpen(false);
    getStory();
  }, []);

  // choose a chapter to view
  const chooseChapter = (num) => {
    setCurrChapterNum(num);
    if (num != chapters.length || !isAlive || isComplete) {
      setDisableInput(true);
    } else {
      setDisableInput(false);
    }
  };

  // create new chapter and update state
  const createNewChapter = async (data) => {
    let chapter = await handleCreateNewChapter(data, storyId);
    if (chapter.validResponse === true) {
      const newChapterArr = [...chapters, chapter];
      if (!chapter.charAlive) setIsAlive(false);
      if (newChapterArr.length === currStory.maxChapters) setIsComplete(true);
      if (!chapter.charAlive || newChapterArr.length === currStory.maxChapters)
        setDisableInput(true);
      setChapters(newChapterArr);
      setCurrChapterNum(newChapterArr.length);
    }
  };

  return (
    <>
      {currStory && currChapterNum && chapters.length > 0 && (
        <>
          <div
            className="flex flex-col md:h-[75vh] md:space-y-12 space-y-4 text-lg font-bold justify-center items-center"
            style={{
              opacity: isLoading ? 0 : 1,
              transition: "opacity 0.5s ease-in-out",
            }}
          >
            <Chapter chapter={chapters[currChapterNum - 1]} />
            <UserInput
              isDisabled={disableInput}
              isAlive={isAlive}
              isComplete={isComplete}
              userPrompt={
                chapters[currChapterNum]
                  ? chapters[currChapterNum].userPrompt
                  : null
              }
              charName={currStory.charName}
              handleSubmit={createNewChapter}
            />
          </div>
          <ChapterSelect
            numChapters={currStory.maxChapters}
            completedChapters={chapters.length}
            currChapterNum={currChapterNum}
            handleChooseChapter={chooseChapter}
          />
        </>
      )}
    </>
  );
};

export default StoryPage;
