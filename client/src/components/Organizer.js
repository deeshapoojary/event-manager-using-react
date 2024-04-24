import React, { useState } from 'react';
import './Organizer.css';
import axios from 'axios';

function Organizer() {
  const [formData, setFormData] = useState({
    organizer: '',
    eventName: '',
    eventDescription: '',
    eventVenue: '',
    eventDate: '',
    eventTime: '',
    seatsAvailable: '',
    bookingLink: '',
   // Added selectedClub state
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleClubChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      organizer: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.organizer) {
      alert('Please select a club');
      return;
    }
    try {
      await axios.post('http://localhost:5000/add', formData);
      alert('Data created successfully');
      setFormData({
        organizer: '',
        eventName: '',
        eventDescription: '',
        eventVenue: '',
        eventDate: '',
        eventTime: '',
        seatsAvailable: '',
        bookingLink: ''
      });
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div className="form-container">
      <div className="form-container-inside">
        <h1>Organize An Event!</h1>
        <form onSubmit={handleSubmit}>
        <label htmlFor="organizer">Select Club:</label>
          <select
            id="organizer"
            name="organizer"
            value={formData.organizer}
            onChange={handleClubChange}
            required
          >
            <option value="">Select a Club</option>
            <option value="GDSC">GDSC</option>
            <option value="IEEE">IEEE</option>
            <option value="ANTRANG">ANTRANG</option>
            <option value="OJUS">OJUS</option>
            <option value="APSIT">APSIT</option>
          </select>
          <br/><br/>
          <label htmlFor="eventName">Event Name:</label>
          <input
            type="text"
            id="eventName"
            name="eventName"
            value={formData.eventName}
            placeholder="Enter Event Name"
            onChange={handleChange}
            required
          /><br/><br/>
          
          <label htmlFor="eventDescription">Event Description:</label><br/>
          <textarea
            id="eventDescription"
            name="eventDescription"
            value={formData.eventDescription}
            placeholder="What is your event about.."
            onChange={handleChange}
            rows="4"
            required
          /><br/><br/>
          
          <label htmlFor="eventVenue">Event Venue:</label>
          <input
            type="text"
            id="eventVenue"
            name="eventVenue"
            value={formData.eventVenue}
            placeholder="Enter the Venue"
            onChange={handleChange}
            required
          /><br/><br/>
          
          <label htmlFor="eventDate">Event Date:</label>
          <input
            type="date"
            id="eventDate"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            required
          /><br/><br/>

          <label htmlFor="eventTime">Event Time:</label>
          <input
            type="time"
            id="eventTime"
            name="eventTime"
            value={formData.eventTime}
            onChange={handleChange}
            required
          /><br/><br/>
          
          <label htmlFor="seatsAvailable">Seats Required:</label>
          <input
            type="number"
            id="seatsAvailable"
            name="seatsAvailable"
            value={formData.seatsAvailable}
            onChange={handleChange}
            required
          /><br/><br/>
          
          <label htmlFor="bookingLink">Booking Link:</label>
          <input
            type="url"
            id="bookingLink"
            name="bookingLink"
            value={formData.bookingLink}
            onChange={handleChange}
            placeholder="https://bookyourseat.com"
          /><br/><br/>

          
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Organizer;
