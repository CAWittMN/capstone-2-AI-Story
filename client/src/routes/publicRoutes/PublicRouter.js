import Home from "../../components/home/Home";
import LoginPage from "../../components/auth/LoginPage";
import SignupPage from "../../components/auth/SignupPage";
import { Route, Routes, Navigate } from "react-router-dom";

const PublicRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default PublicRouter;
