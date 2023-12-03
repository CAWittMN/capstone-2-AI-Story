import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";
import StoryList from "./StoryList";
import ContinueStory from "./ContinueStory";
import NewStoryButton from "./NewStoryButton";

const UserHome = () => {
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);
  const { username, handleGetStories } = useContext(AppContext);
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
      <div className="container select-none flex h-[90vh] flex-col-reverse items-center md:flex-row justify-start md:justify-center">
        <div className="backdrop-brightness-75 backdrop-blur-sm w-screen md:w-1/4">
          <StoryList
            selectedStory={selectedStory}
            select={setSelectedStory}
            stories={stories}
          />
        </div>
        <div className="flex flex-col h-full md:justify-center gap-10  mt-5 md:m-0 items-center align-center right-0 w-3/4">
          <div className="top-10">
            <NewStoryButton username={username} />
          </div>
          <div className="w-full">
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
