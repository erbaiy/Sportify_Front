
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import foto from '../../components/ui/static.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Events() {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    date: '',
    registrationDeadline: '',
    maxParticipants: '',
    status: 'upcoming',
    description: ''
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:3000/events');
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleDelete = (id) => async () => {
    try {
      const response = await fetch(`http://localhost:3000/events/${id}`, { 
        method: 'DELETE' 
      });
      
      if (response.ok) {
        setEvents((prevEvents) => prevEvents.filter((event) => event._id !== id));
        toast.success('Event deleted successfully!');
      } else {
        toast.error('Failed to delete event');
      }
    } catch (error) {
      toast.error('Error deleting event: ' + error.message);
    }
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      location: event.location,
      date: new Date(event.date).toISOString().split('T')[0],
      registrationDeadline: new Date(event.registrationDeadline).toISOString().split('T')[0],
      maxParticipants: event.maxParticipants,
      status: event.status,
      description: event.description
    });


    setIsModalOpen(true);
  };


  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/events/${selectedEvent._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        await fetchEvents();
        setIsModalOpen(false);
        toast.success('Event updated successfully!');
      } else {
        toast.error('Failed to update event');
      }
    } catch (error) {
      toast.error('Error updating event: ' + error.message);
    }
  };
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(events.length / eventsPerPage);

return (
    <div className="p-4">
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
        <Link to="/create-event">
            <button className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 mb-4 rounded shadow-md">
                Create New Event
            </button>
        </Link>

        <div className="overflow-x-auto max-h-[600px] shadow-lg border border-gray-200 rounded-lg">
            <table className="min-w-full bg-white table-fixed">
                <thead className="sticky top-0 bg-white shadow-sm">
                    <tr>
                        <th className="w-48 py-3 px-4 border-b border-r">Image</th>
                        <th className="w-48 py-3 px-4 border-b border-r">Event Title</th>
                        <th className="w-64 py-3 px-4 border-b border-r">Description</th>
                        <th className="w-32 py-3 px-4 border-b border-r">Date</th>
                        <th className="w-48 py-3 px-4 border-b border-r">Location</th>
                        <th className="w-32 py-3 px-4 border-b border-r">Max Participants</th>
                        <th className="w-48 py-3 px-4 border-b border-r">Registration Deadline</th>
                        <th className="w-32 py-3 px-4 border-b border-r">Status</th>
                        <th className="w-32 py-3 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentEvents.map((event) => (
                        <tr key={event._id} className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b border-r">
                                <img 
                                    src={event.image ? `http://localhost:3000${event.image}` : foto} 
                                    className="w-40 h-40 object-cover rounded-full" 
                                    alt={event.title} 
                                />
                            </td>
                            <td className="py-2 px-4 border-b border-r truncate">{event.title}</td>
                            <td className="py-2 px-4 border-b border-r truncate">{event.description}</td>
                            <td className="py-2 px-4 border-b border-r">
                                {new Date(event.date).toLocaleDateString()}
                            </td>
                            <td className="py-2 px-4 border-b border-r truncate">{event.location}</td>
                            <td className="py-2 px-4 border-b border-r text-center">
                                {event.maxParticipants ?? 'N/A'}
                            </td>
                            <td className="py-2 px-4 border-b border-r">
                                {new Date(event.registrationDeadline).toLocaleDateString()}
                            </td>
                            <td className="py-2 px-4 border-b border-r">{event.status}</td>
                            <td className="py-2 px-4 border-b text-center">
                                <button 
                                    onClick={() => handleEdit(event)}
                                    className="bg-green-600 hover:bg-green-500 text-white py-1 px-3 mr-2 rounded shadow-md"
                                >
                                    Edit
                                </button>
                                <button 
                                    className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded shadow-md" 
                                    onClick={handleDelete(event._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div className="flex justify-center mt-4 gap-2">
            <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
                Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
                <button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`px-4 py-2 rounded ${
                        currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                >
                    {index + 1}
                </button>
            ))}
            <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
                Next
            </button>
        </div>

        {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl">
                    <h2 className="text-xl font-bold mb-4">Edit Event</h2>
                    <form onSubmit={handleUpdateEvent} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Location</label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Date</label>
                                <input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Registration Deadline</label>
                                <input
                                    type="date"
                                    value={formData.registrationDeadline}
                                    onChange={(e) => setFormData({...formData, registrationDeadline: e.target.value})}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Max Participants</label>
                                <input
                                    type="number"
                                    value={formData.maxParticipants}
                                    onChange={(e) => setFormData({...formData, maxParticipants: e.target.value})}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Status</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                                    className="w-full p-2 border rounded"
                                >
                                    <option value="upcoming">Upcoming</option>
                                    <option value="ongoing">Ongoing</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                className="w-full p-2 border rounded"
                                rows="4"
                            />
                        </div>
                        <div className="flex justify-end gap-2"
                        style={{ display: "flex"}}    
                        >
                            <div className="flex">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setSelectedEvent(null);
                                    }}
                                    className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 ml-2"
                                >
                                    Update Event
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )}
    </div>
);
}

export default Events;









