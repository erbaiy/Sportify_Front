import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { sendData } from '../../../hooks/sendData';
import axios from 'axios';
import { validateEmail } from '../../../utils/validation';

function Participants() {
    const [participants, setParticipants] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [participantsPerPage] = useState(5);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        participantEmail: '',
        participantName: '',
        event: '',
        _id: null
    });

    const query = new URLSearchParams(useLocation().search);
    const eventId = query.get('event');

    useEffect(() => {
        fetchParticipants();
    }, [eventId]);

    const fetchParticipants = async () => {
        if (eventId) {
            try {
                const response = await fetch(`http://localhost:3000/registrations?event=${eventId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch participants');
                }
                const data = await response.json();
                setParticipants(data);
            } catch (error) {
                console.error('Error fetching participants:', error);
                toast.error('Failed to load participants');
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/registrations/${id}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                setParticipants(prevParticipants => 
                    prevParticipants.filter(participant => participant._id !== id)
                );
                toast.success('Registration deleted successfully!');
            } else {
                toast.error('Failed to delete registration');
            }
        } catch (error) {
            toast.error('Error deleting registration: ' + error.message);
        }
    };

    const handleEdit = (participant) => {
        setFormData({
            participantEmail: participant.participantEmail,
            participantName: participant.participantName,
            event: participant.event._id,
            _id: participant._id
        });
        setErrors({}); // Clear any existing errors
        setIsModalOpen(true);
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.participantName.trim()) {
            newErrors.participantName = 'Name is required';
        }
        
        if (!formData.participantEmail.trim()) {
            newErrors.participantEmail = 'Email is required';
        } else if (!validateEmail(formData.participantEmail)) {
            newErrors.participantEmail = 'Invalid email format';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleUpdateParticipant = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        try {
            const response = await axios.put(`http://localhost:3000/registrations/${formData._id}`, {
                participantEmail: formData.participantEmail,
                participantName: formData.participantName,
            });

            if (response.status === 200) {
                toast.success('Participant updated successfully!');
                setIsModalOpen(false);
                fetchParticipants();
            } else {
                toast.error('Failed to update participant');
            }
        } catch (error) {
            toast.error('Error updating participant: ' + error.message);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error for the field being edited
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    // Pagination calculations
    const indexOfLastParticipant = currentPage * participantsPerPage;
    const indexOfFirstParticipant = indexOfLastParticipant - participantsPerPage;
    const currentParticipants = participants.slice(indexOfFirstParticipant, indexOfLastParticipant);
    const totalPages = Math.ceil(participants.length / participantsPerPage);

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
    
            <div className="overflow-x-auto max-h-[600px] shadow-lg border border-gray-200 rounded-lg">
                <table className="min-w-full bg-white table-fixed">
                    <thead className="sticky top-0 bg-white shadow-sm">
                        <tr>
                            <th className="w-48 py-3 px-4 border-b border-r">Event Name</th>
                            <th className="w-32 py-3 px-4 border-b border-r">Event Date</th>
                            <th className="w-64 py-3 px-4 border-b border-r">Event Location</th>
                            <th className="w-32 py-3 px-4 border-b border-r">Participant Name</th>
                            <th className="w-32 py-3 px-4 border-b border-r">Participant Email</th>
                            <th className="w-32 py-3 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentParticipants.map((participant) => (
                            <tr key={participant._id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b border-r truncate">{participant.event.title}</td>
                                <td className="py-2 px-4 border-b border-r">
                                    {new Date(participant.event.date).toLocaleDateString()}
                                </td>
                                <td className="py-2 px-4 border-b border-r truncate">{participant.event.location}</td>
                                <td className="py-2 px-4 border-b border-r">{participant.participantName}</td>
                                <td className="py-2 px-4 border-b border-r">{participant.participantEmail}</td>
                                <td className="py-2 px-4 border-b">
                                    <div className="flex gap-2 justify-center">
                                        <button 
                                            onClick={() => handleEdit(participant)}
                                            className="bg-green-600 hover:bg-green-500 text-white py-1 px-3 rounded shadow-md"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button 
                                            className="bg-red-600 hover:bg-red-500 text-white py-1 px-3 rounded shadow-md" 
                                            onClick={() => handleDelete(participant._id)}
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
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

            {/* Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl">
                        <h2 className="text-xl font-bold mb-4">Edit Participant</h2>
                        <form onSubmit={handleUpdateParticipant} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Participant Name</label>
                                    <input
                                        type="text"
                                        name="participantName"
                                        value={formData.participantName}
                                        onChange={handleInputChange}
                                        className={`w-full p-2 border rounded ${
                                            errors.participantName ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    />
                                    {errors.participantName && (
                                        <p className="text-red-500 text-sm mt-1">{errors.participantName}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Participant Email</label>
                                    <input
                                        type="email"
                                        name="participantEmail"
                                        value={formData.participantEmail}
                                        onChange={handleInputChange}
                                        className={`w-full p-2 border rounded ${
                                            errors.participantEmail ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    />
                                    {errors.participantEmail && (
                                        <p className="text-red-500 text-sm mt-1">{errors.participantEmail}</p>
                                    )}
                                </div>
                            </div>
                            
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                                >
                                    Update Participant
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Participants;