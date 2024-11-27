
import AppRouter from "./Router"; 
import { AuthProvider } from "./context/context"; // Ensure the AuthProvider is correctly imported

const App = () => {
    return (
        <AuthProvider>
            <AppRouter /> 
        </AuthProvider>
    );
};

export default App;
