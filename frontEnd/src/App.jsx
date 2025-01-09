import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import RootLayout from "./components/RootLayout"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import "../src/app.css"
import Users from "./components/Users"
import ProtectedRoutes from "./components/routes/ProtectedRoutes"
import MainPage from "./pages/MainPage"
import ForgotPassword from "./pages/auth/Forgot_Password"
import Reset_Password from "./pages/auth/ResetPassword"
function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<RootLayout/>}>
    <Route index element={<MainPage/>}/>
      <Route path="auth">
       <Route path="register" element={<Signup/>}/>
       <Route path="login" element= {<Login/>}/>
       <Route path="forgot-password" element={<ForgotPassword/>} />
       <Route path="reset-password" element={<Reset_Password/>}/>
      </Route>
      <Route path="/users" element={
        <ProtectedRoutes>
          <Users/>
        </ProtectedRoutes>
      }/>
     
    </Route>
  ))
  return <RouterProvider router={router}/>
}

export default App
