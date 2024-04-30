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
 * controls App context of token, currUser, loading and errors state,
 */
const App = () => {
  const [token, setToken] = useLocalStorage("token");
  const [currUser, setCurrUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
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
    if (token) {
      const { username, isAdmin } = StoryGenApi.loadToken(token);
      setCurrUser(username);
      setIsAdmin(isAdmin);
    }
  }, [token]);

  /**
   * Global logout function
   * clears token, currUser
   * and logs out of api
   */
  const handleLogout = () => {
    setToken(null);
    setCurrUser(null);
    setIsAdmin(false);
  };

  /**
   * Global login function
   * sets token and currUser
   * sets api token and currUser
   * and navigates to user home
   */
  const handleLogin = async (data) => {
    setIsLoading(true);
    try {
      let res = await StoryGenApi.login(data);
      setToken(res.token);
      setCurrUser(res.username);
      setIsAdmin(res.isAdmin);
      setIsLoading(false);
    } catch (errors) {
      console.error("Login failed", errors);
      setErrors([errors]);
      setIsLoading(false);
    }
  };

  /**
   * Global signup function
   * registers new user
   * sets token and currUser
   * sets api token and currUser
   * and navigates to user home
   */
  const handleSignup = async (data) => {
    setIsLoading(true);
    try {
      let token = await StoryGenApi.register(data);
      setToken(token);
      setCurrUser(data.username);
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
    try {
      let story = await StoryGenApi.createStory(token, data);
      setIsLoading(false);
      navigate(`/stories/${story.id}`);
    } catch (errors) {
      setIsLoading(false);
      setErrors(errors);
      console.error("Create story failed", errors);
      navigate(`/`);
    }
  };

  /**
   * Global create chapter function
   * creates new chapter
   */
  const handleCreateNewChapter = async (data, storyId) => {
    setIsLoading(true);
    try {
      let newChapter = await StoryGenApi.createNewChapter(token, data, storyId);
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
  const handleGetStory = async (storyId, selectedUser) => {
    setIsLoading(true);
    try {
      if (isAdmin && selectedUser) {
        let story = await adminGetStory(selectedUser, storyId);
        setIsLoading(false);
        return story;
      }
      let story = await StoryGenApi.getStory(token, storyId);
      setIsLoading(false);
      return story;
    } catch (errors) {
      setErrors(errors);
      setIsLoading(false);
      console.error("Get story failed", errors);
      navigate(`/`);
    }
  };

  /**
   * Global get stories function
   * gets all user stories
   */
  const handleGetStories = async (selectedUser) => {
    setIsLoading(true);
    console.log(isAdmin);
    try {
      if (isAdmin && selectedUser) {
        let stories = await adminGetUserStories(selectedUser);
        setIsLoading(false);
        return stories;
      }
      let stories = await StoryGenApi.getUserStories(token);
      setIsLoading(false);
      return stories;
    } catch (errors) {
      setErrors(errors);
      setIsLoading(false);
      console.error("Get stories failed", errors);
    }
  };

  /**
   * Admin function
   * gets all users
   */
  const adminGetAllUsers = async () => {
    setIsLoading(true);
    try {
      let users = await StoryGenApi.adminGetAllUsers(token);
      setIsLoading(false);
      return users;
    } catch (errors) {
      setErrors(errors);
      setIsLoading(false);
      console.error("Get users failed", errors);
    }
  };

  /**
   * Admin function
   * get stories for a user
   */
  const adminGetAllStories = async () => {
    setIsLoading(true);
    try {
      let stories = await StoryGenApi.adminGetAllStories(token);
      return stories;
    } catch (errors) {
      setErrors(errors);
      setIsLoading(false);
      console.error("Get stories failed", errors);
    }
  };

  /**
   * Admin function
   * get stories for a user
   */
  const adminGetUserStories = async (selectedUser) => {
    setIsLoading(true);
    try {
      let stories = await StoryGenApi.adminGetUserStories(token, selectedUser);
      return stories;
    } catch (errors) {
      setErrors(errors);
      setIsLoading(false);
      console.error("Get stories failed", errors);
    }
  };

  /**
   * Admin function
   * get story for a user based on story id
   */
  const adminGetStory = async (selectedUser, storyId) => {
    setIsLoading(true);
    try {
      let story = await StoryGenApi.adminGetStory(token, selectedUser, storyId);
      return story;
    } catch (errors) {
      setErrors(errors);
      setIsLoading(false);
      console.error("Get story failed", errors);
    }
  };

  return (
    <AppContext.Provider
      value={{
        isLoading,
        currUser,
        isAdmin,
        handleLogin,
        handleSignup,
        handleCreateStory,
        handleCreateNewChapter,
        handleGetStories,
        handleGetStory,
        adminGetAllUsers,
        adminGetAllStories,
        adminGetUserStories,
        adminGetStory,
      }}
    >
      <Background />
      <DisclaimerOverlay />
      <LoadingOverlay isLoading={isLoading} />
      <ErrorOverlay errors={errors} setErrors={setErrors} />
      <StoryNavbar
        isAdmin={isAdmin}
        currUser={currUser}
        isLoggedIn={token ? true : false}
        logout={handleLogout}
      />
      <div className="container m-auto">
        <Router
          isLoggedIn={token ? true : false}
          currUser={currUser}
          isAdmin={isAdmin}
        />
      </div>
    </AppContext.Provider>
  );
};

export default App;
