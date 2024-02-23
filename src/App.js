import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LogIn from '../src/pages/login';
import PasswordReset from "../src/pages/PasswordReset";
import Profile from './pages/profile';
import SignUp from '../src/pages/signUp';
import FAQ from "../src/pages/faq"
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="faq" element={<FAQ />} />
        <Route path='/forgot-password' element={<PasswordReset />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;