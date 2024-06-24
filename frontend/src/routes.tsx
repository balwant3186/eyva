import { createBrowserRouter } from "react-router-dom";
import Members from "./pages/Members";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Members />,
  },
]);

export default router;
