import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";
import StoryList from "./StoryList";
import ContinueStory from "./ContinueStory";
import NewStoryButton from "./NewStoryButton";

const UserHome = () => {
  const navigate = useNavigate();
  const { username, handleGetStories, setStories, stories, setCurrStoryId } =
    useContext(AppContext);
  const [selectedStory, setSelectedStory] = useState(stories[0] || null);

  useEffect(() => {
    const getStories = async () => {
      if (stories.length === 0) {
        let stories = await handleGetStories();
        if (stories.length > 0) {
          setStories(stories);
          setSelectedStory(stories[0]);
        }
      }
    };
    getStories();
  }, []);

  return (
    <div style={{ fontFamily: "alice" }}>
      <div className="container flex-row flex">
        <div className="overflow-y-scroll backdrop-brightness-75 backdrop-blur-sm h-[93vh] fixed w-1/4 max-w-[300px] ">
          <StoryList
            selectedStory={selectedStory}
            select={setSelectedStory}
            stories={stories}
          />
        </div>
        <div className="fixed flex h-full items-center justify-center align-center right-0 w-3/4">
          <div className="absolute top-10">
            <NewStoryButton username={username} />
          </div>
          <div>
            {stories.length > 0 && (
              <ContinueStory
                username={username}
                onContinue={() => {
                  navigate(`/${username}/stories/${selectedStory.id}`);
                }}
                story={selectedStory}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
