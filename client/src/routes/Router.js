import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../context/AppContext";

import PrivateRouter from "./privateRoutes/PrivateRouter";
import PublicRouter from "./publicRoutes/PublicRouter";

const Router = () => {
  const { token } = useContext(AppContext);

  return token ? <PrivateRouter /> : <PublicRouter />;
};

export default Router;
