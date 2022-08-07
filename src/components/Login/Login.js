import React, { useContext, useEffect, useState } from "react";
import "./Login.scss";
import { loginUser } from "../../services/usersService";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const Login = () => {
    const navigate = useNavigate();
    const { loginContext } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPass, setIsShowPass] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            toast.warning("Email/Password is required !");
            return;
        }
        setIsLoading(true);
        let res = await loginUser(email.trim(), password);
        if (res && res.token) {
            loginContext(email, res.token);
            toast.success("Login success !");
            navigate("/");
        }
        if (res && res.status === 400 && res.data) {
            toast.warning(res.data.error);
        }
        setIsLoading(false);
    };

    const handleGoBack = () => {
        navigate("/");
    };

    const handleOnKeyPress = event => {
        if (event.key === "Enter") {
            handleLogin();
        }
    };

    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token) {
            navigate("/");
        }
    }, []);

    return (
        <>
            <div className="login-Container col-12 col-sm-4">
                <div className="title">Login</div>
                <div className="text">
                    Email or username: ( <i>eve.holt@reqres.in</i> )
                </div>
                <input
                    type="text"
                    placeholder="Enter email or username"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <div className="input-password">
                    <input
                        placeholder="Password ..."
                        value={password}
                        type={isShowPass === true ? "text" : "password"}
                        onChange={e => setPassword(e.target.value)}
                        onKeyDown={e => handleOnKeyPress(e)}
                    />
                    <i
                        className={
                            isShowPass === true
                                ? "fa-solid fa-eye-slash"
                                : "fa-solid fa-eye"
                        }
                        onClick={() => setIsShowPass(!isShowPass)}
                    ></i>
                </div>
                <button
                    type="button"
                    disabled={email && password ? false : true}
                    className={email && password ? "active" : ""}
                    onClick={() => handleLogin()}
                >
                    {isLoading === true ? (
                        <>
                            <span className="mx-2">
                                <i className="fas fa-spinner fa-pulse" />
                            </span>
                            <span>Login</span>
                        </>
                    ) : (
                        <>
                            <span>Login</span>
                        </>
                    )}
                </button>
                <div className="back">
                    <i className="fa-solid fa-angles-left" />
                    <span onClick={() => handleGoBack()}>&nbsp;Go back</span>
                </div>
            </div>
        </>
    );
};

export default Login;
