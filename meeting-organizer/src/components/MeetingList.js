import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MeetingList = () => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await fetch('http://localhost:5000/meetings'); // Adjust URL as per your Flask API
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        // Sorting meetings by date
        setMeetings(data.sort((a, b) => new Date(a.date) - new Date(b.date)));
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchMeetings();
  }, []);

  return (
    <div>
      <h2>Meeting List</h2>
      {meetings.length > 0 ? (
        <ul>
          {meetings.map((meeting, index) => (
            <li key={index}>
              <div>
                <strong>Topic:</strong> {meeting.topic}<br />
                <strong>Date:</strong> {meeting.date}<br />
                <strong>Start Time:</strong> {meeting.startTime}<br />
                <strong>End Time:</strong> {meeting.endTime}<br />
                <strong>Participants:</strong> {meeting.participants}
              </div>
              <Link to={`/edit-meeting/${meeting.id}`}>Edit</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No meetings found.</p>
      )}
    </div>
  );
};

export default MeetingList;
