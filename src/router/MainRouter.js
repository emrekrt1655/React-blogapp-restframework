import { lazy, Suspense, Fragment } from "react";

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import HomePage from "../pages/HomePage/HomePage";
import Navbar from "../components/Navbar";

export const MainRouter = () => {
  const isLoggedIn = false;

  return (
    <Router>
      <Suspense fallback="loading...">
        <Navbar />
        <Switch>
          <Route path="/login" component={LoginPage} exact />
          <Route path="/register" component={RegisterPage} exact />
          <Route path="/" component={HomePage} exact />
        </Switch>
      </Suspense>
    </Router>
  );
};


