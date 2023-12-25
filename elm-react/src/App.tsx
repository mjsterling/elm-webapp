import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Dashboard, Login, Calendar, ManageUsers, Logout } from "./routes";
import { FirebaseProvider } from "./providers/FirebaseProvider";
const router = createBrowserRouter([
  {
    element: <FirebaseProvider />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
        children: [
          {
            id: "index",
            path: "",
            element: <Calendar />,
          },
          {
            path: "users",
            element: <ManageUsers />,
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
