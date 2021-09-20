import React from "react";
import { Redirect, Route, Switch } from "react-router";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Navbar from "./components/navbar";
import Users from "./layouts/users";

const App = () => {
    return (
        <>
            <Navbar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users/:userId?" component={Users} />
                <Redirect to="/" />
            </Switch>
        </>
    );
};

export default App;
