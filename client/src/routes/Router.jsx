import PrivateRouter from "./privateRoutes/PrivateRouter";
import PublicRouter from "./publicRoutes/PublicRouter";

const Router = ({ isLoggedIn, currUser, isAdmin }) => {
  return (
    <>
      {isLoggedIn ? (
        <PrivateRouter currUser={currUser} isAdmin={isAdmin} />
      ) : (
        <PublicRouter />
      )}
    </>
  );
};

export default Router;
