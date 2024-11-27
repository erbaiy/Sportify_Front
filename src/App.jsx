// // App.jsx
// import React from "react";
// import AppRouter from "./Router"; // Ensure to import your AppRouter
// import { AuthContext, AuthProvider } from "./context/context";

// const App = () => {
//     return (
//         <div>
//             <AuthProvider>
//             <AppRouter /> {/* Use AppRouter here */}
//             </AuthProvider> 
            
//         </div>
//     );
// };

// export default App;



import AppRouter from "./Router"; 

const App = () => {
    return (
            <AppRouter />
    );
};

export default App;
