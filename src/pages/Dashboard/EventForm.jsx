import React, { useState } from 'react';
import { sendData } from '../../hooks/sendData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EventForm() {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    date: '',
    registrationDeadline: '',
    maxParticipants: '',
    status: 'upcoming',
    description: '',
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  const validateForm = (data) => {
    const errors = {};
    
    if (!data.title.trim()) {
      errors.title = 'Title is required';
    } else if (data.title.length < 3) {
      errors.title = 'Title must be at least 3 characters';
    }
  
    if (!data.location.trim()) {
      errors.location = 'Location is required';
    }
  
    if (!data.date) {
      errors.date = 'Event date is required';
    } else {
      const eventDate = new Date(data.date);
      const today = new Date();
      if (eventDate < today) {
        errors.date = 'Event date cannot be in the past';
      }
    }
  
    if (!data.registrationDeadline) {
      errors.registrationDeadline = 'Registration deadline is required';
    } else {
      const deadlineDate = new Date(data.registrationDeadline);
      const eventDate = new Date(data.date);
      if (deadlineDate > eventDate) {
        errors.registrationDeadline = 'Registration deadline must be before event date';
      }
    }
  
    if (!data.maxParticipants) {
      errors.maxParticipants = 'Maximum participants is required';
    } else {
      const maxParticipantsValue = data.maxParticipants;
      if (!/^\d+$/.test(maxParticipantsValue)) {
        errors.maxParticipants = 'Maximum participants must be a number';
      } else {
        const participants = parseInt(maxParticipantsValue, 10);
        if (participants < 1) {
          errors.maxParticipants = 'Maximum participants must be at least 1';
        } else if (participants > 1000) {
          errors.maxParticipants = 'Maximum participants cannot exceed 1000';
        }
      }
    }
  
    if (!data.description.trim()) {
      errors.description = 'Description is required';
    } else if (data.description.length < 20) {
      errors.description = 'Description must be at least 20 characters';
    }
  
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, image: 'Image size must be less than 5MB' }));
        return;
      }
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setErrors((prev) => ({ ...prev, image: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const submitData = {
      ...formData,
      maxParticipants: parseInt(formData.maxParticipants, 10),
    };

    try {
      const response = await sendData('http://localhost:3000/events', submitData);
      console.log('Data sent successfully:', response);
      toast.success('Event created successfully!');

      // Reset form after successful submission
      setFormData({
        title: '',
        location: '',
        date: '',
        registrationDeadline: '',
        maxParticipants: '',
        status: 'upcoming',
        description: '',
        image: null,
      });
      setImagePreview(null);
      setErrors({});

    } catch (error) {
      console.error('Error sending data:', error);
      toast.error('Error sending data, please try again.');
    }
  };

  const renderInputField = (name, label, type = "text", options = {}) => (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-lg font-medium text-gray-700">
        {label}
      </label>
      {type === "select" ? (
        <select
          id={name}
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          className={`w-full p-3 border rounded-md ${errors[name] ? 'border-red-500' : 'border-gray-300'}`}
          required
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          className={`w-full p-3 border rounded-md ${errors[name] ? 'border-red-500' : 'border-gray-300'}`}
          required
          {...options}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={formData[name]}
          onChange={handleInputChange}
          className={`w-full p-3 border rounded-md ${errors[name] ? 'border-red-500' : 'border-gray-300'}`}
          required
          {...options}
        />
      )}
      {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="p-6 max-w-lg mx-auto">
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
      <form onSubmit={handleSubmit} className="space-y-6">
        {renderInputField("title", "Event Title")}
        {renderInputField("location", "Location")}
        {renderInputField("date", "Event Date", "date")}
        {renderInputField("registrationDeadline", "Registration Deadline", "date")}
        {renderInputField("maxParticipants", "Max Participants", "text", {
          placeholder: "Enter maximum participants",
          pattern: "^[0-9]*$",
          inputMode: "numeric"
        })}
        {renderInputField("status", "Event Status", "select", [
          { value: "upcoming", label: "Upcoming" },
          { value: "ongoing", label: "Ongoing" },
          { value: "completed", label: "Completed" }
        ])}
        {renderInputField("description", "Event Description", "textarea", {
          placeholder: "Enter event description"
        })}

        <div className="space-y-2">
          <label htmlFor="image" className="block text-lg font-medium text-gray-700">Event Image</label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={`w-full p-3 border rounded-md ${errors.image ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Event Preview"
                className="w-full h-40 object-cover rounded-md"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="reset"
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
            onClick={() => {
              setFormData({
                title: '',
                location: '',
                date: '',
                registrationDeadline: '',
                maxParticipants: '',
                status: 'upcoming',
                description: '',
                image: null,
              });
              setErrors({});
              setImagePreview(null);
            }}
          >
            Reset
          </button>
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
}

export default EventForm;