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
import { withRouter } from "react-router-dom";
import ImageUploader from "../ImageUploader/ImageUploader";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      subscriptions: "",
      editClick: false,
      selectedFile: null,
      profileUrl: "",
      appointments: ""
    };
    this.editActive = this.editActive.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
    this.deleteSub = this.deleteSub.bind(this);
  }
  componentDidMount() {
    this.props.getBusinesses();
    this.props.getUser();
    // In here you could go get the user data from this.props.match.params
    // Or you could handle the redirect from the router.
    // There's a few ways to handle this.
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
  }
  editActive() {
    this.setState({ editClick: true });
  }
  deleteSub(i) {
    let busid = i;

    // console.log(busid);
    axios
      .delete(`/api/deletesub/${this.props.user.id}`, busid)
      .then(response => alert("unsubscribed"));
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
    let tableData =
      this.state.appointments &&
      this.state.appointments.map((obj, i) => {
        return (
          <tr key={i}>
            <td>
              {obj.name}({obj.jobtype})
            </td>
            <td>{obj.date}</td>
            <td>{obj.time}</td>
          </tr>
        );
      });
      let subNum = this.state.subscriptions.length;
      let apptNum = this.state.appointments.length;
    console.log(this.state.appointments);
    return <div className="profile_body">
        {this.props.user.profiletype === "general" ? <div>
            <Header />
            <div>
              <h1>{this.props.user.name}</h1>
              <p>{this.props.user.city},  {this.props.user.state}</p>
              {this.state.profileUrl && this.state.profileUrl.map(
                  (pic, i) => {
                    return (
                      <div key={i}>
                        <Image
                          src={pic.profilepic}
                          alt="profile"
                          className="profilepic"
                          height={240}
                          width={240}
                        />
                      </div>
                    );
                  }
                )}
              <hr />

              <div className="clicks">
                <h2>Appointments {apptNum}</h2>
                <div>
                  <table>
                    <caption>Your Appointments</caption>
                    <tr>
                      <th>Free Agent</th>
                      <th>Date</th>
                      <th>Time</th>
                    </tr>
                    {tableData}
                  </table>
                </div>;
                <h2 onClick={this.subActive}>Subscriptions {subNum}</h2>
                {this.state.subscriptions && this.state.subscriptions.map(
                    (obj, i) => {
                      return (
                        <div
                          key={i}
                          style={{ height: "auto", width: "auto" }}
                        >
                          <img
                            src={obj.profilepic}
                            alt="buspic"
                            className="profilepic"
                            heigth={50}
                            width={50}
                          />
                          <p>
                            {obj.name} {obj.jobtype}
                            <span
                              className="DeleteSub"
                              onClick={() => this.deleteSub(obj.bus_id)}
                            >
                              X
                            </span>
                          </p>
                        </div>
                      );
                    }
                  )}
                <h2>Order History</h2>
              </div>
              <div className="editProfile">
                <button onClick={this.editActive}>Edit Profile</button>
                {this.state.editClick === true ? <div>
                    <input type="text" placeholder={this.props.user.name} onChange={e => this.props.user.name(e.target.value)} />
                    <input type="text" placeholder="City" onChange={e => this.props.updateCity(e.target.value)} />
                    <input type="text" placeholder="State" onChange={e => this.props.updateState(e.target.value)} />
                    <button onClick={this.updateInfo}>Submit</button>
                    <ImageUploader />
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
