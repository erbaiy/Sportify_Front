
import { useEffect } from "react";
import axiosInstance from "../../config/axios";
import Logout from "../Auth/Logout";
function Home() {
console.log("hello")
useEffect(() => {

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('/home')
            console.log('Data sent:', response);
        } catch (error) {
            console.error('Error sending data:', error);
        }
    }
    fetchData()
    
}
, [])
    return (
        <div>
            hello in page event dashboard 

            Lorem ipsum dolor sit amet consectetur adipisicing elit. In, facilis. Sapiente nostrum maxime cumque quae! Sunt exercitationem, error totam corporis omnis ipsum fuga? Vero similique aspernatur hic sapiente quas eius?
            

        </div>
    );
}

export default Home;