



import { Routes, Route } from "react-router-dom";
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Home from './pages/Dashboard/Home';
import AuthMiddleware from "./middleware/AuthMiddleware";
import Layout from "./layouts/layout";
import  Events from "./pages/Dashboard/Event";
import CrecateEvents from "./pages/Dashboard/create-event";
import EventForm from "./pages/Dashboard/EventForm";

const AppRouter = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route
                path="/"
                element={
                    <AuthMiddleware>
                        <Layout />
                    </AuthMiddleware>
                }
            >
                {/* Nested Routes within Layout */}
                <Route index element={<Home />} />
                <Route path="/event" element={<Events/>} />
                <Route path="/create-event" element={<EventForm/>} />





            </Route>
        </Routes>
    );
};

export default AppRouter;
