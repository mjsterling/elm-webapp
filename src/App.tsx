import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Dashboard,
  Login,
  Calendar,
  ManageUsers,
  Logout,
  Rooms,
} from "./routes";
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
          {
            path: "rooms",
            element: <Rooms />,
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
