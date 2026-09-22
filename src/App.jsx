import { RouterProvider } from "react-router/dom";
import { MotionConfig } from "motion/react";

import PageLoader from "./components/common/PageLoader";
import router from "./routes/router";

function App() {
  return (
    // "user" follows prefers-reduced-motion: movement is dropped while
    // opacity fades stay, so nothing is hidden or unusable.
    <MotionConfig reducedMotion="user">
      {/* Mounted above the router so the loader plays once on the initial page
          load and never again while navigating or scrolling. */}
      <PageLoader />
      <RouterProvider router={router} />
    </MotionConfig>
  );
}

export default App;