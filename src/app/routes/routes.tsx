import { Navigate, RouteObject } from "react-router-dom";
import { Register } from "pages/register";
import { Login } from "pages/login";
import { Chat, Messages } from "pages/chat";

const publicRoutes: RouteObject[] = [
  {
    path: '*',
    element: <Navigate to="/sign-in" replace/>
  },
  {
    path: "/sign-up",
    element: <Register/>,
  },
  {
    path: "/sign-in",
    element: <Login/>,
  }
]

const privateRoutes: RouteObject[] = [
  {
    path: '*',
    element: <Navigate to="/chat" replace/>
  },
  {
    path: "/chat",
    element: <Chat/>,
    children: [
      {
        path: "/chat/:id",
        element: <Messages/>
      }
    ]
  },
];

export { publicRoutes, privateRoutes };
