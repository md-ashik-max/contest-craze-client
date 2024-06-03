import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import SignIn from "../pages/SignIn/SignIn";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AllContest from "../pages/AllContest/AllContest/AllContest";


  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement:<ErrorPage></ErrorPage>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
          path:'/signIn',
          element:<SignIn></SignIn>
        },
        {
          path:'/allContest',
          element:<AllContest></AllContest>
        }
      ]
    },
  ]);