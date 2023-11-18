import { Route, Routes, Navigate } from "react-router-dom";

import PrivateRouter from "./privateRoutes/PrivateRouter";
import PublicRouter from "./publicRoutes/PublicRouter";

const Router = ({ isLoggedIn }) => {
  return isLoggedIn ? <PrivateRouter /> : <PublicRouter />;
};

export default Router;
