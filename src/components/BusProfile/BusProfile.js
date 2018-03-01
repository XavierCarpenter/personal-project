import React, { Component } from "react";
import axios from "axios";
import "./BusProfile.css";
import Header from "../Header/Header";
import { connect } from "react-redux";
import { getUser } from "../../ducks/reducer";
import { withRouter } from "react-router-dom";

class BusProfile extends Component {
    constructor() {
    super()
    this.state = {
      businessInfo: [],
    }
    this.addSub = this.addSub.bind(this);
  }
  componentDidMount() {
    this.props.getUser();
      axios.get(`/api/business/${this.props.match.params.id}`).then(results => {
          this.setState({businessInfo: results.data})
      })
    // In here you could go get the user data from this.props.match.params
    // Or you could handle the redirect from the router.
    // There's a few ways to handle this.
  }
  addSub() {
    // console.log("hits")
    let userid = this.props.user.id;
    let busid = this.state.businessInfo[0].id;

    axios.post("api/subscriptions", {userid, busid}).then(response => {
      // console.log(response.data);
      let newSub  = response.data;

    })
  }
  render() {
      // console.log(this.state.businessInfo[0]);
    return <div className="main-container">
        <Header />
        {this.state.businessInfo.length > 0 && <div>
            <div className="about_strp">
              <img src="#" className="profile" />
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
          </div>}
      </div>;
  }
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, { getUser })(BusProfile));
