import React, { Component } from "react";
import "./Profile.css";
import axios from "axios";
import Header from "../Header/Header";
import UserBus from "../UserBus/UserBus";
import { connect } from "react-redux";
import Image from "react-image-resizer";
import {
  getUser,
  getBusinesses,
  updateCity,
  updateState,
  updateProfilePic,
  updateBusPofile,
  updateGenPofile
} from "../../ducks/reducer";
import { Link, withRouter } from "react-router-dom";
import ImageUploader from "../ImageUploader/ImageUploader";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      subscriptions: "",
      editClick: false,
      selectedFile: null,
      profileUrl: "",
      appointments: "",
      subClick: false,
      appClick: true
    };
    this.editActive = this.editActive.bind(this);
    this.subActive = this.subActive.bind(this);
    this.appActive = this.appActive.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
    this.deleteSub = this.deleteSub.bind(this);
    this.cancelAppt = this.cancelAppt.bind(this);
  }
  componentDidMount() {
    this.props.getBusinesses();
    this.props.getUser().then(() => {;
   
    axios
      .get(`/api/subscriptions/${this.props.user.id}`)
      .then(response => {
        this.setState({ subscriptions: response.data });
      })
      .catch(console.log);

    axios.get(`/api/profilepic/${this.props.user.id}`).then(response => {
      this.setState({ profileUrl: response.data });
    });
    axios.get(`/api/appointments/${this.props.user.id}`).then(response => {
      console.log(response.data);
      this.setState({ appointments: response.data });
    });
  })
  }

  editActive() {
    this.setState({ editClick: true });
  }
  subActive() {
    this.setState({ subClick: true, appClick: false });
  }
  appActive() {
    this.setState({ appClick: true, subClick: false });
  }
  deleteSub(i) {
    let busid = i;

    // console.log(busid);
    axios
      .delete(`/api/deletesub/${this.props.user.id}/${i}`)
      .then(response => alert("unsubscribed"));
  }
  cancelAppt(i) {
    console.log(i);

    console.log("USED ID", this.props.user.id);
    axios
      .delete(`/api/deleteappt/${this.props.user.id}/${i}`)
      .then(response => alert("Appointment Canceled"));
  }

  updateInfo() {
    let body = {
      name: this.props.user.name,
      city: this.props.city,
      state: this.props.state,
      profilepic: this.props.profilePic
    };

    axios.put(`/api/user/${this.props.user.id}`, body).then(results => {
      this.props.user.push;
    });
    this.setState({ editClick: false });
    alert("Profile Updated");
  }

  render() {
    console.log(this.state);
    let tableData =
      this.state.appointments &&
      this.state.appointments.map((obj, i) => {
        console.log(obj);
        return (
          <tr key={i}>
            <td>
              {obj.name}({obj.jobtype})
            </td>
            <td>{obj.date}</td>
            <td>{obj.time}</td>
            <td
              onClick={() => this.cancelAppt(obj.bus_id)}
              className="cancelAppt"
            >
              Cancel
            </td>
          </tr>
        );
      });

    let subData =
      this.state.subscriptions &&
      this.state.subscriptions.map((obj, i) => {
        return (
          <div key={i} className="busBox">
            <img
              src={obj.profilepic}
              alt="buspic"
              className="profilepic"
              heigth={200}
              width={200}
            />
            <h3>{obj.name}</h3>
            <h3>{obj.jobtype}</h3>
            <Link to={`/business/${obj.bus_id}`} key={i}>
              <p id="portfolioLink">View Portfolio</p>
            </Link>
            <p className="deleteSub" onClick={() => this.deleteSub(obj.bus_id)}>
              Unsubscribed
            </p>
          </div>
        );
      });
    const style = {
      image: {
        // position: "absolute",
        display: "flex",
        margin: "25% 20px 0 25%",
        top: "10%"
      }
    }; // padding: "0 0 -10px 0",
    let subNum = this.state.subscriptions.length;
    let apptNum = this.state.appointments.length;

    return <div className="profile_body">
        {this.props.user.profiletype === "general" ? <div>
            <Header />
            <div className="about_container">
              {this.state.profileUrl && this.state.profileUrl.map(
                  (pic, i) => {
                    return (
                      <div className="userProfilepic" key={i}>
                        <Image className="userProfilepic"
                          src={pic.profilepic}
                          alt="profile"
                          style={style.image}
                          height={240}
                          width={240}
                          top={"60%"}
                        />
                      </div>
                    );
                  }
                )}
              <div className="about_you">
                <h1>{this.props.user.name}</h1>
                <p>
                  {this.props.user.city}, {this.props.user.state}
                </p>
              </div>
            </div>
            <hr />

              <div className="main-Profile">
            <div className="main_content">
                <h2 className="clicks" onClick={this.appActive}>
                  Appointments {apptNum}
                </h2>
                {this.state.appClick === true ? <div className="table_container">
                    <table className="appTable">
                      <caption>Your Appointments</caption>

                      <tr>
                        <th>Free Agent</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Cancel</th>
                      </tr>
                      {tableData}
                    </table>
                  </div> : null}
                <h2 className="clicks" onClick={this.subActive}>
                  Subscriptions {subNum}
                </h2>
                {this.state.subClick === true ? <div className="sub_container">
                    <h1>Your Subscriptions</h1>
                    {subData}{" "}
                  </div> : null}
                <h2 className="clicks">Order History</h2>
                <div className="editProfile">
                  <button className="editBtn" onClick={this.editActive}>
                    Edit Profile
                  </button>
                </div>
                {this.state.editClick === true ? <div className="myInputs">
                    <input className="editInput" type="text" placeholder={this.props.user.name} onChange={e => this.props.user.name(e.target.value)} />
                    <input className="editInput" type="text" placeholder="City" onChange={e => this.props.updateCity(e.target.value)} />
                    <input className="editInput" type="text" placeholder="State" onChange={e => this.props.updateState(e.target.value)} />
                    <div className="imgUploader">
                      <ImageUploader />
                    </div>
                    <button className="submitBtn" onClick={this.updateInfo}>
                      Submit
                    </button>
                  </div> : null}
              </div>
            </div>
          </div> : <UserBus />}
      </div>;
  }
}

const mapStateToProps = state => state;

export default withRouter(
  connect(mapStateToProps, {
    getUser,
    getBusinesses,
    updateCity,
    updateState,
    updateProfilePic
  })(Profile)
);
