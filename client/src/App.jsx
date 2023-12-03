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
} from "@fortawesome/free-solid-svg-icons";

library.add(
  fas,
  faEye,
  faEyeSlash,
  faVolumeHigh,
  faVolumeXmark,
  faBookMedical,
  faBook,
  faLock
);

/**
 * Main App Component.
 * controls App context of token, username, loading and error state, and users stories
 */
const App = () => {
  const [token, setToken] = useLocalStorage("token");
  const [username, setUsername] = useLocalStorage("username");
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
   * Load token and username into api
   * if they are not already loaded
   */
  const loadApi = () => {
    if (!StoryGenApi.token || !StoryGenApi.username) {
      StoryGenApi.loadToken(token, username);
    }
  };

  /**
   * Global logout function
   * clears token, username, and stories
   * and logs out of api
   */
  const handleLogout = () => {
    setToken(null);
    setUsername(null);
    setStories([]);
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
    } catch (error) {
      console.error("Login failed", error);
      setError([error]);
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
    } catch (error) {
      setIsLoading(false);
      setError(error);
      console.error("Register failed", error);
      navigate("/");
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
    } catch (error) {
      setIsLoading(false);
      setError(error);
      console.error("Create story failed", error);
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
        setError(newChapter.message);
      }
      return newChapter;
    } catch (error) {
      setError(error);
      setIsLoading(false);
      console.error("Create chapter failed", error);
      navigate(`/stories/${storyId}`);
    }
  };

  const handleGetStory = async (storyId) => {
    setIsLoading(true);
    loadApi();
    try {
      let story = await StoryGenApi.getStory(storyId);
      setIsLoading(false);
      return story;
    } catch (error) {
      setError(error);
      setIsLoading(false);
      console.error("Get story failed", error);
      navigate(`/${username}`);
    }
  };

  const handleGetStories = async () => {
    loadApi();
    setIsLoading(true);
    try {
      let stories = await StoryGenApi.getUserStories();
      setIsLoading(false);
      return stories;
    } catch (error) {
      setError(error);
      setIsLoading(false);
      console.error("Get stories failed", error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        username,
        token,
        stories,
        setStories,
        handleLogin,
        handleSignup,
        handleCreateStory,
        handleCreateNewChapter,
        handleGetStories,
        handleGetStory,
      }}
    >
      <Background />
      <LoadingOverlay isLoading={isLoading} />
      <ErrorOverlay error={error} setError={setError} />
      <StoryNavbar isLoggedIn={token ? true : false} logout={handleLogout} />
      <div className="container m-auto">
        <Router isLoggedIn={token ? true : false} username={username} />
      </div>
    </AppContext.Provider>
  );
};

export default App;
