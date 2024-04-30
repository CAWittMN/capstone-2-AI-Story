import NewStoryFormPage from "../../../components/story/newStory/NewStoryFormPage";
import StoryPage from "../../../components/story/StoryPage";
import { Route, Routes, Navigate } from "react-router-dom";

const StoryRouter = () => {
  return (
    <Routes>
      <Route path="/new" element={<NewStoryFormPage />} />
      <Route path="/:storyId" element={<StoryPage />} />
    </Routes>
  );
};

export default StoryRouter;
