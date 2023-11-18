import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AppContext from "./context/AppContext";
import useLocalStorage from "./hooks/useLocalStorage";
import StoryGenApi from "./api";
import WebFont, { load } from "webfontloader";

import Background from "./components/common/Background";
import LoadingOverlay from "./components/common/LoadingOverlay";
import ErrorOverlay from "./components/common/ErrorOverlay";
import StoryNavbar from "./components/common/StoryNavbar";
import Router from "./routes/Router";
import DebugButton from "./DebugButton";

const App = () => {
  const [token, setToken] = useLocalStorage("token");
  const [username, setUsername] = useLocalStorage("username");
  const [isLoading, setIsLoading] = useState(true);
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
    setIsLoading(false);
  }, [token, username]);

  const loadApi = () => {
    if (!StoryGenApi.token || !StoryGenApi.username) {
      StoryGenApi.token = token;
      StoryGenApi.username = username;
    }
  };

  const handleLogout = () => {
    StoryGenApi.logout();
    setToken(null);
    setUsername(null);
  };

  const handleLogin = async (data) => {
    setIsLoading(true);
    try {
      let res = await StoryGenApi.login(data);
      const { token, username } = res;
      setUsername(username);
      setToken(token);
      setIsLoading(false);
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
      navigate("/stories");
    } catch (error) {
      setIsLoading(false);
      setError(error);
      console.error("Register failed", error);
      navigate("/");
    }
  };

  const handleCreateStory = async (data) => {
    setIsLoading(true);
    try {
      let story = await StoryGenApi.createStory(data);
      setIsLoading(false);
      navigate(`/stories/${story.id}`);
    } catch (error) {
      setIsLoading(false);
      setError(error);
      console.error("Create story failed", error);
      navigate("/");
    }
  };

  const handleCreateNewChapter = async (data, storyId) => {
    setIsLoading(true);
    try {
      let chapter = await StoryGenApi.createNewChapter(data, storyId);
      setIsLoading(false);
      navigate(`/stories/${storyId}/${chapter.id}`);
    } catch (error) {
      setError(error);
      setIsLoading(false);
      console.error("Create chapter failed", error);
      navigate(`/stories/${storyId}`);
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
        loadApi,
        setError,
        handleLogin,
        handleSignup,
        handleCreateStory,
        handleCreateNewChapter,
        handleGetStories,
      }}
    >
      <DebugButton />
      <Background />
      <LoadingOverlay isLoading={isLoading} />
      <ErrorOverlay error={error} setError={setError} />
      <StoryNavbar isLoggedIn={token ? true : false} logout={handleLogout} />
      <Router isLoggedIn={token ? true : false} />
    </AppContext.Provider>
  );
};

export default App;
