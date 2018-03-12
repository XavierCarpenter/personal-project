import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import ImageUploader from "../ImageUploader/ImageUploader";

import {
  updateBusName,
  updateBusCity,
  updateBusState,
  updateBusPhone,
  updateBusType,
  updateBusBio,
  updateBusAddress,
  updateBusEmail,
  updateBusProfile,
  updateGenProfile,
  updateCity,
  updateState,
  getUser,
  updateName
} from "../../ducks/reducer";

class SetupProfile extends Component {
  constructor() {
    super();
    this.state = {
      busClick: false
    };
    this.busActive = this.busActive.bind(this);

    this.updateInfo = this.updateInfo.bind(this);
    this.updateBusInfo = this.updateBusInfo.bind(this);
  }
  componentDidMount() {
    this.props.getUser();
  }
  //update profileType when user select yes
  busActive() {
    this.setState({ busClick: true });
  }

  updateInfo() {
    let body = {
      name: this.props.user.name,
      city: this.props.city,
      state: this.props.state,
      profileType: "general"
    };

    axios.put(`/api/newuser/${this.props.user.id}`, body).then(results => {
      this.props.user.push;
    });
    this.setState({ editClick: false });
    alert("Profile Created");
  }
  updateBusInfo() {
    console.log(this.props.user);
    //update users table
    let body = {
      name: this.props.busName,
      city: this.props.busCity,
      state: this.props.busState,
      profilepic: this.props.profilePic,
      profileType: "business"
    };

    axios.put(`/api/newuser/${this.props.user.id}`, body).then(results => {
      this.props.user.push;
    });
    //create new business in business table
    let info = {
      busid: this.props.user.id,
      bustype: this.props.busType,
      email: this.props.busEmail,
      phone: this.props.busPhone,
      bio: this.props.busBio,
      address: this.props.busAddress
    };
    axios.post(`/api/createbus/${this.props.user.id}`, info).then(results => {
      this.props.user.push;
    });

    this.setState({ editClick: false });
    alert("Profile Created");
  }
  render() {
    console.log(this.props.user);
    const {
      updateBusName,
      updateBusType,
      updateBusCity,
      updateBusState,
      updateBusBio,
      updateBusEmail,
      updateBusPhone,
      updateBusAddress
    } = this.props;

    return (
      <div className="parent-div">
        {this.state.busClick == true ? (
          <div className="vert-align">
            <p>Are you a business?</p> <br />
            <select
              onChange={e => {
                this.busActive(e.target.value);
              }}
            >
              <option type="text" value="No">
                No
              </option>
              <option type="text" value="Yes">
                Yes
              </option>
            </select>{" "}
            <br />
            <p>What your Business Name</p> <br />
            <input
              type="text"
              placeholder="Larry's Haircut's"
              onChange={e => updateBusName(e.target.value)}
            />
            <p>Business Type?</p> <br />
            <input
              type="text"
              placeholder="Web Developer"
              onChange={e => updateBusType(e.target.value)}
            />
            <p>What's your email?</p> <br />
            <input
              type="email"
              placeholder="youremail@email.com"
              onChange={e => updateBusEmail(e.target.value)}
            />
            <p>What's your phone number?</p> <br />
            <input
              type="text"
              placeholder="1112223333"
              onChange={e => updateBusPhone(e.target.value)}
            />
            <p>What's your address?</p> <br />
            <input
              type="text"
              placeholder="address"
              onChange={e => updateBusAddress(e.target.value)}
            />
            <p>What city are you located in?</p> <br />
            <input
              type="text"
              placeholder="City"
              onChange={e => updateBusCity(e.target.value)}
            />
            <p>What state are you located in?</p> <br />
            <input
              type="text"
              placeholder="State"
              onChange={e => updateBusState(e.target.value)}
            />
            <p>Your bio </p> <br />
            <input
              type="text"
              placeholder="about your business"
              onChange={e => updateBusBio(e.target.value)}
            />
            <ImageUploader />
            <Link to="/user/this.props.user.name">
              <button onClick={this.updateBusInfo} className="margin-btn">
                Save Info
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <p>Are you a business?</p>
            <select
              onChange={e => {
                this.busActive(e.target.value);
              }}
            >
              <option type="text" value="No">
                No
              </option>
              <option type="text" value="Yes">
                Yes
              </option>
            </select>{" "}
            <br />
            <p>What your Name</p> <br />
            <input
              type="text"
              placeholder="name"
              onChange={e => this.props.updateName(e.target.value)}
            />
            <p>What city are you located in?</p> <br />
            <input
              type="text"
              placeholder="City"
              onChange={e => this.props.updateCity(e.target.value)}
            />
            <p>What state are you located in?</p> <br />
            <input
              type="text"
              placeholder="State"
              onChange={e => this.props.updateState(e.target.value)}
            />
            <ImageUploader />
            <Link to="/user/this.props.user.name">
            <button onClick={this.updateInfo}>Save Info</button>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default withRouter(
  connect(mapStateToProps, {
    updateBusName,
    updateBusCity,
    updateBusState,
    updateBusPhone,
    updateBusProfile,
    updateBusType,
    updateBusBio,
    updateBusAddress,
    updateBusEmail,
    updateBusProfile,
    updateGenProfile,
    updateCity,
    updateState,
    getUser,
    updateName
  })(SetupProfile)
);
