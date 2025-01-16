import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import React Router components
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import Profile from './pages/Profile'


function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        
      </Routes>
    </div>
  </Router>
  );
}

export default App;
