import React, { Component } from "react";
import axios from 'axios';

class Profile extends Component {
  componentDidMount() {
    // In here you could go get the user data from this.props.match.params
    // Or you could handle the redirect from the router.
    // There's a few ways to handle this.
  }
  render() {
    return <div> 
      <h1>Profile</h1>
      <h2>Subscriptions:</h2>
      <ul>

      </ul>

    </div>
  }
}

export default Profile;
