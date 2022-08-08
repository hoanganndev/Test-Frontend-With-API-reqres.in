import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PrivateRoute = props => {
    const { account } = useSelector(state => state.user);
    let navigate = useNavigate();
    console.log(">>> check me", account);
    if (account && !account.auth) {
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
