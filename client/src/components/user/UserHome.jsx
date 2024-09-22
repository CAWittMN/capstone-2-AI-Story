import { useContext, useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useNavigate, useParams } from "react-router-dom";
import AppContext from "../../context/AppContext";
import StoryList from "./StoryList";
import ContinueStory from "./ContinueStory";
import NewStoryButton from "./NewStoryButton";
import Header from "../home/Header";

const UserHome = () => {
  const { selectedUser } = useParams();
  const {
    currUser,
    handleGetStories,
    handleDeleteStory,
    token,
    firstOpen,
    setFirstOpen,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(stories[0] || null);

  const springs = useSpring({
    config: { duration: 500 },
    from: { opacity: 0, display: "none" },
    to: { opacity: 1, display: "" },
    delay: firstOpen ? 8000 : 0,
  });

  // get stories on mount if not already loaded
  useEffect(() => {
    const getStories = async () => {
      if (stories.length === 0 && token) {
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
    <>
      {firstOpen && (
        <div
          className="h-[75vh] flex justify-center items-center"
          style={{ fontFamily: "alice" }}
        >
          <Header
            token={token}
            firstOpen={firstOpen}
            setFirstOpen={setFirstOpen}
          />
        </div>
      )}
      {token && (
        <animated.div
          style={{
            ...springs,
            scrollbar: "hide",
            fontFamily: "alice",
            // opacity: firstOpen ? 0 : 1,
            // transition: "all 1s ease",
            // display: firstOpen ? "none" : "",
          }}
        >
          <div
            styles={{ ...springs }}
            className=" select-none flex h-[89vh] flex-col-reverse items-center md:flex-row justify-start md:justify-center"
          >
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
        </animated.div>
      )}
    </>
  );
};

export default UserHome;
