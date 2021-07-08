import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { authSelectors } from "../redux/auth";

export default function PublicRoute({
  isAuthenticated,
  redirectedTo,
  children,
  ...routeProps
}) {
  const isLoggedIn = useSelector(authSelectors.getIsAuthenticated);
  return (
    <Route {...routeProps}>
      {isLoggedIn && routeProps.restricted ? (
        <Redirect to={redirectedTo} />
      ) : (
        children
      )}
    </Route>
  );
}

// const mapStateToProps = (state) => ({
//   isAuthenticated: authSelectors.getIsAuthenticated(state),
// });

// export default connect(mapStateToProps)(PublicRoute);
