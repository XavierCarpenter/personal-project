import React, { Component } from "react";
import { connect } from "react-redux";
import "./Explore.css";
import Header from "../Header/Header";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import { getUser, getBusinesses } from "../../ducks/reducer";
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

         let webDevelopers = this.props.businesses && this.props.businesses.WebDeveloper.map(
             (business, i) => {
               return (
                 <div key={i} className="bus_container">
                   <div className="bus_box">
                     <Image
                       src={business.profilepic}
                       alt="profile"
                       className="profilepic"
                       height={240}
                       width={240}
                     />
                     <h3>{business.name}</h3>
                     <h3>
                       {" "}
                       {business.city},{business.state}
                     </h3>
                     <Link to={`/business/${business.id}`} key={i}>
                       <p>View Portfolio</p>
                     </Link>
                   </div>
                 </div>
               );
             }
           );

           let photographers = this.props.businesses && this.props.businesses.Photographer.map(
               (business, i) => {
                 return (
                   <div key={i} className="bus_container">
                     <div className="bus_box">
                       <Image
                         src={business.profilepic}
                         alt="profile"
                         className="profilepic"

                         height={240}
                         width={240}
                       />
                       <h3>{business.name}</h3>
                       <h3>
                         {" "}
                         {business.city},{business.state}
                       </h3>
                       <Link to={`/business/${business.id}`} key={i}>
                         <p>View Portfolio</p>
                       </Link>
                     </div>
                   </div>
                 );
               }
             );

             let barbers = this.props.businesses && this.props.businesses.Barber.map(
                 (business, i) => {
                   return (
                     <div key={i} className="bus_container">
                       <div className="bus_box">
                         <Image
                           src={business.profilepic}
                           alt="profile"
                           className="profilepic"
                           height={240}
                           width={240}
                         />
                         <h3>{business.name}</h3>
                         <h3>
                           {" "}
                           {business.city},{business.state}
                         </h3>
                         <Link
                           to={`/business/${business.id}`}
                           key={i}
                         >
                           <p>View Portfolio</p>
                         </Link>
                       </div>
                     </div>
                   );
                 }
               );

               let personalTrainers = this.props.businesses && this.props.businesses.PersonalTrainer.map(
                   (business, i) => {
                     return (
                       <div key={i} className="bus_container">
                         <div className="bus_box">
                           <Image
                             src={business.profilepic}
                             alt="profile"
                             className="profilepic"
                             height={240}
                             width={240}
                           />
                           <h3>{business.name}</h3>
                           <h3>
                             {" "}
                             {business.city},{business.state}
                           </h3>
                           <Link
                             to={`/business/${business.id}`}
                             key={i}
                           >
                             <p>View Portfolio</p>
                           </Link>
                         </div>
                       </div>
                     );
                   }
                 );
        
     
  
 

    return <div>
        {this.props.user.name ? <div className="explore_container">
            <Header />
            <div className="content_wrapper">
              <div className="jobs">
                <h1 className="job_title">Web Developers</h1>
                {webDevelopers}
              </div>
              <div className="jobs">
                <h1 className="job_title">Photographers</h1>
                {photographers}
              </div>
              <div className="jobs">
                <h1 className="job_title">Barbers</h1>
                {barbers}
              </div>
              <div className="jobs">
                <h1 className="job_title">Personal Trainers</h1>
                {personalTrainers}
              </div>
            </div>
          </div> : <div>
            <Landing />
          </div>}
      </div>;
  }
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, { getUser, getBusinesses })(Explore));
