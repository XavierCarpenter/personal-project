import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter as Router } from "react-router-dom";
import { red800 } from "material-ui/styles/colors";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from "material-ui/styles/getMuiTheme";
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import MuiTheme from 'MuiTheme';

import "./index.css";
import App from "./App";
import store from "./store";

const muiTheme = getMuiTheme({
  pallette: {
    primary1Color: red800
  }
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Router>
        <App />
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);
