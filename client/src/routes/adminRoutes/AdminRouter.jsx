import { Route, Routes, Navigate } from "react-router-dom";
import AdminUserList from "../../components/admin/AdminUserList";
import StoryPage from "../../components/story/StoryPage";
import UserHome from "../../components/user/UserHome";

const AdminRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminUserList />} />
      <Route path="/:selectedUser/:storyId" element={<StoryPage />} />
      <Route path="/:selectedUser" element={<UserHome />} />
      <Route path="/*" element={<Navigate to={`/`} />} />
    </Routes>
  );
};

export default AdminRouter;
