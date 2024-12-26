import ErrorPage from "../Error-page";
import Root from "./Root";
import Login from "../Login/Login";
import App from "../../App";
import { createBrowserRouter } from "react-router-dom";
import VerificationCodeInput from "../VerificationCodeInput/VerificationCodeInput";
import MentorProfile from "../Mentorinfo/MentorProfile";
import ProductOwnerProfile from "../ProductOwnerInfo/ProductOwnerProfile";
import MentorMatch from "../MatchPage/MentorMatch";
import Inbox from "../Inbox/Inbox";
import ProductPage from "../productAnalyticsComponents/productPage";
import Calendly from "../Calendly/Calendly";
import ProductMatch from "../MatchPage/ProductMatch";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/verification-code",
        element: <VerificationCodeInput />,
      },
      {
        path: "/mentor-profile",
        element: (
          <ProtectedRoute>
            <MentorProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/product-profile",
        element: (
          <ProtectedRoute>
            <ProductOwnerProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/product/match",
        element: (
          <ProtectedRoute>
            <ProductMatch />
          </ProtectedRoute>
        ),
      },
      {
        path: "/mentor/match",
        element: (
          <ProtectedRoute>
            <MentorMatch />
          </ProtectedRoute>
        ),
      },
      {
        path: "/inbox",
        element: (
          <ProtectedRoute>
            <Inbox />
          </ProtectedRoute>
        ),
      },
      {
        path: "/product/dashboard",
        element: (
          <ProtectedRoute>
            <ProductPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/product/profile",
        element: (
          <ProtectedRoute>
            <ProductPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/connect/calendly",
        element: (
          <ProtectedRoute>
            <Calendly />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
