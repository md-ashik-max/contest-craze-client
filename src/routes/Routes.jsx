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
import MyCreatedContest from "../pages/Dashboard/CreatorRoute/MyCreatedContest";
import UpdateContest from "../pages/Dashboard/CreatorRoute/UpdateContest";
import CreatorHome from "../pages/Dashboard/CreatorRoute/CreatorHome";
import AdminHome from "../pages/Dashboard/AdminRoute/AdminHome";
import SubmittedContest from "../pages/Dashboard/CreatorRoute/SubmittedContest";
import MyProfile from "../pages/Dashboard/UserRoute/MyProfile";
import MyParticipatedContest from "../pages/Dashboard/UserRoute/MyParticipatedContest";
import ContestParticipants from "../pages/Dashboard/CreatorRoute/ContestParticipants";
import MyWinningContest from "../pages/Dashboard/UserRoute/MyWinningContest";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/signIn',
        element: <SignIn></SignIn>
      },
      {
        path: '/signUp',
        element: <SignUp></SignUp>
      },
      {
        path: '/allContest',
        element: <AllContest></AllContest>,
      },
      {
        path: '/contestDetails/:id',
        element: <PrivetRoute><ContestDetails></ContestDetails></PrivetRoute>,
        loader: ({ params }) => fetch(`https://contest-craze-server.vercel.app/contests/${params.id}`)
      }
    ]
  },
  {
    path: '/dashboard',
    element: <Dashboard></Dashboard>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [

      // user route
      {
        path: 'userProfile',
        element: <MyProfile></MyProfile>
      },
      {
        path:'participate',
        element:<MyParticipatedContest></MyParticipatedContest>
      },
      {
        path:'winningContest',
        element:<MyWinningContest></MyWinningContest>
      },


      // admin route

      {
        path: 'adminHome',
        element: <AdminHome></AdminHome>
      },
      {
        path: 'manageUsers',
        element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
      },
      {
        path: 'manageContest',
        element: <AdminRoute><ManageContest></ManageContest></AdminRoute>
      },

      // creator route

      {
        path: 'creatorHome',
        element: <CreatorHome></CreatorHome>
      },

      {
        path: 'addContest',
        element: <CreatorRoute><AddContest></AddContest></CreatorRoute>
      },
      {
        path: 'myCreated',
        element: <CreatorRoute><MyCreatedContest></MyCreatedContest></CreatorRoute>

      },
      {
        path: 'updateContest/:id',
        element: <CreatorRoute><UpdateContest></UpdateContest></CreatorRoute>,
        loader: ({ params }) => fetch(`https://contest-craze-server.vercel.app/contests/${params.id}`)
      },
      {
        path: 'submittedContest',
        element: <CreatorRoute><SubmittedContest></SubmittedContest></CreatorRoute>
      },
      {
        path: 'contestParticipants/:name',
        element: <CreatorRoute><ContestParticipants></ContestParticipants></CreatorRoute>,
        loader: ({ params }) => fetch(`https://contest-craze-server.vercel.app/submitContest/${params.name}`)
      }


    ]
  },
]);