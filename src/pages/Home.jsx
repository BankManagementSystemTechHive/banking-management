import React, { useState } from 'react';
import React, { useState } from 'react';
import './home.css';

const HomePage = () => {
  const [balance, setBalance] = useState(0);
  const [showBalance, setShowBalance] = useState(false); // State to toggle balance visibility

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
    setShowBalance(true); // Show the balance when the button is clicked
  };

  return (
    <div className="homepage">
      <nav className="sidebar">
        <a href="/" className="sidebar-logo">
          <img
