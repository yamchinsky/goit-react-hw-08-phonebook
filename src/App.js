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

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("useEffect вместо дидмаунт");
    dispatch(authOperations.getCurrentUser());
  }, [dispatch]);

  return (
    <Container>
      <AppBar />

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
    </Container>
  );
}
