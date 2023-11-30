import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditMeeting = () => {
  const [meeting, setMeeting] = useState({
    topic: '',
    date: '',
    startTime: '',
    endTime: '',
    participants: ''
  });
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeetingData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/meetings/${id}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setMeeting(data);
      } catch (error) {
        console.error('Fetch error:', error);
        setError('Failed to fetch meeting data. Please try again.');
      }
    };

    fetchMeetingData();
  }, [id]);

  const handleInputChange = (e) => {
    setMeeting({ ...meeting, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://127.0.0.1:5000/meetings/${id}`, {
        method: 'PUT',
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
      console.error('Error during the PUT request:', error);
      setError('Failed to update the meeting. Please try again.');
    }
  };

  return (
    <div>
      <h2>Edit Meeting</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Topic:</label>
          <input
            type="text"
            name="topic"
            value={meeting.topic}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={meeting.date}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Start Time:</label>
          <input
            type="time"
            name="startTime"
            value={meeting.startTime}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>End Time:</label>
          <input
            type="time"
            name="endTime"
            value={meeting.endTime}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Participants:</label>
          <input
            type="text"
            name="participants"
            value={meeting.participants}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Update Meeting</button>
      </form>
    </div>
  );
};

export default EditMeeting;
