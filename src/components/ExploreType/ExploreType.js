import React, { Component } from "react";
import { connect } from "react-redux";
import "./ExploreType.css";
import Header from "../Header/Header";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import { getUser, searchInput } from "../../ducks/reducer";
import { getBusinesses } from "../../ducks/reducer";
import Landing from "../Landing/Landing";
import Image from "react-image-resizer";

// We'll use an href to handle the logout so we can redirect from the server

class ExploreType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: ""
    };
  }
  componentDidMount() {
    this.props.getUser();
    this.props.getBusinesses().then(response => {
      const { businesses, search } = this.props;
      // console.log(businesses);
      for (let key in businesses) {
        if (key.toLowerCase() == search
            .toLowerCase()
            .replace(/ /gi, "")) {
          this.setState({ selected: businesses[key] });
          console.log(this.state.selected);
        }
      }
    });
  }
  render() {
    return <div className= "explore_container">
        <Header />
        <h1>exploreType</h1>
        <h1 className="title">Search Results</h1>
        {this.state.selected && this.state.selected.map((business, i) => {
            return <div key={i} className="bus_container">
                <div className="bus_box">
                  <Image src={business.profilepic} alt="profile" className="profilepic" height={240} width={240} />
                  <h3>{business.name}</h3>
                  <h3>
                    {" "}
                    {business.city},{business.state}
                  </h3>
                  <Link to={`/business/${business.id}`} key={i}>
                    <p>View Portfolio</p>
                  </Link>
                </div>
              </div>;
          })}
      </div>;
  }
}

const mapStateToProps = state => state;

export default withRouter(
  connect(mapStateToProps, { getUser, getBusinesses, searchInput })(ExploreType)
);
