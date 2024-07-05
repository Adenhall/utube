import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { ping } from "./services/auth";

import Root from "./pages/Root";
import Share, { action as sharePageAction } from "./pages/Share";
import VideoList, { loader as videoListLoader } from "./pages/VideoList";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" loader={ping} element={<Root />}>
      <Route path="/" loader={videoListLoader} element={<VideoList />} />
      <Route path="/share" action={sharePageAction} element={<Share />} />
    </Route>,
  ),
);
