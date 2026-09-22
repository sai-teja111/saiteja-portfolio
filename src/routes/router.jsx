import { createBrowserRouter } from "react-router";

import Home from "../pages/Home";
import ProjectDetails from "../pages/ProjectDetails";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/project/:id",
    element: <ProjectDetails />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;