import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Welcome to My Bank</h1>
      <div className="actions-container">
        <button className="action-button view-balance">View Balance</button>
        <button className="action-button withdraw">Withdraw</button>
        <button className="action-button deposit">Deposit</button>
        <button className="action-button transfer">Transfer</button>
      </div>
    </div>
  );
};

export default HomePage;