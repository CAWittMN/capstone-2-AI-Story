import NewStoryFormPage from "../../../components/story/newStory/NewStoryFormPage";
import StoryPage from "../../../components/story/StoryPage";
import { Route, Routes, Navigate } from "react-router-dom";

const StoryRouter = ({ username }) => {
  return (
    <Routes>
      <Route path="/new" element={<NewStoryFormPage />} />
      <Route path="/:storyId" element={<StoryPage />} />
      <Route path="/*" element={<Navigate to={username} />} />
    </Routes>
  );
};

export default StoryRouter;
