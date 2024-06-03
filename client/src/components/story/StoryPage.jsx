import { useEffect, useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { useParams, useNavigate } from "react-router-dom";
import Chapter from "./Chapter";
import UserInput from "./UserInput";
import ChapterSelect from "./ChapterSelect";

const StoryPage = () => {
  const { storyId, selectedUser } = useParams();
  const { handleGetStory, handleCreateNewChapter, isLoading, currUser } =
    useContext(AppContext);
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
      } else {
        setChapters(currStory.chapters);
        setCurrChapterNum(currStory.chapters.length);
        setDisableInput(!currStory.charAlive || currStory.completed);
      }
    };
    getStory();
  }, []);

  // create new chapter and update state
  const createNewChapter = async (data) => {
    let chapter = await handleCreateNewChapter(data, storyId);
    if (chapter.validResponse === true) {
      setChapters([...chapters, chapter]);
      setCurrChapterNum(currChapterNum + 1);
      if (!chapter.charAlive) setDisableInput(true);
    }
  };

  // choose a chapter to view
  const chooseChapter = (num) => {
    setCurrChapterNum(num);
    if (num === chapters.length && currStory.charAlive) {
      setDisableInput(false);
    } else {
      setDisableInput(true);
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
            <Chapter chapter={chapters[currChapterNum - 1]} className="" />

            <UserInput
              isDisabled={disableInput}
              isAlive={currStory.charAlive}
              userPrompt={
                chapters[currChapterNum]
                  ? chapters[currChapterNum].userPrompt
                  : null
              }
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
