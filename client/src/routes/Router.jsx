import PrivateRouter from "./privateRoutes/PrivateRouter";
import PublicRouter from "./publicRoutes/PublicRouter";

const Router = ({ isLoggedIn, username }) => {
  return isLoggedIn ? <PrivateRouter username={username} /> : <PublicRouter />;
};

export default Router;
