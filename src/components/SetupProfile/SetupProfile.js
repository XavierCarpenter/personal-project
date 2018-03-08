import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
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
      busClick: true,
      genClick: false
    };
    this.busActive = this.busActive.bind(this);
    this.genActive = this.genActive.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
    this.updateBusInfo = this.updateBusInfo.bind(this);
    
  }
   componentDidMount() {
    this.props.getUser();

   }

  busActive() {
    console.log("hit")
    this.setState({ busClick: !this.state.busClick });
  }

  genActive() {
    this.setState({ genClick: true });
  }

  updateInfo() {
    let body = {
      name: this.props.user.name,
      city: this.props.city,
      state: this.props.state
    };

    axios.put(`/api/newuser/`, body).then(results => {
      this.props.user.push;
    });
    this.setState({ editClick: false });
    alert("Profile Created");
  }
  updateBusInfo() {
    let body = {
      name: this.props.busName,
      busType: this.props.BusType,
      phone: this.props.busPhone,
      city: this.props.BusCity,
      state: this.props.BusState,
      bio: this.props.BusBio,
      email: this.props.BusEmail,
    };

    axios.post(`/api/profile/${this.props.user.id}`, body).then(results => {
      this.props.user.push;
    });
    this.setState({ editClick: false });
    alert("Profile Created");
  }
  render() {
    console.log(this.props.user)
    const {
      updateBusName,
      updateBusType,
      updateBusCity,
      updateBusState,
      updateBusBio,
      updateBusEmail
    } = this.props;

    return <div className="parent-div">
        {this.state.busClick == true ? <div className="vert-align">
            <p>What type of profile do you need?</p> <br />
            <select onChange={e => {this.busActive(e.target.value); this.props.updateBusProfile()}}>
              <option type="text" value="Business" onClick={this.busActive}>
                Business
              </option>
              <option type="text" value="Profile" onClick={this.busActive}>
                General
              </option>
            </select> <br />
            <p>What your Business Name</p> <br />
            <input type="text" placeholder="Larry's Haircut's" onChange={e => updateBusName(e.target.value)} />
            <p>Business Type?</p> <br />
            <input type="text" placeholder="Web Developer" onChange={e => updateBusType(e.target.value)} />
            <p>What's your email?</p> <br />
            <input type="email" placeholder="youremail@email.com" onChange={e => updateBusEmail(e.target.value)} />
            <p>What's your phone number?</p> <br />
            <input type="text" placeholder="1112223333" onChange={e => updateBusPhone(e.target.value)} />
            <p>What's your address?</p> <br />
            <input type="text" placeholder="address" onChange={e => updateBusAddress(e.target.value)} />
            <p>What city are you located in?</p> <br />
            <input type="text" placeholder="City" onChange={e => updateBusCity(e.target.value)} />
            <p>What state are you located in?</p> <br />
            <input type="text" placeholder="State" onChange={e => updateBusState(e.target.value)} />
            <p>Your bio </p> <br />
            <input type="text" placeholder="about your business" onChange={e => updateBusBio(e.target.value)} />
            <Link to="/businesses">
              <button onClick={this.updateBusInfo} className="margin-btn">Save Info</button>
            </Link>
          </div> : <div>
            {this.props.updateGenProfile()}
            <p>What your Name</p> <br />
            <input type="text" placeholder="name" onChange={e => this.props.updateName(e.target.value)} />
            <p>What city are you located in?</p> <br />
            <input type="text" placeholder="City" onChange={e => this.props.updateCity(e.target.value)} />
            <p>What state are you located in?</p> <br />
            <input type="text" placeholder="State" onChange={e => this.props.updateState(e.target.value)} />
            <button onClick={this.updateInfo}>Save Info</button>
          </div>}
      </div>;
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
);;
