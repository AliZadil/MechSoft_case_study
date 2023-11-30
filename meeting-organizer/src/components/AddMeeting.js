import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddMeeting = () => {
  const [meeting, setMeeting] = useState({
    topic: '',
    date: '',
    startTime: '',
    endTime: '',
    participants: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setMeeting({ ...meeting, [e.target.name]: e.target.value });
  };

  const isFutureDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(date) >= today;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFutureDate(meeting.date)) {
      setError('The meeting date must be in the future.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/meetings', {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(meeting),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      navigate('/'); 
    } catch (error) {
      console.error('Error during the POST request:', error);
      setError('Failed to add the meeting. Please try again.');
    }
  };

  return (
    <div>
      <h2>Add a New Meeting</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Toplantı Konusu:</label>
          <input
            type="text"
            name="topic"
            value={meeting.topic}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Tarih:</label>
          <input
            type="date"
            name="date"
            value={meeting.date}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Başlangıç Saati:</label>
          <input
            type="time"
            name="startTime"
            value={meeting.startTime}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Bitiş Saati:</label>
          <input
            type="time"
            name="endTime"
            value={meeting.endTime}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Katılımcılar:</label>
          <input
            type="text"
            name="participants"
            value={meeting.participants}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Add Meeting</button>
      </form>
    </div>
  );
};

export default AddMeeting;
