import React from "react";
import MainLayout from "./mainLayout";
import { SessionProvider } from "./session";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginRegister from "./pages/LoginRegister";
import PrivateRoute from "./pages/PrivateRoute";

const items = [
  { to: "/", content: "Home" },
  { to: "/users", content: "Users" },
  { to: "/about", content: "About" }
];

export default function App() {
  return (
    <SessionProvider>
      <Router>
        <Switch>
          <Route exact path="/login">
            <LoginRegister type="Login" color="teal" />
          </Route>
          <Route exact path="/register">
            <LoginRegister type="Register" color="blue" />
          </Route>
          <PrivateRoute>
            <MainLayout items={items} />
          </PrivateRoute>
        </Switch>
      </Router>
    </SessionProvider>
  );
}
