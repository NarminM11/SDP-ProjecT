// import "./App.css";
function cardMember(props) {
    return(
  <div class="member-card">
    <p class="brief-info">{props.info}</p>
    <div class="text-wrapper">{props.text}</div>
    <div class="div">{props.fullName}</div>
    <img class="profile-user" src={props.imgSrc} />
  </div>
)}
export default cardMember;
