import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { ping } from "./services/auth";

import Root from "./pages/Root";
import Share from "./pages/Share";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" loader={ping} element={<Root />}>
      <Route path="/" element={<h1>List of videos here</h1>} />
      <Route path="/share" element={<Share />} />
    </Route>,
  ),
);
