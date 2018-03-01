import React, { Component } from "react";
import { connect } from "react-redux";
import "./ExploreType.css";
import Header from "../Header/Header";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import { getUser, searchInput } from "../../ducks/reducer";
import { getBusinesses } from "../../ducks/reducer";
import Landing from "../Landing/Landing";

// We'll use an href to handle the logout so we can redirect from the server

class ExploreType extends Component {
  constructor(props) {
    super(props);
    this.state = {
    selected: ""
    }
  }
  componentDidMount() {
    this.props.getUser();
    this.props.getBusinesses().then(response => {
        const { businesses, search } = this.props;
        // console.log(businesses);
        for (let key in businesses) {
          if (key == search) {
            this.setState({selected:businesses[key]});
            console.log(this.state.selected);
          }
        }
    });
 
  }
  render() {
      
   


    return <div>
        <Header />
        <h1>exploreType</h1>
        <h1 className="title">Search Results</h1>
        {this.state.selected && this.state.selected.map(
            (business, i) => {
              return (
                <div key={i} className="box">
                  <div className="box-content">
                    <h3>{business.name}</h3>
                    <h3> {business.state}</h3>
                    <Link to={`/business/${business.id}`} key={i}>
                      <p>View Portfolio</p>
                    </Link>
                  </div>
                </div>
              );
            }
          )}
      </div>;
  }
}

const mapStateToProps = state => state;

export default withRouter(
  connect(mapStateToProps, { getUser, getBusinesses, searchInput })(ExploreType)
);
