import LoginPage from "../../components/auth/LoginPage";
import SignupPage from "../../components/auth/SignupPage";
import { Route, Routes, Navigate } from "react-router-dom";
import UserHome from "../../components/user/UserHome";

const PublicRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<UserHome />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default PublicRouter;
