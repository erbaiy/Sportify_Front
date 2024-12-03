# Sports Event Registration System - Frontend Documentation

## Table of Contents
- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Key Features](#key-features)
- [Components Architecture](#components-architecture)
- [State Management](#state-management)
- [Authentication & Authorization](#authentication--authorization)
- [Routing](#routing)
- [API Integration](#api-integration)
- [Error Handling](#error-handling)
- [Docker Integration](#docker-integration)

## Overview
This frontend application is built for managing sports event registrations, allowing organizers to create, manage events, and handle participant registrations.

## Technology Stack
- React.js
- Redux/Context API for state management
- React Router for navigation
- Axios for API requests
- Docker for containerization

## Project Structure
```
src/
├── assets/           # Static assets like images, fonts
├── components/
│   ├── ui/          # Reusable UI components
│   │   ├── alert.js
│   │   ├── button.js
│   │   └── radio-group.jsx
│   └── Auth/        # Authentication related components
├── config/
│   └── axios.js     # Axios configuration and instances
├── context/
│   └── context.jsx  # Global context definitions
├── hooks/
│   └── sendData.jsx # Custom hooks for data operations
├── layouts/
│   └── layout.jsx   # Layout components and templates
├── lib/
│   ├── utils.js
│   └── middleware/
│       └── AuthMiddleware.jsx
├── pages/
│   ├── Auth/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── PopUpSuccess.jsx
│   └── Dashboard.jsx
├── tests/           # Test files
├── utils/           # Utility functions and helpers
├── App.css
├── App.jsx
├── index.css
└── Router.jsx       # Application routing configuration

```

## Setup Instructions
1. Clone the repository:
```bash
git clone https://github.com/erbaiy/Sportify_front
cd Sportify_front
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
REACT_APP_API_URL=http://localhost:3000
```

4. Start development server:
```bash
npm run dev
```

## Key Features
- Event management (CRUD operations)
- Participant registration
- Registration list generation and printing
- Authentication and authorization
- Protected routes
## Components Architecture

### Common Components
- `Button`: Reusable button component with different variants
- `Input`: Form input component with validation
- `Modal`: Popup dialog component for forms and confirmations

### Event Components
- `Events`: Displays list of all events
- `EventForm`: Create event form

### Participant Components
- `Participants`: Displays registered participants
- `EventRegistrationForm`: Handle participant registration

## State Management

### Context API Implementation


```javascript
// src/context/AuthContext.jsx
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isAuthenticated: Boolean(localStorage.getItem('isAuthenticated')) ,
    });

    return (
        <AuthContext.Provider value={{authState, setAuthState}}>
            {children}
        </AuthContext.Provider>
    );
};

```

## Authentication & Authorization

### Protected Routes
```javascript
// src/midleware/AuthMidleware.jsx
import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/context";

const AuthMiddleware = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { authState } = useContext(AuthContext);

    useEffect(() => {
        if (!authState.isAuthenticated) {
            console.log("User is not authenticated");
            
            navigate("/login", { state: { from: location.pathname } });
        }
    }, [authState.isAuthenticated, navigate, location]);

    return authState.isAuthenticated ? children : null;
};

export default AuthMiddleware;
```

## Routing

```javascript
// src/Router.jsx

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

```

## API Integration

```javascript
// src/config/axios.jsx

import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_HOST,
})

// Add a request interceptor to add the token to the headers
axiosInstance.interceptors.request.use(
    (config) => {
        config.withCredentials = true
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default axiosInstance

```

## Error Handling

```javascript

//use try and catch in funciton  
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

```

## Docker Integration

```dockerfile
# Dockerfile
FROM node:16-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose Integration
```yaml
# dockerfile

FROM node:20-alpine
WORKDIR /app

# Copy package files for dependency installation
COPY package*.json ./

RUN npm install

# Copy the rest of the application code
COPY . .

EXPOSE 5173

# Allow frontend to be accessed from the host
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

```

## Best Practices
1. Use functional components with hooks
2. Implement proper error handling
3. Use environment variables for configuration
4. Implement  loading states

