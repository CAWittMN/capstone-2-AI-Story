import NewStoryFormPage from "../../../components/story/newStory/NewStoryFormPage";
import StoryPage from "../../../components/story/StoryPage";

const StoryRouter = () => {
  return (
    <Routes>
      <Route path="/new" element={<NewStoryFormPage />} />
      <Route path="/:storyId/:chapterNum" element={<StoryPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default StoryRouter;
