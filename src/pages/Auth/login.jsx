import { useContext, useRef, useState } from "react";
import { cn } from "@/lib/utils"; 
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { Eye, EyeOff } from "lucide-react"; 
import { loginValidation } from "../../utils/validation"; 
import { sendData } from "../../hooks/sendData";
import toast, { Toaster } from 'react-hot-toast';
import LefSide from "./components/LefSide";
import { AuthContext } from "../../context/context";


function Login() {

  const { setAuthState } = useContext(AuthContext);

  const emailRef = useRef();
  const passwordRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [notSuccess, setNotSuccess] = useState(false);
  const [backendError, setBackendError] = useState(false);
  
  const navigate = useNavigate(); // Initialize useNavigate

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };


  const clearForm = () => {
    emailRef.current.value = '';
    passwordRef.current.value = '';
    setErrors({});
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    
    const { isValid, errors } = loginValidation(email, password);
    
    if (!isValid) {
      return setErrors(errors);
    }
    
    setErrors({});
    setIsLoading(true);

    try {
      const response = await sendData("/auth/login", { email, password });
      if (response.status === 201) {
        setSuccess(true);
        clearForm();
        toast.success('Login successful!  redirecting ... ');
        localStorage.setItem('token',response.data.access_token)
        setAuthState({ isAuthenticated: true });

        localStorage.setItem("isAuthenticated", true);
        setTimeout(() => {
          navigate("/");
        }, 2000); // Redirect after 2 seconds
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Toaster position="top-center" reverseOrder={false} />
   <LefSide/>

      <div className="lg:p-8 pt-44 m-[30px]">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
            <p className="text-sm text-muted-foreground">Enter your email & password</p>
          </div>
          <form onSubmit={handleSubmit} className={cn("grid gap-6")}>
            <div className="flex flex-col gap-4">
              <input
                type="email"
                className={`border p-2 rounded-md ${errors.email ? "border-red-500" : ""}`}
                placeholder="Email"
                ref={emailRef}
                required
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`border p-2 rounded-md w-full ${errors.password ? "border-red-500" : ""}`}
                  placeholder="Password"
                  ref={passwordRef}
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-2"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500">{errors.password}</p>}
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>
          <p className="px-8 text-center text-sm text-muted-foreground">
            Are you forget you're password?, Click here {" "}
            <Link to="/forget-password" className="underline hover:text-primary">forget-password</Link> .
            
          </p>
        </div>
      </div>

   
    </div>
  );
}

export default Login;


