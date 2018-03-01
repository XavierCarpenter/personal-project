import React from "react";
import { Switch, Route, } from "react-router-dom";

import Landing from "./components/Landing/Landing";
import Explore from "./components/Explore/Explore";
import ExploreType from "./components/ExploreType/ExploreType";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import BusProfile from "./components/BusProfile/BusProfile";

export default (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route path="/login" component={Login} />
    <Route path="/user/:id" component={Profile} />
    <Route path="/businesses" component={Explore} />
    <Route path="/business/:id" component={BusProfile} />
    <Route path="/type" component={ExploreType} />
    <Route
      path="*"
      render={() => (
        <div>
          <p>Not Found</p>
        </div>
      )}
    />
  </Switch>
);
