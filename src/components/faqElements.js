import '../App.css';

function faqElements(props) {
    return(
    <div class = "box">
    <img class = "question-mark" src="https://upload.wikimedia.org/wikipedia/commons/5/5a/Black_question_mark.png" />
    <div className='box-texts'>
    <h1 class = "question">{props.question}</h1>
    <p class = "answer">{props.answer}</p>
    </div>
  </div>
)}
export default faqElements;