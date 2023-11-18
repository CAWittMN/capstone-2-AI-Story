import { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import StoryList from "./StoryList";
import Header from "./Header";
import ContinueStory from "./ContinueStory";
import { select } from "@nextui-org/react";

const HomePage = () => {
  const { token, loadApi, handleGetStories } = useContext(AppContext);
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);

  useEffect(() => {
    const getStories = async () => {
      if (token && stories.length === 0) {
        let stories = await handleGetStories();
        if (stories.length > 0) {
          setStories(stories);
          setSelectedStory(stories[0]);
        }
      }
    };
    getStories();
  }, [token]);

  console.log(stories[0]);
  return (
    <div>
      {!token && <Header />}
      {token && (
        <div className="container flex-row flex">
          <div className="overflow-y-scroll h-full fixed w-1/4">
            <StoryList
              selectedStory={selectedStory}
              select={setSelectedStory}
              stories={stories}
            />
          </div>
          <div className="fixed flex h-full items-center justify-center align-center right-0 w-3/4">
            {stories.length && <ContinueStory story={selectedStory} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
