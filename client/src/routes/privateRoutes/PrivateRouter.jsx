import { Route, Routes, Navigate } from "react-router-dom";
import StoryRouter from "./storyRoutes/StoryRouter";
import UserHome from "../../components/user/UserHome";

const PrivateRouter = ({ username }) => {
  return (
    <Routes>
      <Route path="/:username" element={<UserHome />} />
      <Route
        path="/:username/stories/*"
        element={<StoryRouter username={username} />}
      />
      <Route path="*" element={<Navigate to={username} />} />
    </Routes>
  );
};

export default PrivateRouter;
