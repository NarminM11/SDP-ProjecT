// App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LogIn from '../src/pages/login';
import PasswordReset from "../src/pages/PasswordReset";

function App() {
  return (
    <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LogIn />} />
                <Route path='/forgot-password' element={<PasswordReset />} />
            </Routes>
    </BrowserRouter>
  );
}

export default App;
