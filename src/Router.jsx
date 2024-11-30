



import { Routes, Route } from "react-router-dom";
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Home from './pages/Dashboard/Home';
import AuthMiddleware from "./middleware/AuthMiddleware";
import Layout from "./layouts/layout";
import EventForm from "./pages/Dashboard/event/EventForm";
import Events from './pages/Dashboard/event/Event';
import EventRegistrationForm from "./pages/Dashboard/registration/registration";
import Participants from "./pages/Dashboard/registration/participants";

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
                <Route path="/create-event" element={<EventForm/>}/>
                <Route path="/registration/:id" element={<EventRegistrationForm/>}/>
                <Route path="/participants" element={<Participants/>}/>
            </Route>
        </Routes>
    );
};

export default AppRouter;
