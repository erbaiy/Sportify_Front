
// import { createBrowserRouter } from "react-router-dom"; // Import createBrowserRouter
// import Login from './pages/Auth/Login';
// import Home from './pages/Dashboard/Home';
// import Layout from "./layouts/layout";

// // Higher-order component to apply middleware
// // const withAuth = (element) => <AuthMiddleware>{element}</AuthMiddleware>;

// export const routes = [
//   {
//     path: "/Login",
//     element: <Login />

//   },
 
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       { path: "Dashboard", element: <Home /> },
  
  
//     ],
//   },
// ];

// const router = createBrowserRouter(routes);

// export default router;







// import { Routes, Route } from "react-router-dom"; // Import Routes and Route
// import Register from './pages/Auth/Register';
// import Login from './pages/Auth/Login';
// import Home from './pages/Dashboard/Home';
// import AuthMiddleware from "./middleware/AuthMiddleware";
// import Layout from "./layouts/layout";
// const AppRouter = () => {
//     return (
//         <Routes>
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />

            
//             <Route path="/" element={
//             <Layout>
//                 <Route path="/" element={<Home />} />
//             </Layout>
//         } />
//         </Routes>
//     );
// };

// export default AppRouter;



import { Routes, Route } from "react-router-dom";
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Home from './pages/Dashboard/Home';
import AuthMiddleware from "./middleware/AuthMiddleware";
import Layout from "./layouts/layout";
import { Table } from "lucide-react";
import TableF from "./pages/Dashboard/tabel";

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
                <Route path="dashboard/table" element={<TableF />} />




            </Route>
        </Routes>
    );
};

export default AppRouter;
