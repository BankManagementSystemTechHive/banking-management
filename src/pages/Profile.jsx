// src/components/BankingProfile.js

import React, { useState } from 'react';

const BankingProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    accountNumber: '',
    balance: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the profile data to your backend
    console.log('Profile submitted:', profile);
  };

  return (
    <div className="banking-profile">
      <h2>Banking Profile</h2>   
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Account Number:</label>
          <input
            type="text"
            name="accountNumber"
            value={profile.accountNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Balance:</label>
          <input
            type="number"
            name="balance"
            value={profile.balance}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default BankingProfile;