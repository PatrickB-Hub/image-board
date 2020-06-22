import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Main from "../components/Layout/Main";
import Home from "../components/Home";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import Profile from "../components/Profile/Profile";

const AppRouter = () => (
  <Router>
    <Main>
      <Switch>
        <Route exact path="/image-board/" component={Home} />
        <Route path="/image-board/login" component={Login} />
        <Route path="/image-board/register" component={Register} />
        <Route path="/image-board/profile/:userId" component={Profile} />
      </Switch>
    </Main>
  </Router>
);

export default AppRouter;
