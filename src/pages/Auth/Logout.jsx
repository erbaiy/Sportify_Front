import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/context";


function Logout() {
    const navigate=useNavigate();
    const { setAuthState } = useContext(AuthContext);
    const handleLogout = async(e) => {
        e.preventDefault();
      

    }
    return <button onClick={handleLogout}>Log out</button>;
}

export default Logout;