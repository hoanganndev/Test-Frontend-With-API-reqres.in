import React, { useContext, useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "./Header.scss";
import { toast } from "react-toastify";
import { UserContext } from "../../context/userContext";

const Header = () => {
    const { user, logoutContext } = useContext(UserContext);

    const navigate = useNavigate();
    const handleLogout = () => {
        let token = localStorage.getItem("token");
        if (token) {
            logoutContext(); // remove token
            toast.success("Logout success !");
            navigate("/");
        }
    };

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">
                        <img src={logo} alt="" className="logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {((user && user.auth) ||
                            window.location.pathname === "/") && (
                            <>
                                <Nav className="me-auto">
                                    <NavLink to={"/"} className="nav-link">
                                        Home
                                    </NavLink>
                                    <NavLink to={"/users"} className="nav-link">
                                        Users
                                    </NavLink>
                                </Nav>
                                <Nav>
                                    <span className="navbar-text">
                                        welcome:
                                        <b>
                                            {user && user.auth && user.email
                                                ? user.email
                                                : ""}{" "}
                                        </b>
                                        !
                                    </span>
                                    <NavDropdown
                                        title="Settings"
                                        id="basic-nav-dropdown"
                                    >
                                        {user && user.auth ? (
                                            <NavDropdown.Item
                                                onClick={() => handleLogout()}
                                            >
                                                Logout
                                            </NavDropdown.Item>
                                        ) : (
                                            <NavLink
                                                to={"/login"}
                                                className="dropdown-item"
                                            >
                                                Login
                                            </NavLink>
                                        )}
                                    </NavDropdown>
                                </Nav>
                            </>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;
