import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";
import { useParams } from "react-router-dom";
import StoryGenApi from "../../api";
import ChapterList from "./ChapterList";
import Chapter from "./Chapter";
import UserInput from "./UserInput";

const StoryPage = ({ story }) => {
  const { storyId, chapterNum } = useParams();
  const [currStory, setCurrStory] = useState(story || null);
  const [currChapter, setCurrChapter] = useState(
    currStory.chapters[chapterNum - 1] || null
  );

  const { token } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    async function getStory() {
      try {
        let story = await StoryGenApi.getStory(storyId);
        setCurrStory(story);
      } catch (errors) {
        console.error("StoryPage getStory: problem loading", errors);
        navigate("/");
      }
    }
    if (!currStory) {
      getStory();
    }
    setCurrChapter(currStory.chapters[chapterNum - 1]);
  }, [token, storyId]);

  return <div>StoryPage</div>;
};

export default StoryPage;
