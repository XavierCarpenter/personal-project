import React, {Component} from "react";
import { connect } from "react-redux";
import "./Header.css";
import { Link, withRouter } from "react-router-dom";
import { getUser, searchInput } from "../../ducks/reducer";




class Header extends Component {
  
  componentDidMount() {
    this.props.getUser();
  }
  render() {
    return <div>
        {this.props.user.name ? <div>
            <header className="App-header">
              <h1 className="App-title">Fre3Agent</h1>
              <div className="search">
                <input type="text" placeholder="Search..." onChange={e => this.props.searchInput(e.target.value)} />
                <Link to="/type">
                  <button type="submit">
                    <i className="fas fa-search" />
                  </button>
                </Link>
              </div>
              <div className="nav">
                <Link to="/businesses">
                  <p>Explore</p>
                </Link>
                <a href={process.env.REACT_APP_LOGOUT}>
                  <p>Logout</p>
                </a>
                <Link to="/user/:id">
                  <h1>Hello, {this.props.user.name}</h1>
                </Link>
              </div>
            </header>
          </div> : <div>
            <header className="App-header">
              <h1 className="App-title">Fre3Agent</h1>
              <div className="search">
                <input type="text" placeholder="Search..." onChange={e => this.props.searchInput(e.target.value)} />
                <Link to="/type">
                  <button type="submit">
                    <i className="fas fa-search" />
                  </button>
                </Link>
              </div>
              <div className="nav">
                <Link to="/businesses">
                  <p>Explore</p>
                </Link>
                <a href={process.env.REACT_APP_LOGIN}>
                  <p>Login</p>
                </a>
              </div>
            </header>
          </div>}
      </div>;
  }
};

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, { getUser, searchInput })(Header));
