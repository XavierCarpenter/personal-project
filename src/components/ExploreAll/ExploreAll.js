import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";


class ExploreAll extends Component {
  constructor() {
    super();
    this.state = {
      businesses: []
    };
  }
  componentDidMount() {
    axios
      .get("/api/businesses")
      .then(results => {
        this.setState({ businesses: results.data });
      })
      .catch(console.log);
  }
  render() {
        const businesses = this.state.businesses.map((business, i) => (
          <Link to={`/business/${business.id}`} key={i}>
            <h3>
              {business.name} {business.jobtype}
            </h3>
            <h3> {business.state}</h3>
            <p>View Portfolio</p>
          </Link>
        ));
    return { businesses };
  }
}
const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps)(ExploreAll));
