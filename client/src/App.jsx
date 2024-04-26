// React and Dom imports
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// App Context
import AppContext from "./context/AppContext";

// Custom Hooks
import useLocalStorage from "./hooks/useLocalStorage";

// API
import StoryGenApi from "./api";

// Components
import DisclaimerOverlay from "./components/common/DisclaimerOverlay";
import Background from "./components/common/Background";
import LoadingOverlay from "./components/common/LoadingOverlay";
import ErrorOverlay from "./components/common/ErrorOverlay";
import StoryNavbar from "./components/common/StoryNavbar";
import Router from "./routes/Router";

// Fonts and Icons
import WebFont, { load } from "webfontloader";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  fas,
  faEye,
  faEyeSlash,
  faVolumeHigh,
  faVolumeXmark,
  faBook,
  faLock,
  faBookMedical,
  faSkullCrossbones,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  fas,
  faEye,
  faEyeSlash,
  faVolumeHigh,
  faVolumeXmark,
  faBookMedical,
  faBook,
  faLock,
  faSkullCrossbones
);

/**
 * Main App Component.
 * controls App context of token, username, loading and errors state,
 */
const App = () => {
  const [token, setToken] = useLocalStorage("token");
  const [username, setUsername] = useLocalStorage("username");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  /**
   * Load token and username into api
   * if they are not already loaded
   */
  const loadApi = () => {
    if (!StoryGenApi.token || !StoryGenApi.username) {
      StoryGenApi.loadToken(token, username);
    }
  };

  /**
   * Load fonts and api on mount
   */
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Lora", "Piazzolla", "Alice"],
      },
    });
    if (token && username) {
      loadApi();
    }
  }, [token, username]);

  /**
   * Global logout function
   * clears token, username
   * and logs out of api
   */
  const handleLogout = () => {
    setToken(null);
    setUsername(null);
    StoryGenApi.logout();
  };

  /**
   * Global login function
   * sets token and username
   * sets api token and username
   * and navigates to user home
   */
  const handleLogin = async (data) => {
    setIsLoading(true);
    try {
      let res = await StoryGenApi.login(data);
      const { token, username } = res;
      setUsername(username);
      setToken(token);
      setIsLoading(false);
      loadApi();
      navigate(`/${username}`);
    } catch (errors) {
      console.error("Login failed", errors);
      setErrors([errors]);
      setIsLoading(false);
    }
  };

  /**
   * Global signup function
   * registers new user
   * sets token and username
   * sets api token and username
   * and navigates to user home
   */
  const handleSignup = async (data) => {
    setIsLoading(true);
    try {
      let token = await StoryGenApi.register(data);
      setToken(token);
      setUsername(data.username);
      setIsLoading(false);
      navigate(`/${data.username}`);
    } catch (errors) {
      setIsLoading(false);
      setErrors(errors);
      console.error("Register failed", errors);
    }
  };

  /**
   * Global create story function
   * creates new story
   */
  const handleCreateStory = async (data) => {
    setIsLoading(true);
    loadApi();
    try {
      let story = await StoryGenApi.createStory(data);
      setIsLoading(false);
      navigate(`/${username}/stories/${story.id}`);
    } catch (errors) {
      setIsLoading(false);
      setErrors(errors);
      console.error("Create story failed", errors);
      navigate(`/${username}`);
    }
  };

  /**
   * Global create chapter function
   * creates new chapter
   */
  const handleCreateNewChapter = async (data, storyId) => {
    setIsLoading(true);
    loadApi();
    try {
      let newChapter = await StoryGenApi.createNewChapter(data, storyId);
      setIsLoading(false);
      if (newChapter.validResponse === false) {
        setErrors([newChapter.message]);
      }
      return newChapter;
    } catch (errors) {
      setErrors(errors);
      setIsLoading(false);
      console.error("Create chapter failed", errors);
      navigate(`/stories/${storyId}`);
    }
  };

  /**
   * Global get story function
   * gets story by id
   */
  const handleGetStory = async (storyId) => {
    setIsLoading(true);
    loadApi();
    try {
      let story = await StoryGenApi.getStory(storyId);
      setIsLoading(false);
      return story;
    } catch (errors) {
      setErrors(errors);
      setIsLoading(false);
      console.error("Get story failed", errors);
      navigate(`/${username}`);
    }
  };

  /**
   * Global get stories function
   * gets all user stories
   */
  const handleGetStories = async () => {
    loadApi();
    setIsLoading(true);
    try {
      let stories = await StoryGenApi.getUserStories();
      setIsLoading(false);
      return stories;
    } catch (errors) {
      setErrors(errors);
      setIsLoading(false);
      console.error("Get stories failed", errors);
    }
  };

  return (
    <AppContext.Provider
      value={{
        isLoading,
        username,
        handleLogin,
        handleSignup,
        handleCreateStory,
        handleCreateNewChapter,
        handleGetStories,
        handleGetStory,
      }}
    >
      <Background />
      <DisclaimerOverlay />
      <LoadingOverlay isLoading={isLoading} />
      <ErrorOverlay errors={errors} setErrors={setErrors} />
      <StoryNavbar isLoggedIn={token ? true : false} logout={handleLogout} />
      <div className="container m-auto">
        <Router isLoggedIn={token ? true : false} username={username} />
      </div>
    </AppContext.Provider>
  );
};

export default App;
