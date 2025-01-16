import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const BankingProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    // accountNumber: '',
  });

  useEffect(() => {
        axios.get('http://localhost:5000/profile') // Changed port to 8080
            .then(response => {
              console.log(response)
                setProfile({
                    name: response.data.fullname,
                    email: response.data.email
                });
            })
            .catch(error => {
                console.error('Error fetching profile:', error);
                // Display a user-friendly message
                alert('Error loading profile. Please try again later.');
            });
    }, []);
  return (
    <div className="profile-container">
      <div className="banking-profile">
        <h2>Banking Profile</h2>
        <form>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              readOnly
              placeholder='Name Surname'
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              readOnly
              placeholder='Email@gmail.com'
            />
          </div>
          <div>
            {/* <label>Account Number:</label>
            <input
              type="text"
              name="accountNumber"
              value={profile.accountNumber}
              readOnly
            /> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BankingProfile;
