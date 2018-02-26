import React, { Component } from "react";
import axios from "axios";

class BusProfile extends Component {
    constructor() {
    super()
    this.state = {
      businessInfo: [],
    }
  }
  componentDidMount() {
      axios.get(`/api/business/${this.props.match.params.id}`).then(results => {
          this.setState({businessInfo: results.data})
      })
    // In here you could go get the user data from this.props.match.params
    // Or you could handle the redirect from the router.
    // There's a few ways to handle this.
  }
  render() {
      console.log(this.state.businessInfo[0]);
    return <div className="main-container">
    {this.state.businessInfo.length > 0 && <div><h1>{this.state.businessInfo[0].name}</h1>
    <h2>{this.state.businessInfo[0].jobtype}</h2>
    <p>{this.state.businessInfo[0].bio}</p>
    <h3>Phone: {this.state.businessInfo[0].phone}</h3>
    <h3>Location: {this.state.businessInfo[0].address}</h3></div>}
    </div>
  }
}

export default BusProfile;
