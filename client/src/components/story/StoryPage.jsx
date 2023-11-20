import { useEffect, useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import Chapter from "./Chapter";
import UserInput from "./UserInput";
import ChapterSelect from "./ChapterSelect";

const StoryPage = () => {
  const { storyId } = useParams();
  const { handleGetStory, handleCreateNewChapter } = useContext(AppContext);
  const [currStory, setCurrStory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [chapters, setChapters] = useState([]);
  const [currChapterNum, setCurrChapterNum] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getStory = async () => {
      if (!currStory) {
        setIsLoading(true);
        let story = await handleGetStory(storyId);
        setCurrStory(story);
        setChapters(story.chapters);
        setCurrChapterNum(story.chapters.length);
        setIsLoading(false);
      } else {
        setChapters(currStory.chapters);
        setCurrChapterNum(currStory.chapters.length);
      }
    };
    getStory();
  }, []);

  const createNewChapter = async (data) => {
    setIsLoading(true);
    let chapter = await handleCreateNewChapter(data, storyId);
    setIsLoading(false);
    setChapters([...chapters, chapter]);
    setCurrChapterNum(currChapterNum + 1);
  };

  console.log(currChapterNum);
  console.log(chapters.length);

  return (
    <div
      style={{
        opacity: isLoading ? 0 : 1,
        transition: "opacity 0.5s ease-in-out",
      }}
    >
      {currStory && currChapterNum && chapters.length > 0 && (
        <>
          <Chapter
            chapter={chapters[currChapterNum - 1]}
            className="flex flex-col justify-center items-center fixed "
          />
          {currChapterNum == chapters.length ? (
            <UserInput handleSubmit={createNewChapter} />
          ) : null}
          <ChapterSelect
            numChapters={currStory.maxChapters}
            completedChapters={chapters.length}
            currChapterNum={currChapterNum}
            setCurrChapterNum={setCurrChapterNum}
          />
        </>
      )}
    </div>
  );
};

export default StoryPage;
