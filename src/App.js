import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from './Component/Registration';
import Login from './Component/Login';
import Profile from './Component/Profile';
import UpdateProfile from './Component/UpdateProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Registration />} />

        <Route path="/login" element={<Login />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/updateProfile" element={<UpdateProfile />} />

      </Routes>
    </Router>
  );
}

export default App;
