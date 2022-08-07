import React, { useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const PrivateRoute = props => {
    const { user } = useContext(UserContext);
    let navigate = useNavigate();
    if (user && !user.auth) {
        return (
            <>
                <div
                    className="alert alert-warning text-center mt-3"
                    role="alert"
                >
                    <i style={{ color: "red" }}>
                        You don't have permission access this page,{" "}
                        <b
                            style={{ cursor: "pointer" }}
                            onClick={() => navigate("/login")}
                        >
                            Please login !
                        </b>
                    </i>
                </div>
            </>
        );
    } else {
        return <>{props.children}</>;
    }
};

export default PrivateRoute;
