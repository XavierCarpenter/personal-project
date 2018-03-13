import React, { Component } from "react";
import TimePicker from "material-ui/TimePicker";

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = { value24: null, value12: null };
  }



  handleChangeTimePicker12 = (event, date) => {
    this.setState({ value12: date });
  };

  render() {
    return (
      <div>
        <TimePicker
          format="ampm"
          hintText="What time?"
          value={this.state.value12}
          onChange={this.handleChangeTimePicker12}
        />
     
      </div>
    );
  }
}
export default Clock;
