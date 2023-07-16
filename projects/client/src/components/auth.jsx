import React from "react";
import { Navigate } from "react-router-dom";

function Auth(Component) {
    return (props) => {
        if (localStorage.getItem("token")) {
            return <Component {...props} />;
        }

        return <Navigate to="/" replace />;
    };
}

export default Auth;