import React from "react";
import { Redirect, Route, Switch } from "react-router";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Users from "./layouts/users";
import Navbar from "./components/UI/navbar";
import EditUserPage from "./components/page/editUserPage";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfessions";
import { QualityProvider } from "./hooks/useQuality";

const App = () => {
    return (
        <>
            <Navbar />
            <Switch>
                <Route path="/" exact component={Main} />
                <ProfessionProvider>
                    <QualityProvider>
                        <Route path="/login/:type?" component={Login} />
                        <Route
                            path="/users/:userId?/edit"
                            component={EditUserPage}
                        />
                        <Route path="/users/:userId?/" component={Users} />
                    </QualityProvider>
                </ProfessionProvider>
                <Redirect to="/" />
            </Switch>
            <ToastContainer />
        </>
    );
};

export default App;
