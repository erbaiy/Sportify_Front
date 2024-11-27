







import { Routes, Route } from "react-router-dom"; // Import Routes and Route
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Home from './pages/Dashboard/Home';
import AuthMiddleware from "./middleware/AuthMiddleware";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={
          <AuthMiddleware>
          <Home />
        </AuthMiddleware>
        } />
        </Routes>
    );
};

export default AppRouter;

