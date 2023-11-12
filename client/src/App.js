import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "./context/AppContext";
import useLocalStorage from "./hooks/useLocalStorage";
import StoryGenApi from "./api";

import LoadingOverlay from "./components/common/LoadingOverlay";
import ErrorOverlay from "./components/common/ErrorOverlay";
import Navbar from "./components/common/Navbar";
import Router from "./routes/Router";

const App = () => {
  const [token, setToken] = useLocalStorage("token");
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getCurrentUser() {
      if (token) {
        try {
          StoryGenApi.token = token;
        } catch (errors) {
          console.error("App loadUserInfo: problem loading", errors);
        }
      }
      setIsLoading(false);
    }
    setIsLoading(true);
    getCurrentUser();
  }, [token]);

  const handleLogout = () => {
    StoryGenApi.logout();
    setToken(null);
  };

  const handleLogin = async (data) => {
    try {
      let token = await StoryGenApi.login(data);
      setToken(token);
    } catch (errors) {
      console.error("Login failed", errors);
      setErrors(errors);
    }
  };

  const handleRegister = async (data) => {
    try {
      let response = await StoryGenApi.register(data);
      setToken(response.token);
      return { success: true };
    } catch (errors) {
      console.error("Register failed", errors);
      return { success: false, errors };
    }
  };

  const handleCreateStory = async (data) => {
    setIsLoading(true);
    try {
      let story = await StoryGenApi.createStory(data);
      setIsLoading(false);
      navigate(`/stories/${story.id}`);
    } catch (errors) {
      setIsLoading(false);
      setErrors(errors);
      console.error("Create story failed", errors);
      navigate("/stories");
    }
  };

  const handleCreateNewChapter = async (data, storyId) => {
    setIsLoading(true);
    try {
      let chapter = await StoryGenApi.createNewChapter(data, storyId);
      setIsLoading(false);
      navigate(`/stories/${storyId}/${chapter.id}`);
    } catch (errors) {
      setIsLoading(false);
      console.error("Create chapter failed", errors);
      navigate(`/stories/${storyId}`);
    }
  };

  return (
    <AppContext.Provider
      value={{
        errors,
        setErrors,
        isLoading,
        setIsLoading,
        handleLogout,
        handleLogin,
        handleRegister,
        handleCreateStory,
        handleCreateNewChapter,
      }}
    >
      {!isLoading ? null : <LoadingOverlay />}
      {errors.length ? <ErrorOverlay /> : null}
      <Navbar />
      <Router />
    </AppContext.Provider>
  );
};

export default App;
