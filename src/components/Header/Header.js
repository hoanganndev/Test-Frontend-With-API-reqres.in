import React, { useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../assets/images/logo.png";
import { handleLogoutRedux } from "../../redux/actions/userActions";
import "./Header.scss";

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { account } = useSelector(state => state.user);

    const handleLogout = () => {
        let token = localStorage.getItem("token");
        if (token) {
            dispatch(handleLogoutRedux());
            toast.success("Logout success");
        }
    };

    useEffect(() => {
        if (account && account.auth === false) {
            navigate("/");
        }
    }, [account]);

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">
                        <img src={logo} alt="" className="logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {((account && account.auth) ||
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
                                        {account &&
                                        account.auth &&
                                        account.email ? (
                                            <p>
                                                welcome:
                                                <b> {account.email} </b>!
                                            </p>
                                        ) : (
                                            ""
                                        )}
                                    </span>
                                    <NavDropdown
                                        title="Settings"
                                        id="basic-nav-dropdown"
                                    >
                                        {account && account.auth ? (
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
