import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Truck } from "lucide-react";
import { validateRegister } from "../../utils/validation";
import { sendData } from "../../hooks/sendData";
import LeftSide from './components/LefSide';
import toast, { Toaster } from 'react-hot-toast';

function Register() {
  //  initialize the useNavigate hook
  const navigate = useNavigate();

  // Initialize the states for errors, isLoading, and showPassword
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  //make reference to the input fields
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const firstNameRef=useRef();
  const lastNameRef=useRef();

  //  toggle password visibility
  const togglePasswordVisibility = () => setShowPassword(prev => !prev);

  // handle the form submission and send the data to the server
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      firstName:firstNameRef.current.value,
      lastName:lastNameRef.current.value,
    };

    const { isValid, errors: validationErrors } = validateRegister(formData);

    if (!isValid) {
      console.log('not valid',errors)
      setErrors(validationErrors);
      return;
    }
    console.log('valid')

    setIsLoading(true);

    try {

      const response = await sendData("/auth/register", formData );
   
      if (response.status === 201) {
        toast.success('Registration successful! Please verify your account.');
        setTimeout(() => navigate('/login'), 2000);
        localStorage.clear();
      } else {
        throw new Error("Unexpected error occurred.");
      }
    } catch (error) {

      toast.error(error.response?.data?.error || 'Something went wrong.');
      if (error.response?.status === 400) {
        const backendErrors = error.response.data.errors;
        setErrors(prevErrors => ({ ...prevErrors, ...backendErrors }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Toaster position="top-center" reverseOrder={false} />
      <LeftSide />
      
      <div className="lg:p-8 pt-44 m-[30px]">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Register</h1>
            <p className="text-sm text-muted-foreground">Enter your email & password</p>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="flex flex-col gap-4">
              <input
                type="text"
                ref={usernameRef}
                className={`border p-2 rounded-md ${errors.username ? "border-red-500" : ""}`}
                placeholder="Username"
                required
              />
              {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
              {/* firstName */}
              <input
                type="text"
                ref={firstNameRef}
                className={`border p-2 rounded-md ${errors.firstName ? "border-red-500" : ""}`}
                placeholder="firstName"
                required
              />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}

              {/* lastName */}
              <input
                type="text"
                ref={lastNameRef}
                className={`border p-2 rounded-md ${errors.lastName ? "border-red-500" : ""}`}
                placeholder="lastName"
                required
              />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}

              <input
                type="email"
                ref={emailRef}
                className={`border p-2 rounded-md ${errors.email ? "border-red-500" : ""}`}
                placeholder="Email"
                required
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  ref={passwordRef}
                  className={`border p-2 rounded-md w-full ${errors.password ? "border-red-500" : ""}`}
                  placeholder="Password"
                  required
                />
                <button type="button" className="absolute right-2 top-2" onClick={togglePasswordVisibility}>
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

             
            </div>

            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors" disabled={isLoading}>
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>
          <p className="px-8 text-center text-sm text-muted-foreground">
            
            By clicking continue, you agree to our{" "}
            <Link to="/terms" className="underline hover:text-primary">Terms of Service</Link> and{" "}
            <Link to="/privacy" className="underline hover:text-primary">Privacy Policy</Link>.
            
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;