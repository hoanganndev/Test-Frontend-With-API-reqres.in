import { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "./App.scss";
import Header from "./components/Header/Header";
import { UserContext } from "./context/userContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
    const { user, loginContext } = useContext(UserContext);
    console.log(">>> check user", user);
    useEffect(() => {
        let token = localStorage.getItem("token");
        let email = localStorage.getItem("email");
        if (token && email) {
            loginContext(email, token);
        }
    }, []);
    return (
        <>
            <div className="app-container">
                <Header />
                <Container>
                    <AppRoutes />
                </Container>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
}

export default App;
