import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes.tsx";
import { type FC, useEffect } from "react";
import { AuthStateHook, useAuthState } from 'react-firebase-hooks/auth'
import { type Auth, getAuth } from 'firebase/auth'
import { useAppDispatch } from 'shared/lib'
import { setUser } from "entities/user";


export const AppRouter: FC = () => {
  const auth: Auth = getAuth()
  const [user, loading]: AuthStateHook = useAuthState(auth);
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (user) {
      dispatch(setUser({
        email: user.email!,
        userName: user.displayName!,
        uid: user.uid,
      }))
    }
  }, [user])

  const routes = user ? privateRoutes : publicRoutes;

  const router = createBrowserRouter(routes)


  if (loading) {
    return <div>Loading...</div>;
  }

  return <RouterProvider router={router}/>
}

