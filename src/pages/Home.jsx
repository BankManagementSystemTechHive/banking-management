import React, { useState } from 'react';
import './home.css';

const HomePage = () => {
  const [balance, setBalance] = useState(0);

  const handleDeposit = () => {
    const input = prompt("Enter the amount to deposit:");
    if (input !== null && input.trim() !== "") {
      const amount = parseInt(input, 10);
      if (!isNaN(amount) && amount > 0) {
        setBalance(balance + amount);
        alert(`Successfully deposited R${amount}. New balance: R${balance + amount}`);
      } else {
        alert("Please enter a valid positive amount.");
      }
    }
  };

  const handleWithdraw = () => {
    const input = prompt("Enter the amount to withdraw:");
    if (input !== null && input.trim() !== "") {
      const amount = parseInt(input, 10);
      if (!isNaN(amount)) {
        if (amount > 0 && amount <= balance) {
          setBalance(balance - amount);
          alert(`Successfully withdrew R${amount}. New balance: R${balance - amount}`);
        } else if (amount > balance) {
          alert("Insufficient balance.");
        } else {
          alert("Please enter a positive amount.");
        }
      } else {
        alert("Invalid input. Please enter a numeric value.");
      }
    }
  };

  return (
    <div className="homepage">
      <nav className="sidebar">
        <a href="/" className="sidebar-logo">
          <img src="public/logoPicture.jpeg" alt="My Bank Logo" className="logo" />
        </a>
        <ul className="nav-list">
          <button className="nav-button">View Balance</button>
          <button className="nav-button withdraw" onClick={handleWithdraw}>
            Withdraw
          </button>
          <button className="nav-button deposit" onClick={handleDeposit}>
            Deposit
          </button>
          <button className="nav-button">Transfer</button>
        </ul>
      </nav>
      <main className="main-content">
        <h1 className="homepage-title"></h1>
        <p className="balance-display">Current Balance: R{balance}</p>
      </main>
    </div>
  );
};

export default HomePage;
