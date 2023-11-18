import { Route, Routes, Navigate } from "react-router-dom";
import StoryRouter from "./storyRoutes/StoryRouter";
import UserRouter from "./userRoutes/UserRouter";
import HomePage from "../../components/home/HomePage";

const PrivateRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/stories/*" element={<StoryRouter />} />
      <Route path="/users/*" element={<UserRouter />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default PrivateRouter;
