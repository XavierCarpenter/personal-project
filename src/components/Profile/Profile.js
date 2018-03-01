import React, { Component } from "react";
import axios from 'axios';
import Header from "../Header/Header";
import { connect } from "react-redux";
import { getUser, getBusinesses } from "../../ducks/reducer";
import { withRouter } from "react-router-dom";

class Profile extends Component {
  constructor(){
    super()
    this.state = {
      subscriptions: ""
    }
  }
  componentDidMount() {
    this.props.getBusinesses();
    // In here you could go get the user data from this.props.match.params
    // Or you could handle the redirect from the router.
    // There's a few ways to handle this.
    axios.get(`/api/subscriptions/${this.props.user.id}`).then (response => {
      this.setState({subscriptions: response.data})
    }).catch(console.log);
  }
  render() {
   
    console.log(this.state.subscriptions);
    return <div>
      <Header />
        <h1>Profile</h1>
        <h2>Subscriptions:</h2>
        {this.state.subscriptions &&this.state.subscriptions.map((obj, i) => {
          return <div key={i}>
              <h2>
                {obj.name} {obj.jobtype}
              </h2>
            </div>;
        })}
      </div>;
  }
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, { getUser, getBusinesses })(Profile));
