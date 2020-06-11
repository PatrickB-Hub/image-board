import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Main from "../components/Layout/Main";
import Register from "../components/Auth/Register";

const AppRouter = () => (
  <Router>
    <Main>
      <Switch>
        <Route path="/image-board/register" component={Register} />
      </Switch>
    </Main>
  </Router>
);

export default AppRouter;
