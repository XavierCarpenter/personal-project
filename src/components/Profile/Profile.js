import React, { Component } from "react";
import axios from 'axios';
import Header from "../Header/Header";
import { connect } from "react-redux";
import { getUser, getBusinesses, updateCity } from "../../ducks/reducer";
import { withRouter } from "react-router-dom";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      subscriptions: "",
      nameClick: false,
      locationClick: false
    };
    this.nameActive = this.nameActive.bind(this);
    this.locationActive = this.locationActive.bind(this);
    // this.updateInfo = this.updateInfo.bind(this);
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
  }
  nameActive() {
    this.setState({ nameClick: true });
  }

  locationActive() {
    this.setState({ locationClick: true });
  }

  // updateInfo() {
  //   // let user = this.props.user.id;

  //   axios.put(`/api/user/${this.props.user.id}`, body).then(results => {
  //     this.props.state.push;
  //   });
  // }


  render() {
    console.log(this.state.subscriptions);
    return (
      <div>
        <Header />
        <h1>Profile</h1>
        <h2>Subscriptions:</h2>
        {this.state.subscriptions &&
          this.state.subscriptions.map((obj, i) => {
            return (
              <div key={i}>
                <h2>
                  {obj.name} {obj.jobtype}
                </h2>
              </div>
            );
          })}
        <div>
          <button onClick={this.nameActive}>Edit Name</button>
          {this.state.nameClick === true ? (
            <input type="text" placeholder={this.props.user.name} />
          ) : null}
          <button onClick={this.locationActive}>Edit Location</button>
          {this.state.locationClick === true ? (
            <input
              type="text"
              placeholder="City"
              onChange={e => this.props.city(e.target.value)}
            />
          ) : null}
          {this.state.locationClick === true ? (
            <input
              type="text"
              placeholder="State"
              onChange={e => this.props.state(e.target.value)}
            />
            // <button onclick={this.updateInfo}>Submit</button>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, { getUser, getBusinesses })(Profile));
