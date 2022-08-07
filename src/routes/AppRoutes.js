import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "../components/Home/Home";
import Login from "../components/Login/Login";
import TableUsers from "../components/Users/TableUsers";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
    let navigate = useNavigate();
    const NotFound = () => {
        return (
            <div className="alert alert-warning text-center mt-3" role="alert">
                <i style={{ color: "red" }}>
                    <h3>Oops... ! 404 Not Found</h3>
                    <b
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("/login")}
                    >
                        Please login !
                    </b>
                </i>
            </div>
        );
    };
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/users"
                    element={
                        <PrivateRoute>
                            <TableUsers />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default AppRoutes;
