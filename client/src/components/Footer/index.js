import React from 'react';


// Footer component
function Footer() {
  return (
    <footer className="footer">
      <div>
        <a href='http://facebook.com/' target='_blank'>
          <img 
            src={require("../../assets/logos/facebook.jpg")}
            alt="Facebook"
            className="logos"
          ></img>
        </a>
      </div>
      
      <div>
        <a href='https://www.linkedin.com/' target='_blank'>
          <img 
            src={require("../../assets/logos/linkedin.png")}
            alt="linkedin"
            className="logos"
          ></img>
        </a>
      </div>
      <div>
        <a href='https://www.twitter.com/' target='_blank'>
          <img 
            src={require("../../assets/logos/twitter.png")}
            alt="twitter"
            className="logos"
          ></img>
        </a>
      </div>
    </footer>
  );
  
}

export default Footer;