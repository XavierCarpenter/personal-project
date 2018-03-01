import React, { Component } from "react";
import { connect } from "react-redux";
import "./Explore.css";
import Header from "../Header/Header";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import { getUser } from "../../ducks/reducer";
import { getBusinesses } from "../../ducks/reducer"; 


// We'll use an href to handle the logout so we can redirect from the server

class Explore extends Component {
  constructor(){
    super();
   

  }
  componentDidMount() {
    this.props.getUser();
    this.props.getBusinesses();

 
  }
  render() {
    console.log(this.props.businesses)
    // console.log(this.props);
 

    return <div>
        <Header />
        {this.props.user.name ? <div className="main_container">
            {/* <h1>{this.props.user.authid}</h1> */}
            {/* <h1>{this.props.user.name}</h1> */}
            <h1 className="title">Web Developers</h1>
            {this.props.businesses && this.props.businesses.WebDeveloper.map(
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
            <h1 className="title">Photographers</h1>
            {this.props.businesses && this.props.businesses.Photographer.map(
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
            <h1 className="title">Barbers</h1>
            {this.props.businesses && this.props.businesses.Barber.map(
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
            <h1 className="title">Personal Trainers</h1>
            {this.props.businesses && this.props.businesses.PersonalTrainer.map(
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
          </div> : <div>
            <h1>No User On Session</h1>
          </div>}
      </div>;
  }
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, { getUser, getBusinesses })(Explore));
