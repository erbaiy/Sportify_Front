// src/utils/validation.js

// Function to validate the registration form
export const validateRegister = ({ username, firstName, lastName, email, password }) => {
  const errors = {};

  // Validate username
  if (typeof username !== 'string' || username.trim().length < 3) {
    errors.username = "Username must be at least 3 characters long.";
  }

  // Validate firstName
  if (typeof firstName !== 'string' || firstName.trim().length < 3) {
    errors.firstName = "First name must be at least 3 characters long.";
  }

  // Validate lastName
  if (typeof lastName !== 'string' || lastName.trim().length < 3) {
    errors.lastName = "Last name must be at least 3 characters long.";
  }

  // Validate email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  // Validate password
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!password || !passwordPattern.test(password)) {
    errors.password =
      "Password must be at least 8 characters long, including an uppercase letter, a lowercase letter, a number, and a special character.";
  }

  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};


// Function to validate the login form
export const loginValidation = (email, password) => {
  const errors = {};

  // Validate email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  // Validate password
  if (!password || password.length < 6) {
    errors.password = "Password must be at least 6 characters long.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};





export  const  validateEmail=(email)=>{
  const errors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) {
    errors.email = "Please enter a valid email address.";
  } 
  return {
    isValid:Object.keys(errors).length === 0,
    errors,
  }


};







