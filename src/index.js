import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import FAQ from './pages/faq';
import Profile from './pages/profile';
import LogIn from './pages/login';
import App from './App';
// // import FAQ from './pages/faq';
// import Profile from './pages/profile';
// <<<<<<< HEAD
// import LogIn from './pages/login'
// import reportWebVitals from './reportWebVitals';
// =======
// import LogIn from './pages/login';
import SignUp from './pages/signUp';

import reportWebVitals from './reportWebVitals';
import DictionaryAlphabet from './pages/dictionaryAlphabet';
// import DictionaryAlphabet from './pages/dictionaryAlphabet';
// import word from './components/unique-word/word';
// import UniquePage from './pages/uniquePage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
{/* <App /> */}
    {/* <FAQ /> */}
    {/* <SignUp /> */}
    {/* <LogIn /> */}
    <Profile />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
