import React from "react";
import "./App.css";

function App() {
  const handleGetStarted = () => {
    alert("Welcome to tech Bank!");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to tech Bank</h1>
      </header>
      <main>
        <section className="welcome-section">
          <h2>Your Trusted Partner in Finance</h2>
          <button onClick={handleGetStarted}>Get Started</button>
        </section>
        <section className="services-section">
          <h2>Our Services</h2>
          <ul>
            <li>Account Management</li>
            <li>Loan Services</li>
            <li>Credit Cards</li>
            <li>Investment Options</li>
          </ul>
        </section>
      </main>
      <footer>
        <p>&copy; 2025 tech Bank. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
