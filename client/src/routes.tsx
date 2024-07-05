import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Root from "./pages/Root";
import { ping } from "./services/auth";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" loader={ping} element={<Root />}>
      <Route path="/" element={<h1>List of videos here</h1>} />
      <Route
        path="/share"
        element={<h1>Sharing form goes here woot woot!</h1>}
      />
    </Route>,
  ),
);
