import React from 'react';
import './home.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <nav className="sidebar">
        <h2 className="sidebar-title">My Bank</h2>
        <ul className="nav-list">
          <button className="nav-button">View Balance</button>
          <button className="nav-button">Withdraw</button>
          <button className="nav-button">Deposit</button>
          <button className="nav-button">Transfer</button>
        </ul>
      </nav>
      <main className="main-content">
        <h1 className="homepage-title">Welcome to My Bank</h1>
      </main>
    </div>
  );
};

export default HomePage;