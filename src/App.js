import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "./App.scss";
import Header from "./components/Header/Header";
import { handleRefresh } from "./redux/actions/userActions";
import AppRoutes from "./routes/AppRoutes";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(handleRefresh());
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
