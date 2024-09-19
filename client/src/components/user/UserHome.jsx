import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppContext from "../../context/AppContext";
import StoryList from "./StoryList";
import ContinueStory from "./ContinueStory";
import NewStoryButton from "./NewStoryButton";

const UserHome = () => {
  const { selectedUser } = useParams();
  const { currUser, handleGetStories, handleDeleteStory } =
    useContext(AppContext);
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(stories[0] || null);

  // get stories on mount if not already loaded
  useEffect(() => {
    const getStories = async () => {
      if (stories.length === 0) {
        let stories = await handleGetStories(selectedUser);
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
      <div className=" select-none flex h-[89vh] flex-col-reverse items-center md:flex-row justify-start md:justify-center">
        <div className="backdrop-brightness-75 backdrop-blur-sm w-screen md:w-1/4">
          <StoryList
            selectedStory={selectedStory}
            select={setSelectedStory}
            stories={stories}
          />
        </div>
        <div className="flex flex-col h-full md:justify-center gap-3  mt-5 md:m-0 items-center align-center right-0 w-3/4">
          <div className="top-10">
            <NewStoryButton username={currUser} />
          </div>
          <div className="w-full">
            {stories.length > 0 && (
              <ContinueStory
                onContinue={() => {
                  navigate(
                    selectedUser
                      ? `/admin/${selectedUser}/${selectedStory.id}`
                      : `/stories/${selectedStory.id}`
                  );
                }}
                onDelete={() => {
                  const newStoriesList = stories.filter(
                    (story) => story.id != selectedStory.id
                  );
                  handleDeleteStory(selectedStory.id);
                  setStories(newStoriesList);
                  setSelectedStory(newStoriesList[0]);
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
