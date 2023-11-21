// import logo from './logo.svg';
import "./App.css";
// import Home from'./components/home'
// import navbar from '../src/components/navbar';
// import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import CardMember from "./components/member-card";
function App() {
  return (
    <div>
      <nav className="navbar">
        <div className="logo" />
        <div className="home">Home</div>
        <div className="aboutus">About us</div>
        <div className="dictionary">Dictionary</div>
        <div className="news">News</div>
        <div className="contactus">Contact us</div>
        <div className="az-en-ru">AZ</div>
        <div className="signup">Sign up</div>
        <div className="login">Log in</div>
      </nav>

      {/* Welcome Section */}
      <section className="welcome-section">
        {/* <img className="welcome-board-slider" alt="Welcome board slider" src="welcome-board-slider-gallery.png" /> */}
        <div className="welcome-board-slider">
          <div className="watch-full-video">
            <div className="video">Watch Video</div>
          </div>
          <p className="welcome-mesage-text">Lorem</p>
          <div className="div">Welcome Message</div>
        </div>
      </section>

      {/*Search-boxs*/}
      <section className="Search-Box">
      <div className="search-box">
<img className="transparency" alt="Transparency" src="transparency.png" />
<div className="text-wrapper">Search in the dictionary...</div>
</div>
      </section>
      {/*About-Us*/}
      <section>
        <div className="about-us">
        <p className='about'>About Us</p>
        <img className="gallery1" alt="Gallery" src="https://www.ada.edu.az/frq-content/plugins/school_members_x1/entry/20210707113544_91871000.jpeg" />
        <img className="gallery2" alt="Gallery" src="https://media.licdn.com/dms/image/D4E03AQGEWTtc7szViQ/profile-displayphoto-shrink_800_800/0/1682504135792?e=2147483647&v=beta&t=4oH5VR3591dQVuHmWbv8hY2-R26eOeWb9doCxo19chk" />
        <img className="gallery3" alt="Gallery" src="https://media.licdn.com/dms/image/D4E03AQF_VXbJLHzC6Q/profile-displayphoto-shrink_800_800/0/1697469213341?e=2147483647&v=beta&t=HoBEValn76ZoX9UONveP81V5RRTVC_7SINduz5yxULU" />
</div>
      </section>
      {/*Meet our team*/}
      <section className="MeetourTeam">
        <div>
          <div className="meet">
             <h1>Meet our Team</h1>
        <p className="about-team">lorem</p></div>
        <div className="card-container">
        <CardMember info="nermin" text="men"
         imgSrc="https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/2020-Chevrolet-Corvette-Stingray/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&width=960" 
         fullName="Murshudova"
         />
        <CardMember info="nermin" />
        <CardMember info="nermin" />
        </div>
        </div>

      </section>
      {/* SubscribeForBlog  */}
      <section className="SubscribeForBlog">
        <div className="subscribe-for-blog">
          <div className="frame">
            <div className="email">Enter your email address...</div>
          </div>
          <div className="div-wrapper">
            <div className="subscribe">Subscribe!</div>
          </div>
          <div className="text-wrapper-2">Join Now!</div>
          <p className="what-s-inside-get-on">
            What’s inside?
            <br />
            Get on the List!
          </p>
          <p className="p">
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC.
          </p>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
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
      </footer>
    </div>
  );
}

export default App;
