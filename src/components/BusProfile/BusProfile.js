import React, { Component } from "react";
import axios from "axios";
import "./BusProfile.css";
import Header from "../Header/Header";
import { connect } from "react-redux";
import {
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
} from "../../ducks/reducer";
import { withRouter } from "react-router-dom";


class BusProfile extends Component {
  constructor() {
    super();
    this.state = { 
      businessInfo: [], 
      editClick: false, 
      selectedFile: null, 
      profileUrl: "" 
    };
    this.addSub = this.addSub.bind(this);
    this.editActive = this.editActive.bind(this);
  }
  componentDidMount() {
    this.props.getUser();
    axios.get(`/api/business/${this.props.match.params.id}`).then(results => {
      this.setState({ businessInfo: results.data });
    });
    // In here you could go get the user data from this.props.match.params
    // Or you could handle the redirect from the router.
    // There's a few ways to handle this.
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

  //updating buisness profile info
  editActive() {
    this.setState({ editClick: true });
  }

  updateInfo() {
    let body = {
      name: this.props.user.busName,
      email: this.props.busEmail,
      jobtype: this.props.busType,
      phone: this.props.busEmail,
      address: this.props.busAddress,
      city: this.props.busCity,
      state: this.props.busState,
      bio: this.props.busBio,
      profilepic: this.props.profilePic,
    };

    axios
      .put(`/api/profile/${this.props.user.id}`, body)
      .then(results => {
        this.props.user.push;
      });
    this.setState({ editClick: false });
    alert("Profile Updated");
  }
  render() {
    // console.log(this.state.businessInfo[0]);
    return (
      <div className="main-container">
        <Header />
        {this.state.businessInfo.length > 0 && (
          <div>
            <div className="about_strp">
              <img
                src={this.state.businessInfo[0].profilepic}
                alt="profile"
                className="profilepic"
              />
              <h2>{this.state.businessInfo[0].jobtype}</h2>
              <button>Schedule Appointment</button>
              <button onClick={() => this.addSub()}>Subscribe</button>
            </div>
            <div className="about">
              <h1>{this.state.businessInfo[0].name}</h1>
              <p>{this.state.businessInfo[0].bio}</p>
              <h3>Phone: {this.state.businessInfo[0].phone}</h3>
              <h3>Location: {this.state.businessInfo[0].address}</h3>
            </div>
            <div>
              <button onClick={this.editActive}>Edit Profile</button>
              {this.state.editClick === true ? (
                <div>
                  <input
                    type="text"
                    placeholder={this.props.user.name}
                    onChange={e => this.props.user.name(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="City"
                    onChange={e => this.props.updateCity(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="State"
                    onChange={e => this.props.updateState(e.target.value)}
                  />
                  <button onClick={this.updateInfo}>Submit</button>
                </div>
              ) : null}
            </div>
          </div>
        )}
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
