import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Truck } from "lucide-react";
import LeftSide from './components/LefSide';

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const roleRef = useRef();

  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);

  const roleIcons = {
    Client: User,
    Livreur: Truck,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  };

  return (
    <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
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

              <label className="text-sm font-medium text-gray-700">Select Role</label>
              <div className="space-y-2 flex justify-between">
                {Object.entries(roleIcons).map(([role, Icon]) => (
                  <label key={role} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="roles"
                      value={role}
                      className="form-radio text-blue-600"
                      ref={roleRef}
                      required
                    />
                    <Icon size={18} className="text-gray-600" />
                    <span>{role}</span>
                  </label>
                ))}
              </div>
              {errors.roles && <p className="text-red-500 text-sm">{errors.roles}</p>}
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