import React, { Component } from "react";
import axios from "axios";
import Header from "../Header/Header";
import { connect } from "react-redux";
import { getUser, getBusinesses, updateCity, updateState } from "../../ducks/reducer";
import { withRouter } from "react-router-dom";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      subscriptions: "",
      editClick: false,
   
    };
    this.editActive = this.editActive.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
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
  editActive() {
    this.setState({ editClick: true });
  }

  

  updateInfo() {
    let body = {
      name: this.props.user.name,
      city: this.props.city,
      state: this.props.state
    }
  

    axios.put(`/api/user/${this.props.user.id}`, body).then(results => {
      this.props.user.push;
    });
    this.setState({editClick: false});
    alert("Profile Updated");
  }

  render() {
    console.log(this.state.subscriptions);
    return <div>
        <Header />
        <h1>Profile</h1>
        <h2>Subscriptions:</h2>
        {this.state.subscriptions && this.state.subscriptions.map(
            (obj, i) => {
              return (
                <div key={i}>
                  <h2>
                    {obj.name} {obj.jobtype}
                  </h2>
                </div>
              );
            }
          )}
        <div>
          <button onClick={this.editActive}>Edit Profile</button>
          {this.state.editClick === true ? <div>
              <input type="text" placeholder={this.props.user.name} onChange={e => this.props.user.name(e.target.value)}/>
              <input type="text" placeholder="City" onChange={e => this.props.updateCity(e.target.value)} />
              <input type="text" placeholder="State" onChange={e => this.props.updateState(e.target.value)} />
              <button onClick={this.updateInfo}>Submit</button>
            </div> : null}
        </div>
      </div>;
  }
}

const mapStateToProps = state => state;

export default withRouter(
  connect(mapStateToProps, { getUser, getBusinesses, updateCity, updateState })(Profile)
);
