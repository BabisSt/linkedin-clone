import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  element: ReactElement;
}

/**
 * TODO : create logic for login
 */
export default function PrivateRoute({ element }: PrivateRouteProps) {
  const isAuthenticated = true;
  return isAuthenticated ? element : <Navigate to="/404" />;
}
