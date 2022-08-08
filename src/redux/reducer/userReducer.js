import {
    USER_LOGIN_FAILSED,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REFRESH,
} from "../actions/Types";

const INITIAL_STATE = {
    account: {
        email: "",
        token: "",
        auth: false,
    },
    isLoading: false,
    isError: false,
};

const accountReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
            };
        case USER_LOGIN_SUCCESS:
            console.log(">>> USER_LOGIN_SUCCESS", action);
            return {
                ...state,
                account: {
                    email: action.data.email,
                    token: action.data.token,
                    auth: true,
                },
                isLoading: false,
                isError: false,
            };
        case USER_LOGIN_FAILSED:
            return {
                ...state,
                account: { auth: false },
                isLoading: false,
                isError: true,
            };
        case USER_LOGOUT:
            //remove local storage
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            return {
                ...state,
                account: {
                    email: "",
                    token: "",
                    auth: false,
                },
                isLoading: false,
                isError: false,
            };
        case USER_REFRESH:
            //remove local storage
            const token = localStorage.getItem("token");
            const email = localStorage.getItem("email");
            let dataAccount = {};
            if (token && email) {
                dataAccount = { email: email, token: token, auth: true };
            } else {
                dataAccount = { email: "", token: "", auth: false };
            }
            return {
                ...state,
                account: dataAccount,
                isLoading: false,
                isError: false,
            };
        default:
            return state;
    }
};

export default accountReducer;
