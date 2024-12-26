import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContextProvider";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useUser();

  if (!isLoggedIn) {

    return <Navigate to="/login" />;
  }


  return children;
};

export default ProtectedRoute;
