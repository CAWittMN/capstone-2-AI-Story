import { useEffect, useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { useParams } from "react-router-dom";
import Chapter from "./Chapter";
import UserInput from "./UserInput";
import ChapterSelect from "./ChapterSelect";

const StoryPage = () => {
  const { storyId } = useParams();
  const { handleGetStory, handleCreateNewChapter, isLoading } =
    useContext(AppContext);
  const [currStory, setCurrStory] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [currChapterNum, setCurrChapterNum] = useState(null);

  // get story and set chapters on mount if not already loaded
  useEffect(() => {
    const getStory = async () => {
      if (!currStory) {
        let story = await handleGetStory(storyId);
        setCurrStory(story);
        setChapters(story.chapters);
        setCurrChapterNum(story.chapters.length);
      } else {
        setChapters(currStory.chapters);
        setCurrChapterNum(currStory.chapters.length);
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
              isInvisible={currStory.maxChapters === currChapterNum}
              isDisabled={
                currStory.completed || chapters.length != currChapterNum
              }
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
            setCurrChapterNum={setCurrChapterNum}
          />
        </>
      )}
    </>
  );
};

export default StoryPage;
