import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { authSelectors } from "../redux/auth";

export default function PrivatRoute({
  isAuthenticated,
  children,
  redirectedTo,
  ...routeProps
}) {
  const isLoggedIn = useSelector(authSelectors.getIsAuthenticated);
  return (
    <Route {...routeProps}>
      {isLoggedIn ? children : <Redirect to="/Login" />}
    </Route>
  );
}

// const mapStateToProps = (state) => ({
//   isAuthenticated: authSelectors.getIsAuthenticated(state),
// });

// export default connect(mapStateToProps)(PrivatRoute);
