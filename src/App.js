import React, { Component } from "react";
import "./App.css";
import routes from "./routes";
import Header from "./components/Header/Header";
import Calender from "./components/Calender/Calender";


class App extends Component {
  render() {
    return <div className="App">
  
        {routes}
      </div>;
  }
}

export default App;
