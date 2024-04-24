import React, { useEffect, useState } from 'react';
import './Dashboard.css'; // Import the CSS file
import { Link } from 'react-router-dom';
import EventCardItem from './EventCardItem'; // Import the EventCardList component
import axios from 'axios';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const clubName = "GDSC"; // Replace with your club name

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/club_events/organizer=${clubName}`
        );
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [clubName]);

  // const [club, setClub] = useState('');
  // const [clubEvents, setClubEvents] = useState([]);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   // Retrieve club name from local storage
  //   const storedClub = localStorage.getItem('club');
  //   if (storedClub) {
  //     setClub(storedClub);

  //     // Fetch events for the club
  //     axios
  //       .get(`http://localhost:5000/clubs?name=${storedClub}`)
  //       .then((response) => {
  //         //  Assuming the response.data contains club details including clubId
  //         const clubId = response.data[0].id;
  //       })
  //       .catch((clubErr) => setError(clubErr.message));
  //   }
  // }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-left">
        <img src="images/insaan1.jpg" alt="avatar" />
        <div className="club-name">{clubName && <p>Hello {clubName} !</p>}</div>
      </div>
      <Link to="/Organize">
        <button className="organize-btn">Organise an Event!</button>
      </Link>
      <div className="buttonn">
      <Link to="/Email_Extract">
        <button className="organize-btn">Send Invites</button>
      </Link>
      <Link to="/Email_Extract">
        <button className="organize-btn">Upload Attendance</button>
      </Link>
      </div>
      <div className="card">
        <EventCardItem events={events} />
      </div>
    </div>
  );
};

export default Dashboard;
