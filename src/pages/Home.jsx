import React, { useState } from 'react';
import './home.css';

const HomePage = () => {
  const [balance, setBalance] = useState(0);
  const [showBalance, setShowBalance] = useState(false);

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

  const handleTransfer = () => {
    const input = prompt("Enter the amount to transfer:");
    if (input !== null && input.trim() !== "") {
      const amount = parseInt(input, 10);
      if (!isNaN(amount)) {
        if (amount > 0 && amount <= balance) {
          setBalance(balance - amount);
          alert(`Successfully transferred R${amount}. New balance: R${balance - amount}`);
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

  const handleViewBalance = () => {
    setShowBalance(true);
  };

  const handleLogout = () => {
    setBalance(0);
    setShowBalance(false);

    alert("You have been logged out.");
    window.location.reload();
  };

  return (
    <div className="homepage">
      <nav className="sidebar">
        
        <ul className="nav-list">
        <img src="\images\logoNEW.jpg" alt="Tech Investments" className="LOGO" />
          <button className="nav-button" onClick={handleViewBalance}>
            View Balance
          </button>
          <button className="nav-button deposit" onClick={handleDeposit}>
            Deposit
          </button>
          <button className="nav-button withdraw" onClick={handleWithdraw}>
            Withdraw
          </button>
          <button className="nav-button transfer" onClick={handleTransfer}>
            Transfer
          </button>
        </ul>
        <a href="/" class="logout_button">Logout</a>
      </nav>
      <main className="main-content">
        <h1 className="homepage-title">
          
        
        </h1>
        {showBalance && <p className="balance-display">Current Balance: R{balance}</p> }
      </main>
    </div>
  );
};

export default HomePage;
