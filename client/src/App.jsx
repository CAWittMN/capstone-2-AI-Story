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
 * controls App context of token, username, loading and error state, and stories list
 *
 */
const App = () => {
  const [token, setToken] = useLocalStorage("token");
  const [username, setUsername] = useLocalStorage("username");
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const loadApi = () => {
    if (!StoryGenApi.token || !StoryGenApi.username) {
      StoryGenApi.loadToken(token, username);
    }
  };

  const handleLogout = () => {
    setToken(null);
    setUsername(null);
    setStories([]);
    StoryGenApi.logout();
  };

  const handleLogin = async (data) => {
    setIsLoading(true);
    try {
      let res = await StoryGenApi.login(data);
      const { token, username } = res;
      setUsername(username);
      setToken(token);
      setIsLoading(false);
      navigate(`/${username}`);
    } catch (error) {
      console.error("Login failed", error);
      setError([error]);
      setIsLoading(false);
    }
  };

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

  const handleCreateStory = async (data) => {
    setIsLoading(true);
    loadApi();
    try {
      let story = await StoryGenApi.createStory(data);
      setStories((stories) => [...stories, story]);
      setCurrStory(story);
      setIsLoading(false);
      navigate(`/${username}/stories/${story.id}`);
    } catch (error) {
      setIsLoading(false);
      setError(error);
      console.error("Create story failed", error);
      navigate(`/${username}`);
    }
  };

  const handleCreateNewChapter = async (data, storyId) => {
    setIsLoading(true);
    loadApi();
    try {
      let chapter = await StoryGenApi.createNewChapter(data, storyId);
      setIsLoading(false);
      return chapter;
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
      <Router isLoggedIn={token ? true : false} username={username} />
    </AppContext.Provider>
  );
};

export default App;
