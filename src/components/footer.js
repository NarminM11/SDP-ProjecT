function footer(props){
    return(
<div className="footer">
  <img className="facebook" alt="Facebook" src="facebook.png" />
  <img className="wikipedia" alt="Wikipedia" src="wikipedia.png" />
  <img className="social" alt="Social" src="social.png" />
  <img className="instagram" alt="Instagram" src="instagram.png" />
  <p className="copyright">
    © All rights reserved
    <br />
    2023 - Azərbaycan jest dili lüğəti
  </p>
  {/* <div className="collab">Collaborations</div> */}
  <div className="profile">Profile</div>
  <div className="copy">Copyright</div>
  <div className="faq">F.A.Q</div>
  <div className="blog">Blog</div>
  <div className="news">News</div>
  <div className="dictionary">Dictionary</div>
  <div className="aboutus">About us</div>
  <div className="home">Home</div>
  <p className="lorem-ipsum-dolor">
    Lorem ipsum dolor sit amet,
    <br />
    consectetur adipiscing.
  </p>
</div>
    )
}

export default footer;

