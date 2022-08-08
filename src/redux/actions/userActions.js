import { toast } from "react-toastify";
import { loginUser } from "../../services/usersService";
import {
    USER_LOGIN_FAILSED,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REFRESH,
} from "./Types";

//Middleware redux thunk have 3 status: Start -> Doing -> Finish
export const handleLoginRedux = (email, password) => {
    return async (dispatch, getState) => {
        dispatch({ type: USER_LOGIN_REQUEST });
        //call api
        let res = await loginUser(email.trim(), password);
        if (res && res.token) {
            //save local storage
            localStorage.setItem("token", res.token);
            localStorage.setItem("email", email.trim());
            dispatch({
                type: USER_LOGIN_SUCCESS,
                data: { email: email.trim(), token: res.token },
            });
            toast.success("Login success !");
        } else {
            //error
            if (res && res.status === 400 && res.data) {
                toast.warning(res.data.error);
            }
            dispatch({
                type: USER_LOGIN_FAILSED,
            });
        }
    };
};
export const handleLogoutRedux = () => {
    return (dispatch, getState) => {
        dispatch({ type: USER_LOGOUT });
    };
};
export const handleRefresh = () => {
    return (dispatch, getState) => {
        dispatch({ type: USER_REFRESH });
    };
};
