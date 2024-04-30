import { Route, Routes, Navigate } from "react-router-dom";
import StoryRouter from "./storyRoutes/StoryRouter";
import UserHome from "../../components/user/UserHome";
import AdminRouter from "../adminRoutes/AdminRouter";

const PrivateRouter = ({ isAdmin }) => {
  return (
    <Routes>
      <Route path="/" element={<UserHome />} />
      <Route path="/stories/*" element={<StoryRouter />} />
      {isAdmin && <Route path="/admin/*" element={<AdminRouter />} />}
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default PrivateRouter;
