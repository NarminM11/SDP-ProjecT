// FaqElements.js
import React, { useState } from "react";

const FaqElements = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`faqElement ${expanded ? "expanded" : ""}`}>
      <div className="question" onClick={() => setExpanded(!expanded)}>
        {question} <span className={`plus ${expanded ? "minus" : ""}`}></span>
      </div>
      {expanded && <div className="answer">{answer}</div>}
    </div>
  );
};

export default FaqElements;


// const FaqElements = ({ question, answer }) => {
  // const [expanded, setExpanded] = useState(false);
//   return (
//     <div className="box">
//       <img
//         className="question-mark"
//         src="https://upload.wikimedia.org/wikipedia/commons/5/5a/Black_question_mark.png"
//       />
//       <div className="box-texts">
//         <h1 className="question">{props.question}</h1>
//         <div className="answer">{props.answer}</div>
//         <div className="answer-container">
//           <div className="hover-box">{props.hoverText}</div>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default faqElements;