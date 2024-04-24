// AdminPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <h2>Hello Admin</h2>
      </div>
      <div className="admin-content">
        <div className="admin-button">
        <Link to="/Events_Display">
        <button className="admin_btn">See Events</button>
        </Link>
        </div>
        <div className="adminbuttonn">
        <Link to="/Register">
        <button className="admin_btn">Club Registration</button>
        </Link>
        </div>  
        </div>
      </div>
  );
};

export default Admin;
