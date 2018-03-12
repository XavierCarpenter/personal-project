import React, { Component } from "react";
import axios from "axios";

import Header from "../Header/Header";
import { connect } from "react-redux";
import BusPic from "../BusPic/BusPic";
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

class UserBus extends Component {
  constructor() {
    super();
    this.state = {
      businessInfo: [],
      busHours: [],
      editClick: false,
      selectedFile: null,
      profileUrl: ""
    };
    this.editActive = this.editActive.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
    
  }
  componentDidMount() {
    this.props.getUser();
    axios.get(`/api/business/${this.props.user.id}`).then(results => {
      this.setState({ businessInfo: results.data });
    });

    axios.get(`/api/hours/${this.props.user.id}`).then(results => {
      this.setState({ busHours: results.data });
    });
    //get business profile pic
    axios.get(`/api/buspic/${this.props.user.id}`).then(response => {
      console.log(response.data);
      this.setState({ profileUrl: response.data });
    });
  }


  //updating buisness profile info
  editActive() {
    this.setState({ editClick: true });
  }

  updateInfo() {
    let body = {
      name: this.props.busName,
      city: this.props.busCity,
      state: this.props.busState,
      profilepic: this.props.busPic
    };
    axios.put(`/api/user/${this.props.user.id}`, body).then(results => {
      console.log("updated user table");
    });

    let newinfo = {
      email: this.props.busEmail,
      jobtype: this.props.busType,
      phone: this.props.busPhone,
      address: this.props.busAddress,
      bio: this.props.busBio
    };
    axios
      .put(`/api/business/${this.props.user.id}`, newinfo)
      .then(results => {
        console.log("updated business table");
      });
    this.setState({ editClick: false });
    alert("Profile Updated");
  }
  render() {
    console.log(this.props.busType);
    console.log(this.props.busEmail);
    return <div className="main-container">
        <Header />
        {this.state.businessInfo.length > 0 && <div>
            <div className="about_strp">
              {this.state.profileUrl && <Image src={this.state.profileUrl[0].profilepic} alt="profile" className="profilepic" height={240} width={240} />}
              <h2>{this.state.businessInfo[0].jobtype}</h2>
              <button>Appointments</button>
            </div>
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
              <button onClick={this.editActive}>Edit Profile</button>
              {this.state.editClick === true ? <div>
                  <h2>Name:</h2>
                  <input type="text" placeholder={this.state.businessInfo[0].name} onChange={e => this.props.updateBusName(e.target.value)} />
                  <h2>City:</h2>
                  <input type="text" placeholder="City" onChange={e => this.props.updateBusCity(e.target.value)} />
                  <h2>State:</h2>
                  <input type="text" placeholder="State" onChange={e => this.props.updateBusState(e.target.value)} />
                  <h2>Bio:</h2>
                  <input type="text" placeholder={this.state.businessInfo[0].bio} onChange={e => this.props.updateBusBio(e.target.value)} />
                  <h2>Business Type:</h2>
                  <input type="text" placeholder={this.state.businessInfo[0].jobtype} onChange={e => this.props.updateBusType(e.target.value)} />
                  <h2>Phone:</h2>
                  <input type="text" placeholder={this.state.businessInfo[0].phone} onChange={e => this.props.updateBusPhone(e.target.value)} />
                  <h2>Address:</h2>
                  <input type="text" placeholder={this.state.businessInfo[0].address} onChange={e => this.props.updateBusAddress(e.target.value)} />
                  <h2>Email:</h2>
                  <input type="email" placeholder={this.state.businessInfo[0].email} onChange={e => this.props.updateBusEmail(e.target.value)} />
                  <button onClick={this.updateInfo}>Submit</button>
                  <BusPic />
                </div> : null}
            </div>
          </div>}
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
  })(UserBus)
);