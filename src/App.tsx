import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import {
  Dashboard,
  Login,
  Calendar,
  ManageUsers,
  Logout,
  Rooms,
  ManageRoomTypes,
} from "./routes";
import { FirebaseProvider } from "./providers/FirebaseProvider";
import { ConfirmModalProvider } from "./providers/ConfirmModalProvider";
const router = createBrowserRouter([
  {
    element: (
      <FirebaseProvider>
        <ConfirmModalProvider>
          <Outlet />
        </ConfirmModalProvider>
      </FirebaseProvider>
    ),
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
          {
            path: "roomtypes",
            element: <ManageRoomTypes />,
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
