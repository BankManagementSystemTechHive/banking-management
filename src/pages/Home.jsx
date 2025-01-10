import React from 'react';
import './home.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <nav className="sidebar">
        <h2 className="sidebar-title">My Bank</h2>
        <ul className="nav-list">
          <li className="nav-item">View Balance</li>
          <li className="nav-item">Withdraw</li>
          <li className="nav-item">Deposit</li>
          <li className="nav-item">Transfer</li>
        </ul>
      </nav>
      <main className="main-content">
        <h1 className="homepage-title">Welcome to My Bank</h1>
      </