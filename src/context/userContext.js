import React, { useEffect, useState } from "react";
const UserContext = React.createContext(null);
function UserProvider({ children }) {
    let defaultValue = {
        email: "",
        auth: false,
    };
    const [user, setUser] = useState(defaultValue);

    const loginContext = (email, token) => {
        setUser({ email, auth: true });
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
    };

    const logoutContext = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        setUser({
            email: "",
            auth: false,
        });
    };

    return (
        <UserContext.Provider value={{ user, loginContext, logoutContext }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserProvider, UserContext };
