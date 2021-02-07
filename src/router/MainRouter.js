import { lazy, Suspense, Fragment } from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import PrivateRouter from "./PrivateRouter";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import PostDetail from "../pages/PostDetail/PostDetail";
import {ProfilePage} from "../pages/ProfilePage/ProfilePage";
import {CustomPostPage} from "../pages/CustomPostPage/CustomPostPage";
import Navbar from "../components/Navbar";

export const MainRouter = () => {
  const isLoggedIn = false;

  return (
    <BrowserRouter>
      <Suspense fallback="">
        <Navbar />
        <Switch>
          <Route path="/login" component={LoginPage} exact />
          <Route path="/register" component={RegisterPage} exact />
          <Route path="/" component={HomePage} exact />
          <PrivateRouter exact path="/detail/:slug" component={PostDetail} />
          <PrivateRouter exact path= "/profile" component={ProfilePage} />
          <PrivateRouter exact path= "/edit/:slug" component={CustomPostPage} />
          <PrivateRouter exact path= "/create" component={CustomPostPage} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};
