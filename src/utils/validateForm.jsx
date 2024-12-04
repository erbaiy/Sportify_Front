export const validateForm = (data) => {
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