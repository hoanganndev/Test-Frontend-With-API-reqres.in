import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { handleLoginRedux } from "../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPass, setIsShowPass] = useState(false);
    const isLoading = useSelector(state => state.user.isLoading);
    const account = useSelector(state => state.user.account);

    const handleLogin = async () => {
        if (!email || !password) {
            toast.warning("Email/Password is required !");
            return;
        }

        dispatch(handleLoginRedux(email, password));
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
        if (account && account.auth === true) {
            navigate("/");
        }
    }, [account]);

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
