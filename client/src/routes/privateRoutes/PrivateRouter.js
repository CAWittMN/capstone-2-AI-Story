import StoryRouter from "./storyRoutes/StoryRouter";
import UserRouter from "./userRoutes/UserRouter";
import Home from "../../components/home/Home";

const PrivateRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stories/*" element={<StoryRouter />} />
      <Route path="/users/*" element={<UserRouter />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default PrivateRouter;
