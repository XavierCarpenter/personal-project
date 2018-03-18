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
      appClick: false,
    };
    this.addSub = this.addSub.bind(this);
    this.appActive = this.appActive.bind(this);
    


    
  }
  componentDidMount() {
    this.props.getUser();
    axios.get(`/api/business/${this.props.match.params.id}`).then(results => {
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
     this.setState({appClick: !this.state.appClick});
  }


 
  
  render() {

    return <div>
        <Header />
        <div className="busProfile-container">
          <h1>{this.props.match.params.name}</h1>
          <p>
            {this.props.match.params.city}, {this.props.match.params.state}
          </p>
          {this.state.businessInfo.length > 0 && <div>
              <div className="about_strp">
                {this.state.profileUrl && <Image src={this.state.profileUrl[0].profilepic} alt="profile" className="profilepic" height={240} width={240} />}
                <h2>{this.state.businessInfo[0].jobtype}</h2>
                <button onClick={this.appActive}>
                  Schedule Appointment
                </button>
                <button onClick={() => this.addSub()}>Subscribe</button>
              </div>
              <hr />
              <div className="about">
                <h1>{this.state.businessInfo[0].name}</h1>
                <p>{this.state.businessInfo[0].bio}</p>
                <h3>Phone: {this.state.businessInfo[0].phone}</h3>
                <h3>Location: {this.state.businessInfo[0].address}</h3>
              </div>
              <div>
                {this.state.busHours.length > 0 && <div>
                    <h1>Hours Of Operation</h1>
                    <ul>
                      <li>Sun: {this.state.busHours[0].sun}</li>
                      <li>Mon: {this.state.busHours[0].mon}</li>
                      <li>Tue: {this.state.busHours[0].tue}</li>
                      <li>Wed: {this.state.busHours[0].wed}</li>
                      <li>Thur: {this.state.busHours[0].thurs}</li>
                      <li>Fri: {this.state.busHours[0].fri}</li>
                      <li>Sat: {this.state.busHours[0].sat}</li>
                    </ul>
                  </div>}
                {this.state.appClick && <Calendar appActive={this.appActive} />}
              </div>
            </div>}
        </div>
      </div>;
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
