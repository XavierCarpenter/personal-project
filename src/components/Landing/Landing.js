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
  }

  render() {
    return <div className="body">
        <div className="landing-nav">
          <h1>Fre3Agent</h1>
          <a href={process.env.REACT_APP_LOGIN}>
            <p>Login</p>
          </a>
          <a href={process.env.REACT_APP_LOGIN}>
            <p>Sign up</p>
          </a>
        </div>
        <div className="container">
          <div className="slider">
            <div className="slide">
              <div className="overlay">
                <h2 id="subtitle">Quality Profesionals</h2>
                <p id="subtext">
                  Fre3Agent makes it's easy to find quality individuals
                  across many different professions
                </p>
              </div>
            </div>
            <div className="slide">
              <div className="overlay">
                <h2 id="subtitle">Instant Scheduling</h2>
                <p id="subtext">
                  No more waiting in line or missing appointments. Fre3Agent
                  makes it simple and fast to Schedule appointments.
                </p>
              </div>
            </div>
            <div className="slide">
              <div className="overlay">
                <h2 id="subtitle">Beautiful Portfolios</h2>
                <p id="subtext">
                  Here Models, Photographers, and much more post photos and
                  videos of their best work.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>;
  }
}

export default Landing;
