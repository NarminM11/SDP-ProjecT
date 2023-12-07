import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "../App.css";
import FaqElements from "../components/faqElements";

export const FAQ = () => {
  return (
    <>
    <Navbar />
    <div className="head">
      <h1>Frequently Asked Questions</h1>
    </div>
    <div className="faqPage">

      <div className="elementsContainer">
        <div className="questions">
          <FaqElements question="Question1" answer="answer" />
          <FaqElements question="Question1" answer="answer" />
          <FaqElements question="Question1" answer="answer" />
        </div>
        <div className="questions">
          <FaqElements question="Question1" answer="answer" />
          <FaqElements question="Question1" answer="answer" />
          <FaqElements question="Question1" answer="answer" />
        </div>
      </div>
      
      <Footer />
    </div>
    </>
  );
};

export default FAQ;
