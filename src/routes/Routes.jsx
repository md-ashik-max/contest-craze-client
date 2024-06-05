import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import SignIn from "../pages/SignIn/SignIn";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import AllContest from "../pages/AllContest/AllContest/AllContest";
import SignUp from "../pages/SignUp/SignUp";
import Dashboard from "../Layout/Dashboard";
import ManageUsers from "../pages/Dashboard/AdminRoute/ManageUsers";
import AdminRoute from "./AdminRoute";
import PrivetRoute from "./PrivetRoute";
import CreatorRoute from "./CreatorRoute";
import AddContest from "../pages/Dashboard/CreatorRoute/AddContest";
import ManageContest from "../pages/Dashboard/AdminRoute/ManageContest";
import ContestDetails from "../pages/AllContest/ContestDetails/ContestDetails";


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
          path:'/signUp',
          element:<SignUp></SignUp>
        },
        {
          path:'/allContest',
          element:<AllContest></AllContest>,
        },
        {
          path:'/contestDetails/:id',
          element:<PrivetRoute><ContestDetails></ContestDetails></PrivetRoute>,
          loader:({params})=>fetch(`http://localhost:5000/contests/${params.id}`)
        }
      ]
    },
    {
      path:'/dashboard',
      element:<Dashboard></Dashboard>,
      errorElement:<ErrorPage></ErrorPage>,
      children:[
        // admin route
        {
          path:'manageUsers',
          element:<AdminRoute><ManageUsers></ManageUsers></AdminRoute>
        },
        {
          path:'manageContest',
          element:<AdminRoute><ManageContest></ManageContest></AdminRoute>
        },

        // creator route

        {
          path:'addContest',
          element:<CreatorRoute><AddContest></AddContest></CreatorRoute>
        }


      ]
    }
  ]);