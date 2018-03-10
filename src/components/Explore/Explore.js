import React, { Component } from "react";
import { connect } from "react-redux";
import "./Explore.css";
import Header from "../Header/Header";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import { getUser } from "../../ducks/reducer";
import { getBusinesses } from "../../ducks/reducer"; 
import Landing from "../Landing/Landing";
import Image from "react-image-resizer";



// We'll use an href to handle the logout so we can redirect from the server

class Explore extends Component {
  constructor(){
    super();
    this.state = { 
      profileUrl: "" 
    };
   

  }
  componentDidMount() {
    this.props.getUser();
    this.props.getBusinesses();

     axios
       .get(`/api/buspic/${this.props.match.params.id}`)
       .then(response => {
         this.setState({ profileUrl: response.data });
       });
 
  }
  render() {
    console.log(this.props.businesses)
     
      let profileUrl
      this.state.profileUrl ?
       profileUrl = this.state.profileUrl.map((pic, i) => {
           return <div key={i}>
               <Image src={pic.profilepic} alt="profile" className="profilepic" height={240} width={240} />
             </div>;
         }) : null;
         console.log(profileUrl)
     
  
 

    return <div>
        {this.props.user.name ? <div className="main_container">
            <Header />
            {/* <h1>{this.props.user.authid}</h1> */}
            {/* <h1>{this.props.user.name}</h1> */}
            <h1 className="title">Web Developers</h1>
            {this.props.businesses && this.props.businesses.WebDeveloper.map(
                (business, i) => {
                  return (
                    <div key={i} className="box">
                      <div className="box-content">
                        <Image
                          src={business.profilepic}
                          alt="profile"
                          className="profilepic"
                          height={240}
                          width={240}
                        />
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
                        <Image
                          src={business.profilepic}
                          alt="profile"
                          className="profilepic"
                          height={240}
                          width={240}
                        />
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
                        <Image
                          src={business.profilepic}
                          alt="profile"
                          className="profilepic"
                          height={240}
                          width={240}
                        />
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
                        <Image
                          src={business.profilepic}
                          alt="profile"
                          className="profilepic"
                          height={240}
                          width={240}
                        />
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
            <Landing />
          </div>}
      </div>;
  }
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, { getUser, getBusinesses })(Explore));
