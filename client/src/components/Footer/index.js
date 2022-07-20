import React from "react";

// Footer component
function Footer() {
  return (
    <>
      <div id="spacing"></div>
      <footer className="footer">
        <div>
          <a href="http://facebook.com/" target="_blank" rel="noreferrer">
            <img
              src={require("../../assets/logos/facebook.jpg")}
              alt="Facebook"
              className="logos"
            ></img>
          </a>
        </div>
        <div>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
            <img
              src={require("../../assets/logos/linkedin.png")}
              alt="linkedin"
              className="logos"
            ></img>
          </a>
        </div>
        <div>
          <a href="https://www.twitter.com/" target="_blank" rel="noreferrer">
            <img
              src={require("../../assets/logos/twitter.png")}
              alt="twitter"
              className="logos"
            ></img>
          </a>
        </div>        
      </footer>
      <div className="copyright">
          &copy; 2022, Chasing Dreams, Inc.
      </div>
    </>
  );
}

export default Footer;
