import React, { useState } from 'react';
import './home.css';

const HomePage = () => {
  const [balance, setBalance] = useState(0);
  const [activeFeature, setActiveFeature] = useState('welcome'); // State to track active feature
  const [inputValue, setInputValue] = useState(''); // State for input in cards

  const handleTransaction = (type) => {
    const amount = parseFloat(inputValue);

    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid positive amount.");
      return;
    }

    switch (type) {
      case 'deposit':
        setBalance(balance + amount);
        alert(`Successfully deposited R${amount}.`);
        break;
      case 'withdraw':
        if (amount > balance) {
          alert("Insufficient balance.");
          return;
        }
        setBalance(balance - amount);
        alert(`Successfully withdrew R${amount}.`);
        break;
      case 'transfer':
        if (amount > balance) {
          alert("Insufficient balance.");
          return;
        }
        setBalance(balance - amount);
        alert(`Successfully transferred R${amount}.`);
        break;
      default:
        return;
    }

    // Automatically switch to the balance card after transaction
    setInputValue('');
    setActiveFeature('balance');
  };

  const renderFeatureCard = () => {
    switch (activeFeature) {
      case 'balance':
        return (
          <div className="balance-card">
            <p className="balance-title">Current Balance</p>
            <p className="balance-amount">R{balance}</p>
          </div>
        );
      case 'deposit':
      case 'withdraw':
      case 'transfer':
        return (
          <div className="transaction-card">
            <p className="transaction-title">{activeFeature.toUpperCase()}</p>
            <input
              type="number"
              className="transaction-input"
              placeholder={`Enter amount to ${activeFeature}`}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              className="transaction-button"
              onClick={() => handleTransaction(activeFeature)} // Fixed here
            >
              Confirm
            </button>
          </div>
        );
      default:
        return <h1 className="homepage-title">Welcome to TechHive Banking</h1>;
    }
  };

  return (
    <div className="homepage">
      <nav className="sidebar">
        <ul className="nav-list">
          <img src="/images/logoNEW.jpg" alt="Tech Investments" className="LOGO" />
          <button className="nav-button" onClick={() => setActiveFeature('balance')}>
            View Balance
          </button>
          <button className="nav-button" onClick={() => setActiveFeature('deposit')}>
            Deposit
          </button>
          <button className="nav-button" onClick={() => setActiveFeature('withdraw')}>
            Withdraw
          </button>
          <button className="nav-button" onClick={() => setActiveFeature('transfer')}>
            Transfer
          </button>
          {/* <a className="profile-button" href='/profile'>
            View Profile</a> */}
        </ul>
        <a href="/" className="logout_button">
          Logout
        </a>
      </nav>

      <main className="main-content">{renderFeatureCard()}</main>
    </div>
  );
};

export default HomePage;
