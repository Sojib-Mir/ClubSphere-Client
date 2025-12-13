import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Profile from "../pages/Dashboard/Common/Profile";
import Statistics from "../pages/Dashboard/Common/Statistics";
import MainLayout from "../layouts/MainLayout";
import { createBrowserRouter } from "react-router";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import Clubs from "../pages/Clubs/Clubs";
import Events from "../pages/Events/Events";
import About from "../pages/About/About";
import Home from "../pages/Home/Home/Home";
import EventDetailsCard from "../pages/Events/EventDetailsCard";
import ClubDetailsCard from "../pages/Clubs/ClubDetailsCard";
import ManageClubs from "../pages/Dashboard/Admin/ManageClubs";
import TransactionsHistory from "../pages/Dashboard/Admin/TransactionsHistory";
import AddEvent from "../pages/Dashboard/Manager/AddEvent";
import ManageEvents from "./../pages/Dashboard/Manager/ManageEvents";
import RagisterEvents from "../pages/Dashboard/Manager/RagisterEvents";
import ClubMembers from "../pages/Dashboard/Manager/ClubMembers";
import MyAllEvents from "../pages/Dashboard/Customer/MyAllEvents";
import PaymentHistory from "../pages/Dashboard/Customer/PaymentHistory";
import PaymentSuccess from "../pages/Clubs/PaymentSuccess";
import MyAllClubs from "./../pages/Dashboard/Customer/MyAllClubs";
import ManagerClubs from "../pages/Dashboard/Manager/ManagerClubs";
import AddClub from "../pages/Dashboard/Manager/AddClub";
import ManagerRequests from "../pages/Dashboard/Admin/ManagerRequests";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <LoadingSpinner />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/clubs",
        element: <Clubs />,
      },
      {
        path: "/clubs/:id",
        element: <ClubDetailsCard />,
      },
      {
        path: "payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/events/:id",
        element: <EventDetailsCard />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },

      // Manager's route
      {
        path: "add-event",
        element: (
          <PrivateRoute>
            <AddEvent />
          </PrivateRoute>
        ),
      },

      {
        path: "add-club",
        element: (
          <PrivateRoute>
            <AddClub />
          </PrivateRoute>
        ),
      },

      {
        path: "manager-clubs",
        element: (
          <PrivateRoute>
            <ManagerClubs />
          </PrivateRoute>
        ),
      },
      {
        path: "club-members",
        element: (
          <PrivateRoute>
            <ClubMembers />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-events",
        element: <ManageEvents />,
      },
      {
        path: "ragister-events",
        element: <RagisterEvents />,
      },

      // Admin's route
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: "manager-requests",
        element: (
          <PrivateRoute>
            <ManagerRequests />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-clubs",
        element: (
          <PrivateRoute>
            <ManageClubs />
          </PrivateRoute>
        ),
      },
      {
        path: "transactions-history",
        element: (
          <PrivateRoute>
            <TransactionsHistory />
          </PrivateRoute>
        ),
      },

      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },

      // user's route
      {
        path: "my-clubs",
        element: (
          <PrivateRoute>
            <MyAllClubs />
          </PrivateRoute>
        ),
      },
      {
        path: "my-events",
        element: (
          <PrivateRoute>
            <MyAllEvents />
          </PrivateRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <PrivateRoute>
            <PaymentHistory />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
