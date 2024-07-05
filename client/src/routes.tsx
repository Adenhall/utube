import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Root from "./pages/Root";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="/" element={<h1>List of videos here</h1>} />
      <Route path="/share" element={<h1>Sharing form goes here woot woot!</h1>} />
    </Route>,
  ),
);
