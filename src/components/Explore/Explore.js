import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import { getUser } from "../../ducks/reducer";

import ExploreAll from "../ExploreAll/ExploreAll";
// We'll use an href to handle the logout so we can redirect from the server

class Explore extends Component {
  constructor(){
    super();
    this.state = {
      businesses: {}
    }

  }
  componentDidMount() {
    this.props.getUser();
  axios.get("/api/businesses").then(results =>{
    this.setState({businesses: results.data})
  }).catch(console.log);
 
  }
  render() {
    console.log(this.state.businesses)
    // console.log(this.props);
    const temp1 = this.state.businesses.WebDeveloper
    console.log(temp1);
    // const webDevelopers = temp1.map((business, i) => (
    //   <div>
    //     <h3>
    //       {business.name} {business.jobtype}
    //     </h3>
    //     <h3> {business.state}</h3>
    //     <Link to={`/business/${business.id}`} key={i}>
    //     <p>View Portfolio</p>
    //   </Link>
    //   </div>
    // ));
    return <div>
        {this.props.user.name ? <div>
            {/* <h1>{this.props.user.authid}</h1> */}
            <h1>{this.props.user.name}</h1>
            <h1>Web Developers</h1>
            {/* {webDevelopers} */}
            <a href={process.env.REACT_APP_LOGOUT}>
              <button>Logout</button>
            </a>
          </div> : <div>
            <h1>No User On Session</h1>
          </div>}
      </div>;
  }
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, { getUser })(Explore));
