// src/utils/validation.js

// Function to validate the registration form
export const validateRegister = ({ username, firstName, lastName, email, password, roles }) => {
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

//  function to validate the login2FA  
export const login2FAValidation = (email, otp) => {
  const errors = {};

  // Validate email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  // Validate OTP
  if (!otp || otp.length < 6) {
    errors.otp = "OTP  must be at  6 characters .";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};


// Function to validate the verify OTP form
export const verifyOtpValidation = (email, otp) => {
  const errors = {};

  // Validate email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  // Validate OTP
  if (!otp || otp.length== 6) {
    errors.otp = "OTP must be  6 characters .";
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

export const newPasswordValidation = (password, newPassword) => {
  const errors = {};

  // Validate password length
  if (!password || password.length < 6) {
    errors.password = "Password must be at least 6 characters long.";
  }

  // Validate new password length
  if (!newPassword || newPassword.length < 6) {
    errors.newPassword = "New password must be at least 6 characters long.";
  }

  // Check if new password matches the original password
  if (newPassword !== password) {
    errors.newPasswordMatch = "New password does not match the original password.";
  }

  // Determine overall validity
  const isValid = Object.keys(errors).length === 0;

  return { isValid, errors };
};
