
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./auth/Login"
import Signup from "./auth/Signup"
import MainLayout from "./layout/MainLayout"
import { AuthenticatedUser, ProtectedRoutes } from "./components/Auth"




const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <MainLayout />
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "/",
        element: <div>Home Page</div>
      }
    ]
  },
  {
    path: "/login",
    element:
      <AuthenticatedUser>
        <Login />
      </AuthenticatedUser>
  },
  {
    path: "/signup",
    element:
      <AuthenticatedUser>
        <Signup />
      </AuthenticatedUser>
  }

])


function App() {


  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  )
}

export default App
