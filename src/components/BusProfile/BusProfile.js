import React, { Component } from "react";
import axios from "axios";
import "./BusProfile.css";
import Header from "../Header/Header";
import { connect } from "react-redux";
import BusPic from "../BusPic/BusPic";
import Calendar from "../Calendar/Calendar";

import Image from "react-image-resizer";

import {
  getUser,
  updateBusPic,
  updateBusName,
  updateBusCity,
  updateBusState,
  updateBusPhone,
  updateBusProfile,
  updateBusType,
  updateBusBio,
  updateBusAddress,
  updateBusEmail
} from "../../ducks/reducer";
import { withRouter } from "react-router-dom";

class BusProfile extends Component {
  constructor() {
    super();
    this.state = {
      businessInfo: [],
      busHours: [],
      selectedFile: null,
      profileUrl: "",
      appClick: false
    };
    this.addSub = this.addSub.bind(this);
    this.appActive = this.appActive.bind(this);
  }
  componentDidMount() {
    this.props.getUser();
    axios.get(`/api/business/${this.props.match.params.id}`).then(results => {
      console.log(results.data);
      this.setState({ businessInfo: results.data });
    });
    // In here you could go get the user data from this.props.match.params
    // Or you could handle the redirect from the router.
    // There's a few ways to handle this.
    axios.get(`/api/hours/${this.props.match.params.id}`).then(results => {
      this.setState({ busHours: results.data });
    });
    //get business profile pic
    axios.get(`/api/buspic/${this.props.match.params.id}`).then(response => {
      this.setState({ profileUrl: response.data });
    });
  }

  //user visiting buisness profile
  addSub() {
    // console.log("hits")
    let userid = this.props.user.id;
    let busid = this.state.businessInfo[0].id;

    axios.post("api/subscriptions", { userid, busid }).then(response => {
      // console.log(response.data);
      let newSub = response.data;
    });
  }
  appActive() {
    this.setState({ appClick: !this.state.appClick });
  }

  render() {
    console.log(this.state.businessInfo);
    let menuData = this.state.businessInfo && this.state.businessInfo.map(
        (obj, i) => {
          console.log(obj);
          return (
            <tr key={i}>
              <td>
                {obj.service}
              </td>
              <td>${obj.price}</td>
             
            </tr>
          );
        }
      );

    return (
      <div>
        <Header />
        <div className="busProfile-container">
          {this.state.businessInfo.length > 0 && (
            <div>
              <div className="about_strp">
                <Image
                  src={this.state.businessInfo[0].profilepic}
                  alt="profile"
                  className="profilepic"
                  height={240}
                  width={240}
                />
                <h2>{this.state.businessInfo[0].jobtype}</h2>
                <div className="buttons">
                <button className="appBtn" onClick={this.appActive}>
                  Schedule Appointment
                </button>
                <button className="subBtn" onClick={() => this.addSub()}>
                  Subscribe
                </button>
                </div>
              </div>
              {/* <div className="topLine"></div> */}
              <hr />
              <div className="main">
                <div className="busInfo">
                  <h1 id="name">{this.state.businessInfo[0].name}</h1>
                  <hr />
                  <p class="info" id="bio">
                    {this.state.businessInfo[0].bio}
                  </p>
                  {this.state.busHours.length > 0 && (
                    <div>
                      <h1 className="bold-text">Hours Of Operation</h1>
                      <hr />
                      <ul>
                        <li>
                          <span id="dow">Sun:</span>{" "}
                          {this.state.busHours[0].sun}
                        </li>
                        <li>
                          <span id="dow">Mon:</span>{" "}
                          {this.state.busHours[0].mon}
                        </li>
                        <li>
                          <span id="dow">Tue:</span>{" "}
                          {this.state.busHours[0].tue}
                        </li>
                        <li>
                          <span id="dow">Wed:</span>{" "}
                          {this.state.busHours[0].wed}
                        </li>
                        <li>
                          <span id="dow">Thur:</span>{" "}
                          {this.state.busHours[0].thurs}
                        </li>
                        <li>
                          <span id="dow">Fri:</span>{" "}
                          {this.state.busHours[0].fri}
                        </li>
                        <li>
                          <span id="dow">Sat:</span>{" "}
                          {this.state.busHours[0].sat}
                        </li>
                      </ul>
                    </div>
                  )}
                  <h3 className="bold-text">
                    Phone: {this.state.businessInfo[0].phone}
                  </h3>
                  <h3>{this.state.businessInfo[0].address}</h3>
                  <p>
                    {this.state.businessInfo[0].city},{" "}
                    {this.state.businessInfo[0].state}
                  </p>
                </div>
                <div className="menu">
                  <table>
                    <caption>Prices</caption>
               
                    <tr>
                      <th>Service</th>
                      <th>Price</th>
                     
                    </tr>
                  
                      {menuData}
                   
                  </table>
                </div>
              <div className="Calender">
                {this.state.appClick && <Calendar appActive={this.appActive} />}
              </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default withRouter(
  connect(mapStateToProps, {
    getUser,
    updateBusName,
    updateBusCity,
    updateBusState,
    updateBusPhone,
    updateBusProfile,
    updateBusType,
    updateBusBio,
    updateBusAddress,
    updateBusEmail
  })(BusProfile)
);
