import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const ProtectedRoute = ({ children, component: Component, ...rest }) => {
    const { currentUser } = useAuth();
    return (
        <Route
            {...rest}
            render={(props) => {
                if (currentUser) {
                    return Component ? <Component {...props} /> : children;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }
            }}
        />
    );
};

ProtectedRoute.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ]),
    component: PropTypes.func,
    location: PropTypes.object
};

export default ProtectedRoute;
