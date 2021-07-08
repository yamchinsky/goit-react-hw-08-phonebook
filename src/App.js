import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import HomeView from "./views/HomeView";
import { Switch } from "react-router-dom";
import RegisterView from "./views/RegisterView";
import LoginView from "./views/LoginView";
import ContactsView from "./views/ContactsView";
import Container from "./Components/container/Container";
import AppBar from "./Components/AppBar";
import { authOperations } from "./redux/auth";
import PrivatRoute from "./Components/PrivatRoute";
import PublicRoute from "./Components/PublicRoute";
import AppBar1 from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("useEffect вместо дидмаунт");
    dispatch(authOperations.getCurrentUser());
  }, [dispatch]);

  return (
    <Container>
      <AppBar1 position="static">
        <AppBar />
        <Toolbar>
          <Switch>
            <PublicRoute exact path="/">
              <HomeView />
            </PublicRoute>
            <PublicRoute path="/register" redirectedTo="/" restricted>
              <RegisterView />
            </PublicRoute>

            <PublicRoute path="/login" redirectedTo="/" restricted>
              <LoginView />
            </PublicRoute>
            <PrivatRoute path="/contacts" redirectedTo="/login">
              <ContactsView />
            </PrivatRoute>
          </Switch>
        </Toolbar>
      </AppBar1>
    </Container>
  );
}
