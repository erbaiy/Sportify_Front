import React, { useState } from 'react';
import { sendData } from '../../../hooks/sendData';
import { ToastContainer, toast } from 'react-toastify';


export default function EventRegistrationForm() {


    const eventID=window.location.pathname.split("/")[2];
  const [formData, setFormData] = useState({
    event: eventID,
    participantName: '',
    participantEmail: '',
  });

  const [errors, setErrors] = useState({});



  const isValidEmail = (email) => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    // ParticipantName validation (IsNotEmpty and IsString)
    if (!formData.participantName.trim()) {
      newErrors.participantName = 'Name is required';
    }
    else if(formData.participantName.length<3){
      newErrors.participantName = 'Name must be atleast 3 characters';
    } 

    // ParticipantEmail validation (IsNotEmpty and IsEmail)
    if (!formData.participantEmail) {
      newErrors.participantEmail = 'Email is required';
    } else if (!isValidEmail(formData.participantEmail)) {
      newErrors.participantEmail = 'Invalid email format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Example API call - replace with your actual API endpoint
       const response=await sendData('http://localhost:3000/registrations',formData);

        if (response) {
          toast.success('Registration successful');    
          setFormData({
            event: '',
            participantName: '',
            participantEmail: '',
            status: 'pending'
          });
        } else {
          const data = await response.json();
          toast.error(data.message);        }
      } catch (error) {
        toast.error(`Error submitting form: ${error?.response?.data?.message || 'Unknown error'}`);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">

<ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Event Registration</h2>
        
        
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="participantName">
            Participant Name
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.participantName ? 'border-red-500' : ''}`}
            id="participantName"
            type="text"
            name="participantName"
            value={formData.participantName}
            onChange={handleChange}
          />
          {errors.participantName && <p className="text-red-500 text-xs italic">{errors.participantName}</p>}
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="participantEmail">
            Participant Email
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.participantEmail ? 'border-red-500' : ''}`}
            id="participantEmail"
            type="email"
            name="participantEmail"
            value={formData.participantEmail}
            onChange={handleChange}
          />
          {errors.participantEmail && <p className="text-red-500 text-xs italic">{errors.participantEmail}</p>}
        </div>
        
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}