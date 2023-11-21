import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import '../App.css';
// import './style.css'; // Import your local style file

export const FAQ = () => {
  return (
    <div>
      <Navbar />
      <div className='container'>
        <h1 className='heading'>Frequently Asked Questions</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor ut labore et dolore magna aliqua.
        </p>
        <div className="frame">
          <p className="text-wrapper">Lorem ipsum dolor sit amet</p>
          <p className="div">Lorem ipsum dolor sit amet</p>
          <p className="p">Lorem ipsum dolor sit amet</p>
          <p className="text-wrapper-2">Lorem ipsum dolor sit amet</p>
          <p className="text-wrapper-3">Lorem ipsum dolor sit amet</p>
          <p className="text-wrapper-4">Lorem ipsum dolor sit amet</p>
          <p className="lorem-ipsum-dolor">
            Lorem ipsum dolor sit amet, consectetur elit, <br />sed do eiusmod tempor&nbsp;&nbsp;ut labore et dolore magna
            aliqua.
          </p>
          {/* Include the rest of your content */}
          <img className="question-mark" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Icon-round-Question_mark.jpg/1200px-Icon-round-Question_mark.jpg" alt="Question Mark" />
          <img className="img" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Icon-round-Question_mark.jpg/1200px-Icon-round-Question_mark.jpg" alt="Question Mark" />
          <img className="question-mark-2" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Icon-round-Question_mark.jpg/1200px-Icon-round-Question_mark.jpg" alt="Question Mark" />
          <img className="question-mark-3" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Icon-round-Question_mark.jpg/1200px-Icon-round-Question_mark.jpg" alt="Question Mark" />
          <img className="question-mark-4" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Icon-round-Question_mark.jpg/1200px-Icon-round-Question_mark.jpg" alt="Question Mark" />
          <img className="question-mark-5" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Icon-round-Question_mark.jpg/1200px-Icon-round-Question_mark.jpg" alt="Image" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQ;
