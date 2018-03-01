import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import "./Landing.css";

// import BackgroundSlideshow from "react-background-slideshow";
// import image1 from "../../images/landing1.jpeg";
// import image2 from "../../images/landing2.jpeg";
// import image3 from "../../images/landing3.jpeg";



class Landing extends Component {
  constructor() {
    super();
    this.state = {
      businesses: []
    };
  }

  render() {
 
    return <div>
        <div className="landing_intro">
          <h1>Wavvie</h1>
          <a href={process.env.REACT_APP_LOGIN}>
            <p>Login/Sign up</p>
          </a>
        </div>
        <div className="sec2_container">
          <h1>Find Top Businesses in your area</h1>
        </div>
        <div>
       
        </div>
      </div>;
  }
}


export default Landing;
