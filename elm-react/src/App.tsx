import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard, { loader as dashboardLoader } from "./routes/Dashboard";
import Login, { action as loginAction } from "./routes/Login";
import Signup, { action as signupAction } from "./routes/Signup";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    loader: dashboardLoader,
  },
  {
    path: "/login",
    element: <Login />,
    action: loginAction,
  },
  {
    path: "/signup",
    element: <Signup />,
    action: signupAction,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
