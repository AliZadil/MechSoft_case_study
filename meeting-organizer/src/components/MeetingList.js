import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MeetingList = () => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    fetchMeetings();
  }, []);
    const fetchMeetings = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/meetings');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setMeetings(data.sort((a, b) => new Date(a.date) - new Date(b.date)));
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

  const deleteMeeting = async (MeetingId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/meetings/${MeetingId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Network response was not ok');
      fetchMeetings();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };


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
              {" | "}
              <button onClick={() => deleteMeeting(meeting.id)}>Delete</button>
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
